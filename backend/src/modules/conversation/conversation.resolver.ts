import { Arg, Mutation, Resolver } from 'type-graphql';
import { ConversationMutationResponse } from './conversation.dto';

@Resolver()
export class ConversationResolver {
  @Mutation(() => ConversationMutationResponse, { nullable: true })
  async createConversation(
    @Arg('participantIds', () => [String], { nullable: false }) participantIds: string[],
  ): Promise<ConversationMutationResponse> {
    console.log(participantIds);
    return {
      code: 200,
      success: true,
      message: 'Success',
    };
  }
}
