import { useCreateMessageMutation } from '@/graphql-client/generated/graphql';
import { Box, Button, HStack, Input } from '@chakra-ui/react';
import ObjectID from 'bson-objectid';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { BsSend } from 'react-icons/bs';

type FeedInputProps = {
  conversationId: string;
};

export default function FeedInput({ conversationId }: FeedInputProps) {
  const [sendMessage, { loading, error }] = useCreateMessageMutation();
  const [inputMessage, setInputMessage] = useState('');
  const { data: session } = useSession();
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const data = await sendMessage({
      variables: {
        messageInput: {
          id: new ObjectID().toString(),
          conversationId,
          senderId: session?.user.id as string,
          body: inputMessage,
        },
      },
    });
    console.log(data);
  };
  return (
    <form onSubmit={handleSendMessage}>
      <Box p={4}>
        <HStack>
          <Input
            type="text"
            placeholder="Send message"
            value={inputMessage}
            // _focus={{ bg: 'red', borderColor: 'red' }}
            focusBorderColor="whiteAlpha.300"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button variant={'solid'} type="submit" rightIcon={<BsSend />}>
            Send
          </Button>
        </HStack>
      </Box>
    </form>
  );
}
