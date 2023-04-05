import { NextPage, NextPageContext } from 'next';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession();
  return (
    <>
      {data?.user ? (
        <button onClick={() => signOut()}>Signout</button>
      ) : (
        <button onClick={() => signIn('google')}>Signin</button>
      )}
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}

export default Home;
