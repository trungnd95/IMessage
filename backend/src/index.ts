import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import 'module-alias/register';
import { getSession } from 'next-auth/react';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Context, Session } from './lib/common-type';
import UserResolver from './modules/user/user.resolver';
import { HelloResolver } from './resolvers/Hello';

const main = async () => {
  // Express server
  const app = express();
  const httpServer = http.createServer(app);

  // Apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      emitSchemaFile: true,
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
