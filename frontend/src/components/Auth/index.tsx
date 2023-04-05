import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import * as React from 'react';

type IAppProps = {
  session: Session | null;
  reloadSession?: () => void;
};

const Auth: React.FunctionComponent<IAppProps> = ({
  session,
  //reloadSession,
}) => {
  const [username, setUsername] = React.useState('');
  const onSubmit = async () => {
    try {
      // Call graphql mutation to create user name
    } catch (error) {
      console.log('Submit error');
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
            <Button type="button" onClick={onSubmit} width="100%">
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
