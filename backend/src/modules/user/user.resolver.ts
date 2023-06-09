import { Context } from '@/lib/common-type';
import { CheckAuth } from '@/middlewares/checkAuth';
import { GraphQLError } from 'graphql';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User, UserMutationResponse } from './user.dto';
import { findUniqueUser, findUsersByUsername, updateUser } from './user.service';

@Resolver()
export default class UserResolver {
  @Mutation(() => UserMutationResponse)
  @UseMiddleware(CheckAuth)
  async createUsername(
    @Arg('username', () => String, { nullable: false }) username: string,
    @Ctx() { session }: Context,
  ): Promise<UserMutationResponse> {
    try {
      // /// Verify user authenticated or not
      // if (!session?.user)
      //   return {
      //     code: 401, // unauthorized
      //     success: false,
      //     message: 'User not authenticated',
      //   };

      /// Check user exists or not
      const userExist = await findUniqueUser(username);
      if (userExist)
        return {
          code: 400,
          success: false,
          message: 'Username is already in use. Please try another',
        };

      /// If username is not existed, create a new one
      const user = await updateUser(session?.user?.id as string, { username } as User);
      return {
        code: 200,
        success: true,
        message: 'Username created successfully',
        user,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: `Server internal error: ${err.message}`,
      };
    }
  }

  @Query(() => [User])
  @UseMiddleware(CheckAuth)
  async searchUsers(
    @Arg('searchUsername', () => String, { nullable: false }) searchUsername: string,
    @Ctx() { session }: Context,
  ): Promise<Array<User>> {
    try {
      // /// Verify user authenticated or not
      // if (!session?.user) throw new GraphQLError('User not authenticated');

      /// Query users with username
      return await findUsersByUsername(searchUsername, session?.user as User);
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  }
}
