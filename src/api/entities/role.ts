import { ApiAdapter, IFetchResult, IFetchRequest } from '../index';
import { IEntity, IEntitySingleton } from './base-entity';

const ROLE_ALL_URL = '/role';

export type IRole = IEntity & {
    label: string,
}

export interface IRolesSingleton extends IEntitySingleton<IRole> {
    // add any custom interface actions for entity
}

const _Roles = (): IRolesSingleton => {
    return {
        getAll: async (page: number, size: number) : Promise<IFetchResult<IRole>|null> => {
            const fetchRequest: IFetchRequest = {
                url: ROLE_ALL_URL,
                method: 'GET',
                data: { page, size },
                onError: () => {},
            };

            return await ApiAdapter.fetch<IRole>(fetchRequest);
        },
    };
}

const Roles: IRolesSingleton = _Roles();
Object.freeze(Roles);

export default Roles;