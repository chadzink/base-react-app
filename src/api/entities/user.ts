import { ApiAdapter, IFetchResult, IFetchRequest } from '../index';
import { IEntity, IEntitySingleton } from './base-entity';

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

export interface IUsersSingleton extends IEntitySingleton<IUser> {
    // custom interface actions for entity
}

const _Users = (): IUsersSingleton => {
    return {
        getAll: async (errorsCallback = (errors:any[]) => {}) : Promise<Array<IUser>|null> => {
            const fetchRequest: IFetchRequest = {
                url: USER_ALL_URL,
                method: 'GET',
                data: null,
                onError: errorsCallback,
            };

            const result: IFetchResult = await ApiAdapter.fetch(fetchRequest);
            
            if (result.errors && result.errors.length) {
                fetchRequest.onError(result.errors);
            }

            // Map result to interface result type
            return result.data && result.data.length > 0 ? result.data as Array<IUser> : null;
        },
    }
}

const Users: IUsersSingleton = _Users();
Object.freeze(Users);

export default Users;