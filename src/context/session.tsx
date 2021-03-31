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
  hasTokens: boolean;
  checkedCurrentUser: boolean;
  checkedRefreshToken: boolean;
  isAuthenticated: boolean;
  appStartUrl: string,
  authenticate: (username: string, password: string, onError: (errors: any[]) => void) => Promise<IAuthUser>|null;
  logout: () => void;
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
    hasTokens: false,
    checkedCurrentUser: false,
    checkedRefreshToken: false,
    isAuthenticated: false,
    appStartUrl: START_APP_URL,
    authenticate: () => null,
    logout: () => {},
  }
};

export const SessionContext = createContext<ISessionContextState>(sessionContextDefaultValues());

const SessionProvider: FC = ({ children }) => {
  const defaults = sessionContextDefaultValues();
  const [currentUser, setCurrentUser] = useState<IAuthUser|null>(defaults.currentUser);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  const [hasTokens, setHasTokens] = useState<boolean>(defaults.hasTokens);
  const [checkedCurrentUser, setCheckedCurrentUser] = useState<boolean>(defaults.checkedCurrentUser);
  const [checkedRefreshToken, setCheckedRefreshToken] = useState<boolean>(defaults.checkedRefreshToken);
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

  useEffect(() => {
      (async () => {
        setLoading(true);

        const tokens: ITokenSet = Api.ApiAdapter.getTokens();
        const calcHasToken: boolean = (
          tokens.accessToken !== null
          && tokens.accessToken !== ''
          && tokens.refreshToken !== null
          && tokens.refreshToken !== ''
        );

        setHasTokens(calcHasToken);

        if (calcHasToken && !checkedCurrentUser) {
          const currentUserFromTokens: IAuthUser|null = await Api.AuthUsers.currentTokenUser();
          setCheckedCurrentUser(true);

          if (currentUserFromTokens) {
            setCurrentUser(currentUserFromTokens);
            setCheckedRefreshToken(true);
            setAuthenticated(true);
          } else {
            const currentUserFromRefreshTokens: IAuthUser|null = await Api.AuthUsers.currentRefreshTokenUser();
            setCheckedRefreshToken(true);

            if (currentUserFromRefreshTokens) {
              setCurrentUser(currentUserFromRefreshTokens);
              setAuthenticated(true);
            }
          }
        } else {
          setCheckedCurrentUser(true);
          setCheckedRefreshToken(true);
          setAuthenticated(false);
        }

        setLoading(false);
      })();
  }, [checkedCurrentUser]);

  return (
    <SessionContext.Provider
      value={{
        currentUser,
        loading,
        hasTokens,
        checkedCurrentUser,
        checkedRefreshToken,
        isAuthenticated,
        appStartUrl,
        authenticate,
        logout,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;