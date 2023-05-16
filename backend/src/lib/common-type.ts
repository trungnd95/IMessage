import { ISODateString } from 'next-auth';
import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export abstract class MutationResponse {
  @Field()
  code: number;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}

export interface User {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
}
export interface Session {
  user?: User;
  expires: ISODateString;
}

export type Context = {
  session: Session | null;
};
