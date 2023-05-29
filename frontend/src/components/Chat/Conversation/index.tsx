import {
  GetConversationsQuery,
  NewConversationCreatedSubDocument,
  NewConversationCreatedSubSubscription,
  useGetConversationsQuery,
} from '@/graphql-client/generated/graphql';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ConversationItem from './ConversationItem';
import CreateModal from './CreateModal';

type Props = {};

export default function Conversation({}: Props) {
  /// Libs
  const toast = useToast();

  /// Component states
  const [modalOpen, setModalOpen] = useState(false);

  /// GraphQL client
  const {
    data,
    loading: queryConversationLoading,
    error: queryConversationError,
    subscribeToMore,
  } = useGetConversationsQuery({
    fetchPolicy: 'cache-first',
  });

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
    console.log('Component render....!');
    subscribeToUpdateListConversations();
    subscribeToUpdateListConversations();
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
      <VStack spacing={3}>
        <Heading textAlign={'center'} fontSize="lg">
          Chats
        </Heading>
        <Button
          w={'90%'}
          textAlign="center"
          py={6}
          bgColor="blackAlpha.300"
          borderRadius={4}
          _hover={{ bgColor: 'blackAlpha.300' }}
          onClick={() => setModalOpen(true)}
          leftIcon={<AiOutlineSearch size={17} style={{ display: 'inline' }} />}
        >
          <Text color="whiteAlpha.600" fontWeight={500}>
            Find or start a conversation
          </Text>
        </Button>
        <Box className="listConversations" w={'100%'}>
          {queryConversationLoading ? (
            <Flex mt={10} justify={'center'}>
              <Spinner />
            </Flex>
          ) : (
            <>
              {data?.getConversations.map((conversation) => (
                <ConversationItem
                  conversation={conversation}
                  key={conversation.id}
                />
              ))}
            </>
          )}
        </Box>
      </VStack>
      <CreateModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}
