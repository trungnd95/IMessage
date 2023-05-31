import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lastestMessage?: Maybe<Message>;
  participants: Array<Participant>;
  updatedAt: Scalars['DateTime'];
};

export type ConversationMutationResponse = MutationResponse & {
  __typename?: 'ConversationMutationResponse';
  code: Scalars['Float'];
  conversation?: Maybe<Conversation>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  sender: User;
  updatedAt: Scalars['DateTime'];
};

export type MessageInput = {
  body: Scalars['String'];
  conversationId: Scalars['ID'];
  id: Scalars['ID'];
  senderId: Scalars['ID'];
};

export type MessageMutationResponse = MutationResponse & {
  __typename?: 'MessageMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  messageData?: Maybe<Message>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation?: Maybe<ConversationMutationResponse>;
  createNewMessage: MessageMutationResponse;
  createUsername: UserMutationResponse;
};


export type MutationCreateConversationArgs = {
  participantIds: Array<Scalars['String']>;
};


export type MutationCreateNewMessageArgs = {
  messageInput: MessageInput;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String'];
};

export type MutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Participant = {
  __typename?: 'Participant';
  hasUnseenLastestMessage: Scalars['Boolean'];
  participant: User;
};

export type Query = {
  __typename?: 'Query';
  getConversations: Array<Conversation>;
  messages: Array<Message>;
  searchUsers: Array<User>;
};


export type QueryMessagesArgs = {
  id: Scalars['ID'];
};


export type QuerySearchUsersArgs = {
  searchUsername: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subcribeNewConversationCreated: Conversation;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserFieldsFragment = { __typename?: 'User', id: string, name: string, email: string, username: string, image: string };

export type MessageFieldsFragment = { __typename?: 'Message', id: string, body: string, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, name: string, email: string, username: string, image: string } };

export type ConversationFieldsFragment = { __typename?: 'Conversation', id: string, createdAt: any, updatedAt: any };

export type CreateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername: { __typename?: 'UserMutationResponse', message?: string | null, success: boolean, code: number } };

export type CreateConversationMutationVariables = Exact<{
  participantIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation?: { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null, conversation?: { __typename?: 'Conversation', id: string, createdAt: any, updatedAt: any } | null } | null };

export type CreateMessageMutationVariables = Exact<{
  messageInput: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createNewMessage: { __typename?: 'MessageMutationResponse', code: number, success: boolean, messageData?: { __typename?: 'Message', id: string, body: string, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, name: string, email: string, username: string, image: string } } | null } };

export type SearchUsersQueryVariables = Exact<{
  searchUsername: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: string, name: string, email: string, username: string, image: string }> };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename?: 'Conversation', id: string, createdAt: any, updatedAt: any, lastestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, name: string, email: string, username: string, image: string } } | null, participants: Array<{ __typename?: 'Participant', hasUnseenLastestMessage: boolean, participant: { __typename?: 'User', id: string, name: string, email: string, username: string, image: string } }> }> };

export type NewConversationCreatedSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewConversationCreatedSubSubscription = { __typename?: 'Subscription', subcribeNewConversationCreated: { __typename?: 'Conversation', id: string, createdAt: any, updatedAt: any, lastestMessage?: { __typename?: 'Message', id: string, body: string, createdAt: any, updatedAt: any, sender: { __typename?: 'User', id: string, name: string, email: string, username: string, image: string } } | null, participants: Array<{ __typename?: 'Participant', hasUnseenLastestMessage: boolean, participant: { __typename?: 'User', id: string, name: string, email: string, username: string, image: string } }> } };

export const UserFieldsFragmentDoc = gql`
    fragment userFields on User {
  id
  name
  email
  username
  image
}
    `;
export const MessageFieldsFragmentDoc = gql`
    fragment messageFields on Message {
  id
  body
  createdAt
  updatedAt
  sender {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const ConversationFieldsFragmentDoc = gql`
    fragment conversationFields on Conversation {
  id
  createdAt
  updatedAt
}
    `;
export const CreateUsernameDocument = gql`
    mutation createUsername($username: String!) {
  createUsername(username: $username) {
    message
    success
    code
  }
}
    `;
export type CreateUsernameMutationFn = Apollo.MutationFunction<CreateUsernameMutation, CreateUsernameMutationVariables>;

/**
 * __useCreateUsernameMutation__
 *
 * To run a mutation, you first call `useCreateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUsernameMutation, { data, loading, error }] = useCreateUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<CreateUsernameMutation, CreateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUsernameMutation, CreateUsernameMutationVariables>(CreateUsernameDocument, options);
      }
