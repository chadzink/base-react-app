// primary api context for current application data
import { createContext, useState, FC, useEffect } from "react";
import * as Api from '../api';

// map api types
type IAuthUser = Api.IAuthUser;
type ITokenSet = Api.ITokenSet;

const START_APP_URL = '/start';

export type ISessionContextState = {
  currentUser: IAuthUser|null;
  loading: boolean;
  isAuthenticated: boolean;
  appStartUrl: string,
  authenticate: (username: string, password: string, onError: (errors: any[]) => void) => Promise<IAuthUser>|null;
  logout: () => void;
  checkToken: () => Promise<IAuthUser>|null;
};

export const sessionEmptyUser: IAuthUser = {
  id: '',
  username: '',
  first: '',
  last: '',
  email: '',
  phone: '',
  roles: [],
  access_token: '',
  token_exp: null,
  refresh_token: '',
  refresh_token_exp: null,
};

export const sessionContextDefaultValues = (): ISessionContextState => {
  return {
    currentUser: sessionEmptyUser,
    loading: false,
    isAuthenticated: false,
    appStartUrl: START_APP_URL,
    authenticate: () => null,
    logout: () => {},
    checkToken: () => null,
  }
};

export const SessionContext = createContext<ISessionContextState>(sessionContextDefaultValues());

const SessionProvider: FC = ({ children }) => {
  const defaults = sessionContextDefaultValues();
  const [currentUser, setCurrentUser] = useState<IAuthUser|null>(defaults.currentUser);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(defaults.isAuthenticated);
  const [appStartUrl] = useState<string>(defaults.appStartUrl);

  const authenticate = async (username: string, password: string, onError = (errors:any[]) => {}) : Promise<IAuthUser> => {
    setLoading(true);

    // use Users API to login
    const newUser: IAuthUser|null = await Api.AuthUsers.login(username, password, onError);
    setCurrentUser(newUser);
    setAuthenticated(newUser !== null);

    setLoading(false);

    return newUser ? newUser : sessionEmptyUser;
  };

  const logout = async () => {
    setLoading(true);

    await Api.AuthUsers.logout();
    setCurrentUser(defaults.currentUser);
    setAuthenticated(false);

    setLoading(false);
  };

  const checkToken = async (): Promise<IAuthUser> => {
    setLoading(true);

    const newUser: IAuthUser|null = await Api.AuthUsers.currentTokenUser();
    setCurrentUser(newUser);
    setAuthenticated(newUser !== null);

    setLoading(false);

    return newUser ? newUser : sessionEmptyUser;
  };

  useEffect(() => {
      (async () => {
        const tokens: ITokenSet = Api.ApiAdapter.getTokens();

        if (tokens.accessToken !== null && tokens.accessToken !== '' && tokens.refreshToken !== null && tokens.refreshToken !== '') {
          await checkToken();
        }
      })();
  }, []);

  return (
    <SessionContext.Provider
      value={{currentUser, loading, isAuthenticated, appStartUrl, authenticate, logout, checkToken}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;