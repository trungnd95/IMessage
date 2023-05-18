import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { ReactNode, createContext, useContext, useMemo } from 'react';

type SessionProviderProps = {
  children: ReactNode;
};

const sessionContext = createContext<Session | null>(null);

const useSessionContext = () => {
  const session = useContext(sessionContext);
  if (session === undefined) {
    throw new Error(
      `${useSessionContext.name} was used outside of ${sessionContext.displayName} Provider`,
    );
  }
  return session;
};

export default function SessionProvider({ children }: SessionProviderProps) {
  const { data: session } = useSession();
  const contextValue = useMemo(() => {
    return session;
  }, [session]);
  return (
    <sessionContext.Provider value={contextValue}>
      {children}
    </sessionContext.Provider>
  );
}

export { useSessionContext };
