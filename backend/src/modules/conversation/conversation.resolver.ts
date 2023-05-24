import { Context } from '@/lib/common-type';
import { CheckAuth } from '@/middlewares/checkAuth';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../user/user.dto';
import { Conversation, ConversationMutationResponse } from './conversation.dto';
import { createConversation, getConversations } from './conversation.service';

@Resolver()
export class ConversationResolver {
  @Mutation(() => ConversationMutationResponse, { nullable: true })
  @UseMiddleware(CheckAuth)
  async createConversation(
    @Arg('participantIds', () => [String], { nullable: false }) participantIds: string[],
  ): Promise<ConversationMutationResponse> {
    try {
      const conversation = await createConversation(participantIds);
      console.log(conversation);
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

  @Query(() => [Conversation])
  @UseMiddleware(CheckAuth)
  async getConversations(@Ctx() { session }: Context) {
    try {
      return await getConversations(session?.user as User);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
