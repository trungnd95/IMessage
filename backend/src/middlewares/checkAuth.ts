import { Context } from '@/lib/common-type';
import { GraphQLError } from 'graphql';
import { MiddlewareFn } from 'type-graphql';

export const CheckAuth: MiddlewareFn<Context> = async ({ context: { session } }, next) => {
  if (!session?.user) throw new GraphQLError('You are not authorized to perform this action.');
  return next();
};
