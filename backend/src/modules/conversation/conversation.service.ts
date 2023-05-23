import prisma from '@/lib/prismaClient';
import { Prisma } from '@prisma/client';

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
