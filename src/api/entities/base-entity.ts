import { IFetchResult, IFetchRequest, ApiAdapter } from '../index';

export type IEntity = {
    id: string|null;
}

export interface IEntitySingleton<TEntity> {
    // TO DO: Implement RESTful for role
    all: () => Promise<IFetchResult<TEntity>|null>;
    page: (page: number, size: number) => Promise<IFetchResult<TEntity>|null>;
    find: (id: string) => Promise<IFetchResult<TEntity>|null>,
    add: (record: TEntity) => Promise<IFetchResult<TEntity>|null>,
    remove: (id: string) => Promise<void>,
    update: (id: string, record: TEntity) => Promise<IFetchResult<TEntity>|null>,
}

export const CommonRestMixin = <TEntity>(baseUrl: string): IEntitySingleton<TEntity> => {
    return {
        all: async () : Promise<IFetchResult<TEntity>|null> => {
            const fetchRequest: IFetchRequest = {
                url: baseUrl,
                method: 'GET',
                data: { page: 0, size: 0 },
                onError: () => {},
            };

            return await ApiAdapter.fetch<TEntity>(fetchRequest);
        },
        page: async (page: number, size: number) : Promise<IFetchResult<TEntity>|null> => {
            const fetchRequest: IFetchRequest = {
                url: baseUrl,
                method: 'GET',
                data: { page, size },
                onError: () => {},
            };

            return await ApiAdapter.fetch<TEntity>(fetchRequest);
        },
        find: async (id:string) : Promise<IFetchResult<TEntity>|null> => {
            const fetchRequest: IFetchRequest = {
                url: `${baseUrl}/${id}`,
                method: 'GET',
                data: {},
                onError: () => {},
            };

            return await ApiAdapter.fetch<TEntity>(fetchRequest);
        },
        add: async (record: TEntity) : Promise<IFetchResult<TEntity>|null> => {
            const fetchRequest: IFetchRequest = {
                url: `${baseUrl}`,
                method: 'POST',
                data: record,
                onError: () => {},
            };

            return await ApiAdapter.fetch<TEntity>(fetchRequest);
        },
        remove: async (id:string) : Promise<void> => {
            const fetchRequest: IFetchRequest = {
                url: `${baseUrl}/${id}`,
                method: 'DELETE',
                data: {},
                onError: () => {},
            };

            await ApiAdapter.fetch<TEntity>(fetchRequest);
        },
        update: async (id: string, record: TEntity) : Promise<IFetchResult<TEntity>|null> => {
            const fetchRequest: IFetchRequest = {
                url: `${baseUrl}/${id}`,
                method: 'PUT',
                data: record,
                onError: () => {},
            };

            return await ApiAdapter.fetch<TEntity>(fetchRequest);
        },
    };
}