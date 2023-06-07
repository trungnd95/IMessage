import { Context } from '@/lib/common-type';
import { CheckAuth } from '@/middlewares/checkAuth';
import {
  Arg,
  Ctx,
  ID,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { User } from '../user/user.dto';
import { MESSAGE_CREATED, Message, MessageInput, MessageMutationResponse } from './message.dto';
import { createMessage, getMessages } from './message.service';

@Resolver()
export class MessageResolver {
  /**
   * Create a new message mutation
   * @param messageInput
   * @returns
   */
  @Mutation(() => MessageMutationResponse)
  @UseMiddleware(CheckAuth)
  async createNewMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('messageInput', () => MessageInput) messageInput: MessageInput,
  ): Promise<MessageMutationResponse> {
    try {
      const message = await createMessage(messageInput);
      await pubSub.publish(MESSAGE_CREATED, message);
      return {
        code: 201,
        success: true,
        message: 'Message created',
        messageData: message,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error instanceof Error ? error.message : 'Internal error occurred',
      };
    }
  }

  /**
   * Messages query
   * @param conversationId: ID - Id of conversation want to retrieve messages
   * @param requestUser: User - Current user is retrieving messages
   * @returns
   */
  @Query(() => [Message])
  @UseMiddleware(CheckAuth)
  async messages(
    @Arg('conversationId', () => ID) conversationId: string,
    @Ctx() { session }: Context,
  ): Promise<Message[]> {
    try {
      return await getMessages(conversationId, session?.user as User);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Internal error occurred');
    }
  }

  //@UseMiddleware(CheckAuth)
  @Subscription(() => Message, {
    topics: MESSAGE_CREATED,
    filter: ({
      context,
      payload,
      args,
    }: ResolverFilterData<Message, { conversationId: string }, Context>) => {
      return payload.conversationId === args.conversationId;
    },
  })
  subcribeNewMessageSent(
    @Root() message: Message,
    @Arg('conversationId') conversationId: string,
  ): Message {
    console.log('xxxxxx', conversationId);
    return message;
  }
}
