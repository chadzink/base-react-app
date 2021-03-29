import { IFetchResult } from '../index';

export type IEntity = {
    id: string;
}

export interface IEntitySingleton<TEntity> {
    // TO DO: Implement RESTful for role
    getAll: (page: number, size: number) => Promise<IFetchResult<TEntity>|null>,
    // getById: (id:string) => Promise<T|null>,
    // add: (user:IUser) => Promise<T|null>,
    // remove: (id:string) => Promise<void>,
    // update: (user:IUser) => Promise<void>,
}