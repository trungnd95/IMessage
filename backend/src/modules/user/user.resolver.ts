import { Context } from '@/lib/common-type';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { UserMutationResponse } from './user.dto';

@Resolver()
export default class UserResolver {
  @Mutation(() => UserMutationResponse)
  async createUsername(
    @Arg('username', () => String, { nullable: true }) username: string,
    @Ctx() { session }: Context,
  ): Promise<UserMutationResponse> {
    console.log(session);
    return {
      code: 200,
      success: true,
      message: 'User created successfully',
    };
  }
}
