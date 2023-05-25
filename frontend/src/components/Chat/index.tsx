import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import Conversation from './Conversation';
import Feed from './Feed';

type IChatProps = {};

const Chat: React.FunctionComponent<IChatProps> = () => {
  const router = useRouter();
  const conversationId = router.query;
  return (
    <Flex h="100vh">
      <Box
        w={{ base: '100%', md: '25%' }}
        visibility={{
          base: conversationId ? 'hidden' : 'visible',
          md: 'visible',
        }}
        bg="whiteAlpha.100"
        py={6}
      >
        <Conversation />
      </Box>
      <Box w="100%">
        <Feed />
      </Box>
    </Flex>
  );
};

export default Chat;
