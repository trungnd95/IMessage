import { CheckAuth } from '@/middlewares/checkAuth';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { ConversationMutationResponse } from './conversation.dto';
import { createConversation } from './conversation.service';

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
}
