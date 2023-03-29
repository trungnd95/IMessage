import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log(process.env.GOOGLE_CLIENT_ID);
  return (
    <>
      {data?.user ? (<button onClick={() => signOut()}>Signout</button>) : (<button onClick={() => signIn("google")} >Signin</button>)}
    </>
  )
}

export default Home;
