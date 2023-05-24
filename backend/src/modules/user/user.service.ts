import prisma from '@/lib/prismaClient';
import { User } from './user.dto';

/**
 * Find unique user with username
 * @param username
 * @returns User | null // Promse.UserGetPayload<{}> | null
 */
export async function findUniqueUser(username: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}

/**
 *
 * @param userId - user id
 * @param userData - user data object
 * @returns User // Promise.UserGetPayload<{}>
 */
export async function updateUser(userId: string, userData: User): Promise<User> {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...userData,
    },
  });
}

/**
 *
 * @param searchUsername: username text to search for
 * @returns [User]
 */
export async function findUsersByUsername(
  searchUsername: string,
  currentUser: User,
): Promise<Array<User>> {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: searchUsername,
        not: currentUser.username,
        mode: 'insensitive',
      },
    },
  });
}
