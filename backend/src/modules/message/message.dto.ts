import { MutationResponse } from '@/lib/common-type';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { User } from '../user/user.dto';

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field()
  sender: User;

  @Field()
  body: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class MessageInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  conversationId: string;

  @Field(() => ID)
  senderId: string;

  @Field()
  body: string;
}

@ObjectType({ implements: MutationResponse })
export class MessageMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field(() => Message, { nullable: true })
  messageData?: Message;
}
