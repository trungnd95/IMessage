import { Conversation } from '@/graphql-client/generated/graphql';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ConversationItem from './ConversationItem';
import CreateModal from './CreateModal';

type Props = {
  conversations: Conversation[];
};

export default function Sidebar({ conversations }: Props) {
  /// Component states
  const [modalOpen, setModalOpen] = useState(false);

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
          <Text
            color="whiteAlpha.600"
            fontWeight={500}
            isTruncated
            //noOfLines={1}
          >
            Find or start a conversation
          </Text>
        </Button>
        <Box className="listConversations" w={'100%'}>
          {conversations.map((conversation) => (
            <ConversationItem
              conversation={conversation}
              key={conversation.id}
            />
          ))}
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
