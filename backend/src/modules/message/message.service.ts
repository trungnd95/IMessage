import prisma from '@/lib/prismaClient';
import { User } from '../user/user.dto';
import { Message, MessageInput } from './message.dto';

/**
 * Create a new message
 * @param messageInput
 * @returns
 */
export async function createMessage(messageInput: MessageInput): Promise<Message> {
  const message = await prisma.message.create({
    data: {
      ...messageInput,
    },
    include: {
      sender: true,
    },
  });
  return message;
}

/**
 * Query all messages in the conversation
 * @param conversationId
 */
export async function getMessages(conversationId: string, requestUser: User): Promise<Message[]> {
  return await prisma.message.findMany({
    where: {
      conversation: {
        AND: {
          id: conversationId,
          participants: {
            some: {
              participantId: requestUser.id,
            },
          },
        },
      },
    },
    include: {
      sender: true,
    },
  });
}
