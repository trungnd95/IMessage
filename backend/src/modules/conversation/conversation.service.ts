import prisma from '@/lib/prismaClient';
import { Prisma } from '@prisma/client';
import { User } from '../user/user.dto';
import { Conversation } from './conversation.dto';

export const conversationPopulated = Prisma.validator<Prisma.ConversationInclude>()({
  participants: {
    include: {
      participant: true,
    },
  },
  lastestMessage: {
    include: {
      sender: true,
    },
  },
});

/**
 *
 * @param participantIds: List ids of participants
 * @returns: Conversation: Conversation instance
 */
export async function createConversation(
  participantIds: string[],
): Promise<Prisma.ConversationGetPayload<{ include: typeof conversationPopulated }>> {
  return await prisma.conversation.create({
    data: {
      participants: {
        create: participantIds.map((id) => ({ participantId: id, hasUnseenLastestMessage: true })),
      },
    },
    include: conversationPopulated,
  });
}

/**
 * Get all conversations for current user
 */
export async function getConversations(currentUser: User): Promise<Array<Conversation>> {
  return prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          participantId: {
            equals: currentUser.id,
          },
        },
      },
    },
    include: conversationPopulated,
  });
}
