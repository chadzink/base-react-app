import { IFetchResult } from './types';

export const DEFAULT_FETCH_RESULT: IFetchResult = {
    data: [],
    type: 'GET',
    success: false,
    message: '',
    access_token: '',
    refresh_token: '',
    errors: [],
}