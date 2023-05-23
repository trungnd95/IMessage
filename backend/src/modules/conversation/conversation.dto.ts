import { MutationResponse } from '@/lib/common-type';
import { Field, ID, ObjectType } from 'type-graphql';
import { Message } from '../message/message.dto';
import { User } from '../user/user.dto';

@ObjectType()
export class Participant {
  @Field()
  hasUnseenLastestMessage: boolean;

  @Field(() => User)
  participant: User;
}

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [Participant])
  participants: Participant[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Message, { nullable: true })
  lastestMessage: Message | null;
}

@ObjectType({ implements: MutationResponse })
export class ConversationMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field(() => Conversation, { nullable: true })
  conversation?: Conversation;
}
