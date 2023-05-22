import { MutationResponse } from '@/lib/common-type';
import { ObjectType } from 'type-graphql';

@ObjectType({ implements: MutationResponse })
export class ConversationMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;
}
