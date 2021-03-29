import { IApiConfig, IFetchResult } from './index';

export const DEFAULT_FETCH_RESULT: IFetchResult = {
    data: [],
    type: 'GET',
    success: false,
    message: '',
    access_token: '',
    refresh_token: '',
    errors: [],
}

const Config: IApiConfig = {
    apiRoot: 'http://localhost:44389/',
    tokenName: 'base-react-app-token',
    refreshTokenName: 'base-react-app-refresh-token',
}

export default Config;