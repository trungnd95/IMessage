import prisma from '@/lib/prismaClient';
import { User } from './user.dto';

/**
 * Find unique user with username
 * @param username
 * @returns
 */
export async function findUniqueUser(username: string) {
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
 * @returns
 */
export async function updateUser(userId: string, userData: User) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...userData,
    },
  });
}
