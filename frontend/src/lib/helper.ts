import { User } from '@/graphql-client/generated/graphql';

function truncateConversationName(conversationNameStr: string): string {
  const participantNameList = conversationNameStr.split(',');
  return participantNameList.length > 2
    ? participantNameList.slice(0, 2).join(',') + ',...'
    : conversationNameStr;
}

export function parseChatGrName(othersInConversation: User[]): string {
  return truncateConversationName(
    othersInConversation.reduce(
      (res, user, index) =>
        (res += `${user.username.trim()}${
          index === othersInConversation.length - 1 ? '' : ', '
        }`),
      '',
    ),
  );
}
