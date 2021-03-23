export type ISessionState = {
  username: string;
  token: string;
  refreshToken: string;
  roles: string[];
};

export type ISessionContextState = {
  currentUser: ISessionState;
  loading: boolean;
  authenticated: boolean;
  userLogin: (usename: string, password: string) => ISessionState|null;
  userLogout: () => void;
};