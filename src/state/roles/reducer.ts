import { IRolesStoreState } from './state';
import { IRolesStoreAction } from './types';
import { START_LOAD_ROLES } from './action-types';

export const initialRoleStoreState: IRolesStoreState = {
    roles: [],
    loadingRoles: false,
}

export const reducerRoleStore = (
    state: IRolesStoreState = initialRoleStoreState,
    action: IRolesStoreAction
): IRolesStoreState => {
    switch (action.type) {
      case START_LOAD_ROLES:
        return {
            ...state,
            roles: action.roles,
            loadingRoles: false,
        }
    }
    
    return state;
}