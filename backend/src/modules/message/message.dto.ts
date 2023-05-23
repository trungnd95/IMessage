import { Field, ObjectType } from 'type-graphql';
import { User } from '../user/user.dto';

@ObjectType()
export class Message {
  @Field()
  id: String;

  @Field()
  sender: User;

  @Field()
  body: String;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
