import { Context } from '@/lib/common-type';
import { CheckAuth } from '@/middlewares/checkAuth';
import { PubSubEngine } from 'graphql-subscriptions';
import {
  Arg,
  ArgsDictionary,
  Ctx,
  Mutation,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { User } from '../user/user.dto';
import {
  CONVERSATION_CREATED,
  Conversation,
  ConversationMutationResponse,
} from './conversation.dto';
import { createConversation, getConversations } from './conversation.service';

@Resolver()
export class ConversationResolver {
  /**
   *  create a new conversation
   * @param pubSub
   * @param participantIds
   * @returns
   */
  @Mutation(() => ConversationMutationResponse, { nullable: true })
  @UseMiddleware(CheckAuth)
  async createConversation(
    @PubSub() pubSub: PubSubEngine,
    @Arg('participantIds', () => [String], { nullable: false }) participantIds: string[],
  ): Promise<ConversationMutationResponse> {
    try {
      const conversation = await createConversation(participantIds);
      await pubSub.publish(CONVERSATION_CREATED, conversation);
      return {
        code: 200,
        success: true,
        message: 'Conversation created successfully',
        conversation,
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
   * Query all conversations of current user
   * @param param
   * @returns
   */
  @Query(() => [Conversation])
  @UseMiddleware(CheckAuth)
  async getConversations(@Ctx() { session }: Context) {
    try {
      return await getConversations(session?.user as User);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Subcribe to event when new conversation is created
   * @param conversation
   * @returns
   */
  @UseMiddleware(CheckAuth)
  @Subscription(() => Conversation, {
    topics: CONVERSATION_CREATED,
    filter: ({ payload, context }: ResolverFilterData<Conversation, ArgsDictionary, Context>) => {
      const currentUserId = context.session?.user?.id;
      return !!payload.participants.find((each) => each.participant.id === currentUserId);
    },
  })
  subcribeNewConversationCreated(@Root() conversation: Conversation): Conversation {
    return conversation;
  }
}
