import { default as ApiAdapter, IFetchResult, IFetchRequest } from '../adapter';
import { IEntity, IEntitySingleton } from './base-entity';

const USER_LOGIN_URL = '/auth/login';
const USER_LOGOUT_URL = '/auth/revoke-tokens';
const USER_CURRENT_URL = '/auth/current-user';
const USER_ALL_URL = '/user';

export type IUser = IEntity & {
    username: string;
    username_canonical: string;
    first: string;
    last: string;
    email: string;
    phone: string;
    comments: string;
    first_login_stamp: Date;
    last_login_stamp: Date;
    employee_id: string;
    home_page: string;
    archived_stamp: Date;
    enabled: boolean;
    created_stamp: Date;
    created_user_id: string;
    last_updated_stamp: Date;
    last_updated_user_id: string;
    access_token: string;
    token_exp: Date;
    refresh_token: string;
    refresh_token_exp: Date;
}

export interface IUsers extends IEntitySingleton<IUser> {
    // custom interface actions for entity
    login: (username: string, password: string) => Promise<IUser|null>,
    currentTokenUser: () => Promise<IUser|null>,
    logout: () => Promise<void>,
}

const _Users = (): IUsers => {
    return {
        login: async (username: string, password: string) : Promise<IUser|null> => {
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
            
            return result.data && result.data.length === 1 ? result.data[0] as IUser : null;
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
        currentTokenUser: async () : Promise<IUser|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_CURRENT_URL,
                method: 'GET',
                data: null,
            };

            const result: IFetchResult = await ApiAdapter.fetch(fetchRequest);
            // TO DO: Handle errors

            return result.data && result.data.length === 1 ? result.data[0] as IUser : null;
        },
        getAll: async () : Promise<Array<IUser>|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_ALL_URL,
                method: 'GET',
                data: null,
            };

            const result: IFetchResult = await ApiAdapter.fetch(fetchRequest);
            // TO DO: Handle errors

            return result.data && result.data.length > 0 ? result.data as Array<IUser> : null;
        },
    }
}

const Users: IUsers = _Users();
Object.freeze(Users);

export default Users;