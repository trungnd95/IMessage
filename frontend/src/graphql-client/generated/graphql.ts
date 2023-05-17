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

export type Mutation = {
  __typename?: 'Mutation';
  createUsername: UserMutationResponse;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String'];
};

export type MutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  searchUsers: Array<User>;
};


export type QuerySearchUsersArgs = {
  usernameSearch: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  emailVerified: Scalars['DateTime'];
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
};

export type CreateUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername: { __typename?: 'UserMutationResponse', message?: string | null, success: boolean, code: number } };


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
export type MutationKeySpecifier = ('createUsername' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createUsername?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationResponseKeySpecifier = ('code' | 'message' | 'success' | MutationResponseKeySpecifier)[];
export type MutationResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('hello' | 'searchUsers' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	hello?: FieldPolicy<any> | FieldReadFunction<any>,
	searchUsers?: FieldPolicy<any> | FieldReadFunction<any>
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
export type UserMutationResponseKeySpecifier = ('code' | 'message' | 'success' | UserMutationResponseKeySpecifier)[];
export type UserMutationResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	MutationResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationResponseKeySpecifier | (() => undefined | MutationResponseKeySpecifier),
		fields?: MutationResponseFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
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