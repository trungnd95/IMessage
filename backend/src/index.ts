import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import 'module-alias/register';
import { getSession } from 'next-auth/react';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';
import { Context, Session, SubscriptionContext } from './lib/common-type';
import { ConversationResolver } from './modules/conversation/conversation.resolver';
import UserResolver from './modules/user/user.resolver';

const main = async () => {
  /// Express server
  const app = express();
  const httpServer = http.createServer(app);

  /// Build schema
  const schema = await buildSchema({
    resolvers: [UserResolver, ConversationResolver, UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  /// Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql/subscriptions',
  });

  /// Hand in the schema we just created and have the
  /// WebSocketServer start listening.
  const getSubscriptionContext = async (ctx: SubscriptionContext): Promise<Context> => {
    ctx;
    // ctx is the graphql-ws Context where connectionParams live
    if (ctx.connectionParams && ctx.connectionParams.session) {
      const { session } = ctx.connectionParams;
      return { session };
    }
    // Otherwise let our resolvers know we don't have a current user
    return { session: null };
  };

  const serverCleanup = useServer(
    {
      schema,
      context: (ctx: SubscriptionContext) => {
        // This will be run every time the client sends a subscription request
        // Returning an object will add that information to our
        // GraphQL context, which all of our resolvers have access to.
        return getSubscriptionContext(ctx);
      },
    },
    wsServer,
  );

  // Apollo server
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<Context> => {
        const session = (await getSession({ req })) as Session;
        return { session };
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main().catch((err) => {
  console.log(err);
});
