import {
    IEntity,
    IEntitySingleton,
    IPagedEntitySingleton,
    IRestoreEntitySingleton,
    RestfulMixin,
    PagingMixin,
    RestorableMixin } from './base-entity';

const ROLE_ALL_URL = '/role';
const ROLE_RESTORE_URL = '/role/restore';

export type IRole = IEntity & {
    label: string,
    name_canonical: string,
}

export interface IRolesSingleton extends
    IEntitySingleton<IRole>,
    IPagedEntitySingleton<IRole>,
    IRestoreEntitySingleton<IRole> {
        // add any custom interface actions for entity
    }

const _Roles = (): IRolesSingleton => {
    const restMixin: IEntitySingleton<IRole> = RestfulMixin<IRole>(ROLE_ALL_URL);
    const pagedMixin: IPagedEntitySingleton<IRole> = PagingMixin<IRole>(ROLE_ALL_URL);
    const restoreMixin: IRestoreEntitySingleton<IRole> = RestorableMixin<IRole>(ROLE_RESTORE_URL);

    return {
        all: restMixin.all,
        page: pagedMixin.page,
        find: restMixin.find,
        add: restMixin.add,
        remove: restMixin.remove,
        update: restMixin.update,
        restore: restoreMixin.restore,
    };
}

const Roles: IRolesSingleton = _Roles();
Object.freeze(Roles);

export default Roles;