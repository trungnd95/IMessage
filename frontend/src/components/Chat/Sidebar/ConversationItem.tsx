import { Conversation, User } from '@/graphql-client/generated/graphql';
import { parseChatGrName } from '@/lib/helper';
import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';
import { formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type ConversationItemProps = {
  conversation: Conversation;
};

const formatRelativeLocale = {
  lastWeek: 'eeee',
  yesterday: "'Yesterday",
  today: 'p',
  other: 'MM/dd/yy',
};

export default function ConversationItem({
  conversation,
}: ConversationItemProps) {
  /// Libs
  const { data: session } = useSession();
  const router = useRouter();

  /// Logic handling
  const listParticipants: User[] = conversation.participants.map(
    (item) => item.participant,
  );
  const othersInConversation: User[] = listParticipants.filter(
    (participant) => participant.id !== session?.user.id,
  );
  const hanldeChooseConversation = () => {
    const url = { query: { conversationId: conversation.id } };
    router.push(url, url, { shallow: true });
  };

  return (
    <Box
      px={3}
      py={othersInConversation.length > 1 ? 5 : 3}
      borderRadius={1}
      _hover={{ cursor: 'pointer' }}
      borderBottom={'1px'}
      borderColor={'whiteAlpha.50'}
      onClick={hanldeChooseConversation}
      bg={
        conversation.id === router.query.conversationId
          ? 'whiteAlpha.200'
          : 'none'
      }
    >
      <HStack justify={'space-between'} spacing="5">
        <HStack spacing={2}>
          {/* Avatar */}
          {othersInConversation.length === 1 ? (
            <Avatar
              src={othersInConversation[0].image}
              size="md"
              name={othersInConversation[0].name}
            />
          ) : (
            <AvatarGroup size="sm" max={2}>
              {othersInConversation.map((user) => (
                <Avatar key={user.id} src={user.image} name={user.name} />
              ))}
            </AvatarGroup>
          )}
          {/* Group participants */}
          <Text as="h3" fontSize={'md'} fontWeight={700}>
            {parseChatGrName(othersInConversation)}
          </Text>
        </HStack>
        <Text fontSize="sm">
          {formatRelative(new Date(conversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </HStack>
    </Box>
  );
}
