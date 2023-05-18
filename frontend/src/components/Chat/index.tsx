import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import Conversation from './Conversation';
import Feed from './Feed';

type IChatProps = {};

const Chat: React.FunctionComponent<IChatProps> = () => {
  return (
    <Flex h="100vh">
      <Box w={{ base: '100%', md: '25%' }} bg="whiteAlpha.50" py={6} px={3}>
        <Conversation />
      </Box>
      <Box w="100%">
        <Feed />
      </Box>
    </Flex>
  );
};

export default Chat;
