export { default as ApiConfig, DEFAULT_FETCH_RESULT } from './config';
export { default as ApiAdapter } from './adapter';

export type {  } from './config';
export type { IApiConfig, IFetchResult, IFetchRequest, ITokenSet } from './types';

// start export for custom api controllers that don't map to RESTful entities
export type { IAuthUser } from './auth';
export { default as AuthUsers } from './auth';

// start exporting entities here
export type { IUser } from './entities/user';
export { default as Users } from './entities/user';

export type { IRole } from './entities/role';
export { default as Roles } from './entities/role';