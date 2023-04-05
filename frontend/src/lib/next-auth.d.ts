import 'next-auth';
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user: User;
  };

  type User = {
    id: string;
    username: string;
  };
}
