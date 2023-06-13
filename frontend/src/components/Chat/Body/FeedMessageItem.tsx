import { Message } from '@/graphql-client/generated/graphql';
import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import { formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useSession } from 'next-auth/react';

type FeedMessageItemProps = {
  message: Message;
};

const formatRelativeLocale = {
  lastWeek: 'eeee',
  yesterday: "'Yesterday",
  today: 'p',
  other: 'MM/dd/yy HH:mm',
};
export default function FeedMessageItem({ message }: FeedMessageItemProps) {
  const { data: session } = useSession();
  const s =
    session?.user.username != message.sender.username
      ? {
          borderTop: '5px solid transparent',
          borderBottom: '5px solid rgba(255, 255, 255, 0.08)',
          borderRight: '5px solid rgba(255, 255, 255, 0.08)',
          borderLeft: '5px solid transparent',
          bottom: 0,
          left: '-10px',
        }
      : {
          borderTop: '5px solid transparent',
          borderBottom: '5px solid rgba(255, 255, 255, 0.08)',
          borderLeft: '5px solid rgba(255, 255, 255, 0.08)',
          borderRight: '5px solid transparent',
          bottom: 0,
          right: '-10px',
        };
  return (
    <HStack
      justify={`${
        session?.user.username != message.sender.username
          ? 'flex-start'
          : 'flex-end'
      }`}
      align={'flex-end'}
      spacing={4}
      px={3}
      py={3}
    >
      {session?.user.username != message.sender.username && (
        <Avatar
          src={message.sender.image}
          size="md"
          name={message.sender.name}
        />
      )}
      <VStack
        align={`${
          session?.user.username != message.sender.username
            ? 'flex-start'
            : 'flex-end'
        }`}
        bg="whiteAlpha.200"
        px={4}
        py={3}
        borderRadius={10}
        borderBottomRightRadius={
          session?.user.username != message.sender.username ? 10 : 0
        }
        borderBottomLeftRadius={
          session?.user.username != message.sender.username ? 0 : 10
        }
        maxW={'70%'}
        position={'relative'}
        _before={{
          content: `""`,
          position: 'absolute',
          width: '0',
          height: '0',
          ...s,
          display: 'block',
          // opacity: '0.6',
        }}
      >
        <Text as="h3" fontWeight={600}>
          {message.sender.name}
        </Text>
        <Text fontSize={'md'}>{message.body}</Text>
        <Text fontSize={'xs'} color="whiteAlpha.600">
          {formatRelative(new Date(message.createdAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </VStack>
    </HStack>
  );
}
