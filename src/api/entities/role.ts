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
        getAll: async (errorsCallback = (errors:any[]) => {}) : Promise<Array<IRole>|null> => {
            const fetchRequest: IFetchRequest = {
                url: ROLE_ALL_URL,
                method: 'GET',
                data: null,
                onError: errorsCallback,
            };

            const result: IFetchResult = await ApiAdapter.fetch(fetchRequest);
            
            if (result.errors && result.errors.length) {
                fetchRequest.onError(result.errors);
            }

            // Map result to interface result type
            return result.data && result.data.length > 0 ? result.data as Array<IRole> : null;
        },
    };
}

const Roles: IRolesSingleton = _Roles();
Object.freeze(Roles);

export default Roles;