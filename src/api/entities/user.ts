import {
    IEntity,
    IEntitySingleton,
    IPagedEntitySingleton,
    IRestoreEntitySingleton,
    RestfulMixin,
    PagingMixin,
    RestorableMixin } from './base-entity';

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

export interface IUsersSingleton extends 
    IEntitySingleton<IUser>,
    IPagedEntitySingleton<IUser>,
    IRestoreEntitySingleton<IUser> {
        // add any custom interface actions for entity
    }

const _Users = (): IUsersSingleton => {
    const restMixin: IEntitySingleton<IUser> = RestfulMixin<IUser>(USER_ALL_URL);
    const pagedMixin: IPagedEntitySingleton<IUser> = PagingMixin<IUser>(USER_ALL_URL);
    const restoreMixin: IRestoreEntitySingleton<IUser> = RestorableMixin<IUser>(USER_RESTORE_URL);

    return {
        all: restMixin.all,
        page: pagedMixin.page,
        find: restMixin.find,
        add: restMixin.add,
        remove: restMixin.remove,
        update: restMixin.update,
        restore: restoreMixin.restore,
    }
}

const Users: IUsersSingleton = _Users();
Object.freeze(Users);

export default Users;