import { Conversation, User } from '@/graphql-client/generated/graphql';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import FeedHeader from './FeedHeader';
import FeedInput from './FeedInput';
import FeedMessages from './FeedMessages';

type FeedProps = {
  conversations: Conversation[];
};

export default function Body({ conversations }: FeedProps) {
  /// Get router params
  const router = useRouter();

  /// Logic handling
  const conversation = conversations.find(
    (conversation) => conversation.id === router.query.conversationId,
  );

  const listParticipants: User[] = conversation?.participants.map(
    (item) => item.participant,
  ) as User[];

  /// Hooks
  useEffect(() => {
    if (!conversation && router.query.conversationId) {
      router.replace('', undefined, { shallow: true });
    }
  }, [conversation, router]);

  return (
    <>
      {router.query.conversationId && conversation ? (
        <VStack align={'stretch'} h="full">
          <VStack flexGrow={1} align={'stretch'}>
            <FeedHeader participants={listParticipants} />
            <FeedMessages />
          </VStack>
          <FeedInput />
        </VStack>
      ) : (
        <Flex h="full" align={'center'} justify={'center'}>
          <Text>Choose chat to view</Text>
        </Flex>
      )}
    </>
  );
}
