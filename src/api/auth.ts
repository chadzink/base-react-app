import { default as ApiAdapter, IFetchResult, IFetchRequest, ITokenSet } from './adapter';
import { IEntity } from './entities/base-entity';

const USER_LOGIN_URL = '/auth/login';
const USER_LOGOUT_URL = '/auth/revoke-tokens';
const USER_CURRENT_URL = '/auth/current-user';
const USER_REFRESH_TOKEN_URL = '/auth/refresh-tokens';

export type IAuthUser = IEntity & {
    username: string;
    first: string;
    last: string;
    email: string;
    phone: string;
    roles: Array<string>;
    access_token: string;
    token_exp: Date|null;
    refresh_token: string;
    refresh_token_exp: Date|null;
}

export interface IAuthUsersSingleton {
    login: (username: string, password: string) => Promise<IAuthUser|null>,
    currentTokenUser: () => Promise<IAuthUser|null>,
    logout: () => Promise<void>,
}

const _Users = (): IAuthUsersSingleton => {
    return {
        login: async (username: string, password: string) : Promise<IAuthUser|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_LOGIN_URL,
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                },
            };

            const result: IFetchResult = await ApiAdapter.fetch(fetchRequest);
            // TO DO: Handle errors
            
            // Map result to interface result type
            return result.data && result.data.length === 1 ? result.data[0] as IAuthUser : null;
        },
        logout: async () : Promise<void> => {
            const fetchRequest: IFetchRequest = {
                url: USER_LOGOUT_URL,
                method: 'POST',
                data: null,
            };

            await ApiAdapter.fetch(fetchRequest);
            await ApiAdapter.clearTokens();
        },
        currentTokenUser: async () : Promise<IAuthUser|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_CURRENT_URL,
                method: 'GET',
                data: null,
            };

            const result: IFetchResult = await ApiAdapter.fetch(fetchRequest);
            // Handle errors
            if (result.errors && result.errors.length) {
                // first try to use the refresh token to get a new token
                const tokens: ITokenSet = ApiAdapter.getTokens();

                const fetchRequestWithTokens: IFetchRequest = {
                    url: USER_REFRESH_TOKEN_URL,
                    method: 'POST',
                    data: tokens,
                };

                const resultWithTokens: IFetchResult = await ApiAdapter.fetch(fetchRequestWithTokens);
                // TO DO: Handle errors after token refresh did not work
                
                return resultWithTokens.data && resultWithTokens.data.length === 1
                    ? resultWithTokens.data[0] as IAuthUser
                    : null;
            }
            // Check for errors
            // Map result to interface result type
            return result.data && result.data.length === 1 ? result.data[0] as IAuthUser : null;
        }
    }
}

const AuthUsers: IAuthUsersSingleton = _Users();
Object.freeze(AuthUsers);

export default AuthUsers;