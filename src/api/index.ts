export { default as ApiConfig } from './config';
export { default as ApiAdapter } from './adapter';

export type { IApiConfig } from './config';
export type { IFetchResult, IFetchRequest } from './adapter';

// start exporting entities here
export type { IUser } from './entities/user';
export { default as Users } from './entities/user';