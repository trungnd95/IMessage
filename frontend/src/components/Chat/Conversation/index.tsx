import { Box, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CreateModal from './CreateModal';

type Props = {};

export default function Conversation({}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <VStack>
        <Box
          w="full"
          textAlign="center"
          py={3}
          bgColor="blackAlpha.300"
          borderRadius={4}
          _hover={{ cursor: 'pointer' }}
          onClick={() => setModalOpen(true)}
        >
          <Text color="whiteAlpha.600" fontWeight={500}>
            Find or start a conversation
          </Text>
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
