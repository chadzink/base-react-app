import { ApiAdapter, IFetchResult, IFetchRequest, ITokenSet } from './index';
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
    login: (username: string, password: string, onError: (errors: any[]) => void) => Promise<IAuthUser|null>,
    currentTokenUser: () => Promise<IAuthUser|null>,
    logout: () => Promise<void>,
}

const _Users = (): IAuthUsersSingleton => {
    return {
        login: async (username: string, password: string, errorsCallback = (errors:any[]) => {}) : Promise<IAuthUser|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_LOGIN_URL,
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                },
                onError: errorsCallback,
            };

            const result: IFetchResult<IAuthUser> = await ApiAdapter.fetch<IAuthUser>(fetchRequest);
            
            if (result.errors && result.errors.length) {
                await fetchRequest.onError(result.errors);
            }
            
            // Map result to interface result type
            return result.data && result.data.length === 1 ? result.data[0] as IAuthUser : null;
        },
        logout: async (errorsCallback = (errors:any[]) => {}) : Promise<void> => {
            const fetchRequest: IFetchRequest = {
                url: USER_LOGOUT_URL,
                method: 'POST',
                data: null,
                onError: errorsCallback,
            };

            const result: IFetchResult<IAuthUser> = await ApiAdapter.fetch<IAuthUser>(fetchRequest);
            if (result.errors && result.errors.length) {
                fetchRequest.onError(result.errors);
            }

            await ApiAdapter.clearTokens();
        },
        currentTokenUser: async (errorsCallback = (errors:any[]) => {}) : Promise<IAuthUser|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_CURRENT_URL,
                method: 'GET',
                data: null,
                onError: () => {},
            };

            const result: IFetchResult<IAuthUser> = await ApiAdapter.fetch<IAuthUser>(fetchRequest);
            // Handle errors
            if (result.errors && result.errors.length) {
                // first try to use the refresh token to get a new token
                const tokens: ITokenSet = ApiAdapter.getTokens();

                const fetchRequestWithTokens: IFetchRequest = {
                    url: USER_REFRESH_TOKEN_URL,
                    method: 'POST',
                    data: tokens,
                    onError: errorsCallback,
                };

                const resultWithTokens: IFetchResult<IAuthUser> = await ApiAdapter.fetch<IAuthUser>(fetchRequestWithTokens);
                
                if (resultWithTokens.errors && resultWithTokens.errors.length) {
                    fetchRequestWithTokens.onError(resultWithTokens.errors);
                }
                
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