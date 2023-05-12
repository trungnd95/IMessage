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

export interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
  };
  expires: ISODateString;
}

export type Context = {
  session: Session | null;
};
