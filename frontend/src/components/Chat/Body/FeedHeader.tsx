import { User } from '@/graphql-client/generated/graphql';
import { parseChatGrName } from '@/lib/helper';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type FeedHeaderProps = {
  participants: User[];
};

export default function FeedHeader({ participants }: FeedHeaderProps) {
  /// Libs
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <HStack
      h="10%"
      alignItems={'center'}
      bg={'blackAlpha.200'}
      px={5}
      spacing={{ base: 10, md: 0 }}
    >
      <Button
        display={{ md: 'none' }}
        onClick={() =>
          router.replace('?conversationId', '/', {
            shallow: true,
          })
        }
      >
        Back
      </Button>
      <HStack>
        <Text>To: </Text>
        <Text fontWeight={700}>
          {parseChatGrName(
            participants.filter(
              (participant) => participant.id !== session?.user.id,
            ),
          )}
        </Text>
      </HStack>
    </HStack>
  );
}
