import { useGetMessagesQuery } from '@/graphql-client/generated/graphql';
import { Flex, Skeleton, Stack, useToast } from '@chakra-ui/react';
import FeedMessageItem from './FeedMessageItem';

type FeedMessagesProps = {
  conversationId: string;
};

export default function FeedMessages({ conversationId }: FeedMessagesProps) {
  const toast = useToast();
  const { data, loading, error } = useGetMessagesQuery({
    variables: {
      conversationId,
    },
  });
  console.log(data);

  if (error) {
    toast({
      title: 'Create conversation failed.',
      description: error.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return null;
  }
  return (
    <Flex justify={'flex-end'} direction={'column'} overflowY={'hidden'}>
      {loading ? (
        <Stack spacing={3} px={3}>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              height="50px"
              width="100%"
              startColor="whiteAlpha.200"
              endColor="whiteAlpha.100"
            />
          ))}
        </Stack>
      ) : (
        data && (
          <Flex direction="column-reverse" overflowY="scroll" height="100%">
            {data?.messages.map((message) => (
              <FeedMessageItem message={message} key={message.id} />
            ))}
          </Flex>
        )
      )}
    </Flex>
  );
}
