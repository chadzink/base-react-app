import { IFetchResult, IFetchRequest, ApiAdapter } from '../index';
import { IEntity, IEntitySingleton, CommonRestMixin } from './base-entity';

const ROLE_ALL_URL = '/role';
const ROLE_RESTORE_URL = '/role/restore';

export type IRole = IEntity & {
    label: string,
    name_canonical: string,
}

export interface IRolesSingleton extends IEntitySingleton<IRole> {
    // add any custom interface actions for entity
    restore: (id: string) => Promise<IFetchResult<IRole>|null>,
}

const _Roles = (): IRolesSingleton => {
    const restMixin: IEntitySingleton<IRole> = CommonRestMixin<IRole>(ROLE_ALL_URL);

    return {
        all: restMixin.all,
        page: restMixin.page,
        find: restMixin.find,
        add: restMixin.add,
        remove: restMixin.remove,
        update: restMixin.update,
        restore: async (id:string) : Promise<IFetchResult<IRole>|null> => {
            const fetchRequest: IFetchRequest = {
                url: `${ROLE_RESTORE_URL}/${id}`,
                method: 'PUT',
                data: {},
                onError: () => {},
            };

            return await ApiAdapter.fetch<IRole>(fetchRequest);
        },
    };
}

const Roles: IRolesSingleton = _Roles();
Object.freeze(Roles);

export default Roles;