import { IRole } from '../../api';

export type IRolesStoreState = {
    roles: IRole[]|null,
    loadingRoles: boolean,
}