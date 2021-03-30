import { IFetchResult, IFetchRequest, ApiAdapter } from '../index';
import { IEntity, IEntitySingleton, CommonRestMixin } from './base-entity';

const USER_ALL_URL = '/user';
const USER_RESTORE_URL = '/role/restore';

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
    restore: (id: string) => Promise<IFetchResult<IUser>|null>,
}

const _Users = (): IUsersSingleton => {
    const restMixin: IEntitySingleton<IUser> = CommonRestMixin<IUser>(USER_ALL_URL);

    return {
        all: restMixin.all,
        page: restMixin.page,
        find: restMixin.find,
        add: restMixin.add,
        remove: restMixin.remove,
        update: restMixin.update,
        restore: async (id:string) : Promise<IFetchResult<IUser>|null> => {
            const fetchRequest: IFetchRequest = {
                url: `${USER_RESTORE_URL}/${id}`,
                method: 'PUT',
                data: {},
                onError: () => {},
            };

            return await ApiAdapter.fetch<IUser>(fetchRequest);
        },
    }
}

const Users: IUsersSingleton = _Users();
Object.freeze(Users);

export default Users;