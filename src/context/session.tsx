// primary api context for current application data
import React, { createContext, useState, FC } from "react";

export type ISessionState = {
  username: string;
  token: string;
  refreshToken: string;
  roles: string[];
};

export type ISessionContextState = {
  currentUser: ISessionState;
  loading: boolean;
  isAuthenticated: boolean;
  authenticate: (usename: string, password: string) => Promise<ISessionState>|null;
  logout: () => void;
};

export const sessionEmptyUser: ISessionState = {
  username: '',
  token: '',
  refreshToken: '',
  roles: [],
};

export const sessionContextDefaultValues: ISessionContextState = {
    currentUser: sessionEmptyUser,
    loading: false,
    isAuthenticated: false,
    authenticate: () => { return null; },
    logout: () => {},
};

export const SessionContext = createContext<ISessionContextState>(
  sessionContextDefaultValues
);

const SessionProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ISessionState>(sessionContextDefaultValues.currentUser);
  const [loading, setLoading] = useState<boolean>(sessionContextDefaultValues.loading);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(sessionContextDefaultValues.isAuthenticated);

  const authenticate = async (usename:string, password:string) : Promise<ISessionState> => {
    setLoading(true);
    //wait one sec
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser : ISessionState = {
        username: usename,
        token: 'dsadajkhdjkbcabjkabjkbskdjhakjs',
        refreshToken: '1234556666',
        roles: ['admin','power-user']
    };
    
    setCurrentUser(newUser);
    setAuthenticated(true);

    setLoading(false);

    return newUser;
  };

  const logout = async () => {
    setLoading(true);
    //wait one sec
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentUser(sessionContextDefaultValues.currentUser);
    setAuthenticated(false);
    setLoading(false);
  };

  return (
    <SessionContext.Provider
      value={{currentUser, loading, isAuthenticated, authenticate, logout}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;