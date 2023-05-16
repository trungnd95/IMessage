import { useCreateUsernameMutation } from '@/graphql-client/generated/graphql';
import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import * as React from 'react';

type IAppProps = {
  session: Session | null;
  reloadSession: () => void;
};

const Auth: React.FunctionComponent<IAppProps> = ({
  session,
  reloadSession,
}) => {
  const toast = useToast();
  const [createUsername, { loading }] = useCreateUsernameMutation();
  const [username, setUsername] = React.useState('');
  const onSubmit = async () => {
    try {
      // Call graphql mutation to create user name
      const response = await createUsername({
        variables: {
          username,
        },
      });

      if (response.data?.createUsername.success) {
        reloadSession();
        toast({
          title: 'Username created.',
          description: response.data.createUsername.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Username created.',
          description: response.data?.createUsername.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Username created.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Center height="100vh">
      <Stack align={'center'} spacing={10}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a username</Text>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type="button"
              onClick={onSubmit}
              width="100%"
              isLoading={loading}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessengerQL</Text>
            <Button
              onClick={() => signIn('google')}
              leftIcon={
                <Image
                  alt="google logo"
                  height="20px"
                  src="/images/google.png"
                ></Image>
              }
            >
              Login with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
