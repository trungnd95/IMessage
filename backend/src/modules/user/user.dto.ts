import { MutationResponse } from '@/lib/common-type';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string | null;

  @Field(() => String)
  email: string | null;

  @Field(() => String)
  username: string | null;

  @Field(() => Date, { nullable: true })
  emailVerified?: Date | null;

  @Field(() => String)
  image: string | null;
}

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string | undefined;

  @Field(() => User, { nullable: true })
  user?: User;
}
