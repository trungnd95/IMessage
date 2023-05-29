import {
  Conversation,
  GetConversationsQuery,
  NewConversationCreatedSubDocument,
  NewConversationCreatedSubSubscription,
  useGetConversationsQuery,
} from '@/graphql-client/generated/graphql';
import { Box, Flex, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import Body from './Body';
import Sidebar from './Sidebar';

type IChatProps = {};

const Chat: React.FunctionComponent<IChatProps> = () => {
  /// Get query parameters
  const router = useRouter();
  const { conversationId } = router.query;

  /// Libs
  const toast = useToast();
  const eventSubcribedRef = useRef(false);

  /// GraphQL client
  const {
    data,
    loading: queryConversationLoading,
    error: queryConversationError,
    subscribeToMore,
  } = useGetConversationsQuery();

  /// Hoooks
  const subscribeToUpdateListConversations = () => {
    subscribeToMore({
      document: NewConversationCreatedSubDocument,
      updateQuery: (
        prev: GetConversationsQuery,
        {
          subscriptionData: { data },
        }: {
          subscriptionData: { data: NewConversationCreatedSubSubscription };
        },
      ) => {
        if (!data) return prev;
        return {
          ...prev,
          getConversations: [
            data.subcribeNewConversationCreated,
            ...prev.getConversations,
          ],
        };
      },
    });
  };

  useEffect(() => {
    if (!eventSubcribedRef.current) {
      subscribeToUpdateListConversations();
      eventSubcribedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /// Logic handling
  if (queryConversationError)
    toast({
      title: 'Error',
      description: 'Failed to retrieve conversation',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  return (
    <>
      {queryConversationLoading ? (
        <Flex mt={10} justify={'center'} h="100vh" align={'center'}>
          <Spinner />
        </Flex>
      ) : (
        <Flex h="100vh">
          <Box
            w={{ base: '100%', md: '25%' }}
            display={{
              base: conversationId ? 'none' : 'block',
              md: 'block',
            }}
            bg="whiteAlpha.100"
            py={6}
          >
            <Sidebar conversations={data?.getConversations as Conversation[]} />
          </Box>
          <Box
            w="100%"
            display={{
              base: conversationId ? 'block' : 'none',
              md: 'block',
            }}
          >
            <Body conversations={data?.getConversations as Conversation[]} />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Chat;
