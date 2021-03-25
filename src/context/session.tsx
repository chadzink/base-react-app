// primary api context for current application data
import { createContext, useState, FC, useEffect } from "react";
import { Users, IUser, ApiConfig } from '../api';

const START_APP_URL = '/start';

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
  appStartUrl: string,
  authenticate: (username: string, password: string) => Promise<ISessionState>|null;
  logout: () => void;
  checkToken: () => Promise<ISessionState>|null;
};

export const sessionEmptyUser: ISessionState = {
  username: '',
  token: '',
  refreshToken: '',
  roles: [],
};

const getSessionSateFromUser = (user: IUser|null) : ISessionState => {
  return {
    username: user ? user.username : sessionEmptyUser.username,
    token: user ? user.access_token : sessionEmptyUser.token,
    refreshToken: user ? user.refresh_token : sessionEmptyUser.refreshToken,
    roles: sessionEmptyUser.roles,
  } as ISessionState;
}

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
  const [currentUser, setCurrentUser] = useState<ISessionState>(defaults.currentUser);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(defaults.isAuthenticated);
  const [appStartUrl] = useState<string>(defaults.appStartUrl);

  const authenticate = async (username: string, password: string) : Promise<ISessionState> => {
    setLoading(true);

    // use Users API to login
    const userLogin: IUser|null = await Users.login(username, password);

    const newSessionUser: ISessionState = getSessionSateFromUser(userLogin);
    setCurrentUser(newSessionUser);
    setAuthenticated(userLogin !== null);

    setLoading(false);

    return newSessionUser;
  };

  const logout = async () => {
    setLoading(true);

    await Users.logout();
    setCurrentUser(defaults.currentUser);
    setAuthenticated(false);

    setLoading(false);
  };

  const checkToken = async (): Promise<ISessionState> => {
    setLoading(true);

    const userFromToken: IUser|null = await Users.currentTokenUser();
    const newSessionUser: ISessionState = getSessionSateFromUser(userFromToken);
    setCurrentUser(newSessionUser);
    setAuthenticated(userFromToken !== null);

    setLoading(false);

    return newSessionUser;
  };

  useEffect(() => {
      (async () => {
        const accessToken: string|null = localStorage.getItem(ApiConfig.tokenName);
        const refreshToken: string|null = localStorage.getItem(ApiConfig.refreshTokenName);

        if (accessToken !== null && refreshToken !== null) {
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