import { Conversation, User } from '@/graphql-client/generated/graphql';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FeedHeader from './FeedHeader';

type FeedProps = {
  conversations: Conversation[];
};

export default function Body({ conversations }: FeedProps) {
  /// Get router params
  const router = useRouter();
  const { conversationId } = router.query;

  /// Logic handling
  const conversation = conversations.find(
    (conversation) => conversation.id === conversationId,
  );
  const listParticipants: User[] = conversation?.participants.map(
    (item) => item.participant,
  ) as User[];
  return (
    <>
      {conversationId ? (
        <VStack align={'stretch'} h="full">
          <FeedHeader participants={listParticipants} />
        </VStack>
      ) : (
        <Flex h="full" align={'center'} justify={'center'}>
          <Text>Choose chat to view</Text>
        </Flex>
      )}
    </>
  );
}
