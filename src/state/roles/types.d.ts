
import { IRole } from '../../api';

export type IRolesStoreAction = {
    type: string;
    roles: Array<IRole>|null;
}

export type RoleStoreDispatchType = (args: IRolesStoreAction) => IRolesStoreAction;