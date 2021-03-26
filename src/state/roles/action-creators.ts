import * as Api from '../../api';
import { IRolesStoreAction } from './types';
import { START_LOAD_ROLES } from './action-types';

export function loadRoles() {
    return Api.Roles.getAll().then((roles) => {
        const action: IRolesStoreAction = {
            type: START_LOAD_ROLES,
            roles,
        };

        return action;
    });
}