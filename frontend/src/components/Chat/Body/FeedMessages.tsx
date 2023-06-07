import { useGetMessagesQuery } from '@/graphql-client/generated/graphql';

type FeedMessagesProps = {
  conversationId: string;
};

export default function FeedMessages({ conversationId }: FeedMessagesProps) {
  const { data, loading, error } = useGetMessagesQuery({
    variables: {
      conversationId,
    },
  });
  console.log(data);
  return <div>FeedMessages</div>;
}
