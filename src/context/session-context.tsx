// primary api context for current application data
import React, { createContext, useState, FC } from "react";
import { ISessionContextState, ISessionState } from "./types";

export const sessionEmptyUser: ISessionState = {
  username: '',
  token: '',
  refreshToken: '',
  roles: [],
};

export const sessionContextDefaultValues: ISessionContextState = {
    currentUser: sessionEmptyUser,
    loading: false,
    authenticated: false,
    userLogin: () => { return sessionEmptyUser; },
    userLogout: () => {},
};

export const SessionContext = createContext<ISessionContextState>(
  sessionContextDefaultValues
);

const SessionProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ISessionState>(sessionContextDefaultValues.currentUser);
  const [loading, setLoading] = useState<boolean>(sessionContextDefaultValues.loading);
  const [authenticated, setAuthenticated] = useState<boolean>(sessionContextDefaultValues.authenticated);

  const userLogin = (usename:string, password:string) : ISessionState => {
    setLoading(true);
    //wait one sec
    //await new Promise(resolve => setTimeout(resolve, 1000));
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

  const userLogout = async () => {
    setLoading(true);
    //wait one sec
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentUser(sessionContextDefaultValues.currentUser);
    setLoading(false);
  };

  return (
    <SessionContext.Provider
      value={{currentUser, loading, authenticated, userLogin, userLogout}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;