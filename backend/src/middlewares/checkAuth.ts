import { Context, MutationResponse } from '@/lib/common-type';
import { GraphQLError } from 'graphql';
import { MiddlewareFn, NextFn } from 'type-graphql';

export const CheckAuth: MiddlewareFn<Context> = async (
  { context: { session } },
  next,
): Promise<MutationResponse | NextFn> => {
  if (!session?.user) {
    throw new GraphQLError('You are not authorized to perform this action.');
    // return {
    //   code: 401,
    //   success: false,
    //   message: 'You are not authorized to perform this action',
    // };
  }
  return next();
};
