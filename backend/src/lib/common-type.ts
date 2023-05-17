import { User } from '@prisma/client';
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
  user?: User;
  expires: ISODateString;
}

export type Context = {
  session: Session | null;
};