export type CreateUsernameMutationHookResult = ReturnType<typeof useCreateUsernameMutation>;
export type CreateUsernameMutationResult = Apollo.MutationResult<CreateUsernameMutation>;
export type CreateUsernameMutationOptions = Apollo.BaseMutationOptions<CreateUsernameMutation, CreateUsernameMutationVariables>;
export const CreateConversationDocument = gql`
    mutation createConversation($participantIds: [String!]!) {
  createConversation(participantIds: $participantIds) {
    code
    success
    message
    conversation {
      ...conversationFields
    }
  }
}
    ${ConversationFieldsFragmentDoc}`;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      participantIds: // value for 'participantIds'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const CreateMessageDocument = gql`
    mutation createMessage($messageInput: MessageInput!) {
  createNewMessage(messageInput: $messageInput) {
    code
    messageData {
      ...messageFields
    }
    success
  }
}
    ${MessageFieldsFragmentDoc}`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      messageInput: // value for 'messageInput'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($searchUsername: String!) {
  searchUsers(searchUsername: $searchUsername) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      searchUsername: // value for 'searchUsername'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    ...conversationFields
    lastestMessage {
      ...messageFields
    }
    participants {
      hasUnseenLastestMessage
      participant {
        ...userFields
      }
    }
  }
}
    ${ConversationFieldsFragmentDoc}
${MessageFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
      }
export function useGetConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
export type GetConversationsQueryHookResult = ReturnType<typeof useGetConversationsQuery>;
export type GetConversationsLazyQueryHookResult = ReturnType<typeof useGetConversationsLazyQuery>;
export type GetConversationsQueryResult = Apollo.QueryResult<GetConversationsQuery, GetConversationsQueryVariables>;
export const NewConversationCreatedSubDocument = gql`
    subscription newConversationCreatedSub {
  subcribeNewConversationCreated {
    ...conversationFields
    lastestMessage {
      ...messageFields
    }
    participants {
      hasUnseenLastestMessage
      participant {
        ...userFields
      }
    }
  }
}
    ${ConversationFieldsFragmentDoc}
${MessageFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;

/**
 * __useNewConversationCreatedSubSubscription__
 *
 * To run a query within a React component, call `useNewConversationCreatedSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewConversationCreatedSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewConversationCreatedSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewConversationCreatedSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewConversationCreatedSubSubscription, NewConversationCreatedSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewConversationCreatedSubSubscription, NewConversationCreatedSubSubscriptionVariables>(NewConversationCreatedSubDocument, options);
      }
export type NewConversationCreatedSubSubscriptionHookResult = ReturnType<typeof useNewConversationCreatedSubSubscription>;
export type NewConversationCreatedSubSubscriptionResult = Apollo.SubscriptionResult<NewConversationCreatedSubSubscription>;
export type ConversationKeySpecifier = ('createdAt' | 'id' | 'lastestMessage' | 'participants' | 'updatedAt' | ConversationKeySpecifier)[];
export type ConversationFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastestMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationMutationResponseKeySpecifier = ('code' | 'conversation' | 'message' | 'success' | ConversationMutationResponseKeySpecifier)[];
export type ConversationMutationResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	conversation?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageKeySpecifier = ('body' | 'createdAt' | 'id' | 'sender' | 'updatedAt' | MessageKeySpecifier)[];
export type MessageFieldPolicy = {
	body?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	sender?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageMutationResponseKeySpecifier = ('code' | 'message' | 'messageData' | 'success' | MessageMutationResponseKeySpecifier)[];
export type MessageMutationResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	messageData?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createConversation' | 'createNewMessage' | 'createUsername' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	createNewMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	createUsername?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationResponseKeySpecifier = ('code' | 'message' | 'success' | MutationResponseKeySpecifier)[];
export type MutationResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ParticipantKeySpecifier = ('hasUnseenLastestMessage' | 'participant' | ParticipantKeySpecifier)[];
export type ParticipantFieldPolicy = {
	hasUnseenLastestMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	participant?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getConversations' | 'messages' | 'searchUsers' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	searchUsers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('subcribeNewConversationCreated' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	subcribeNewConversationCreated?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('email' | 'emailVerified' | 'id' | 'image' | 'name' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	emailVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserMutationResponseKeySpecifier = ('code' | 'message' | 'success' | 'user' | UserMutationResponseKeySpecifier)[];
export type UserMutationResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Conversation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationKeySpecifier | (() => undefined | ConversationKeySpecifier),
		fields?: ConversationFieldPolicy,
	},
	ConversationMutationResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationMutationResponseKeySpecifier | (() => undefined | ConversationMutationResponseKeySpecifier),
		fields?: ConversationMutationResponseFieldPolicy,
	},
	Message?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageKeySpecifier | (() => undefined | MessageKeySpecifier),
		fields?: MessageFieldPolicy,
	},
	MessageMutationResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageMutationResponseKeySpecifier | (() => undefined | MessageMutationResponseKeySpecifier),
		fields?: MessageMutationResponseFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	MutationResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationResponseKeySpecifier | (() => undefined | MutationResponseKeySpecifier),
		fields?: MutationResponseFieldPolicy,
	},
	Participant?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ParticipantKeySpecifier | (() => undefined | ParticipantKeySpecifier),
		fields?: ParticipantFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserMutationResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserMutationResponseKeySpecifier | (() => undefined | UserMutationResponseKeySpecifier),
		fields?: UserMutationResponseFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;