import { Conversation, User } from '@/graphql-client/generated/graphql';
import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';
import { formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useSession } from 'next-auth/react';

type ConversationItemProps = {
  conversation: Conversation;
};

function truncateConversationName(conversationNameStr: string): string {
  const participantNameList = conversationNameStr.split(',');
  return participantNameList.length > 2
    ? participantNameList.slice(0, 2).join(',') + ',...'
    : conversationNameStr;
}

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

  /// Logic handling
  const listParticipants: User[] = conversation.participants.map(
    (item) => item.participant,
  );
  const othersInConversation: User[] = listParticipants.filter(
    (participant) => participant.id !== session?.user.id,
  );
  return (
    <Box
      m={2}
      p={3}
      //bg={'whiteAlpha.50'}
      borderRadius={5}
      _hover={{ bg: 'whiteAlpha.50', cursor: 'pointer' }}
      borderBottom={'1px'}
      borderColor={'whiteAlpha.50'}
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
            {truncateConversationName(
              othersInConversation.reduce(
                (res, user, index) =>
                  (res += `${user.username.trim()}${
                    index === othersInConversation.length - 1 ? '' : ', '
                  }`),
                '',
              ),
            )}
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
