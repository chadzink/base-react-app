import axios, { Method } from "axios";
import config from './config';
import { IFetchResult, IFetchRequest, ITokenSet } from './index';

export type IAdapter = {
    fetch: <TEntity>(options: IFetchRequest) => Promise<IFetchResult<TEntity>>;
    setTokens: (access_token:string, refresh_token:string) => Promise<void>;
    clearTokens: () => Promise<void>;
    getTokens: () => ITokenSet;
}

const _ApiAdapter = (): IAdapter => {
    return {
        fetch: async <TEntity>(options: IFetchRequest): Promise<IFetchResult<TEntity>> => {
        
            let result: IFetchResult<TEntity> = {
                data: [],
                type: 'GET',
                page_meta: {
                    page: 1,
                    size: 25,
                    total: 0,
                    pages: 0,
                    order: '',
                },
                success: false,
                message: '',
                access_token: '',
                refresh_token: '',
                errors: [],
            };
        
            const token: string|null = localStorage.getItem(config.tokenName);
            const dataOrParams: string = ["GET", "DELETE"].includes(options.method) ? "params" : "data";
            
            axios.defaults.baseURL = config.apiRoot || "";
        
            await axios.request({
                url: options.url,
                method: options.method as Method,
                headers: token ? {
                    "Authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                } : { "Access-Control-Allow-Origin": "*" },
                [dataOrParams]: options.data,
            }).then(({ data }) => {
                result = data as IFetchResult<TEntity>;

                if (result.success && result.access_token && result.refresh_token) {
                    ApiAdapter.setTokens(result.access_token, result.refresh_token);
                }
            }).catch(error => {
                // map error and assign to result
                result.errors = error.response
                        && error.response.data
                        && error.response.data
                        && error.response.data.api_errors
                    ? error.response.data.api_errors
                    : [];
                options.onError(result.errors);
            });
        
            return result;
        },
        setTokens: async (access_token:string, refresh_token:string): Promise<void> => {
            localStorage.setItem(config.tokenName, access_token);
            localStorage.setItem(config.refreshTokenName, refresh_token);
        },
        clearTokens: async (): Promise<void> => {
            localStorage.removeItem(config.tokenName);
            localStorage.removeItem(config.refreshTokenName);
        },
        getTokens: (): ITokenSet => {
            return {
                accessToken: localStorage.getItem(config.tokenName),
                refreshToken: localStorage.getItem(config.refreshTokenName),
            };
        },
    };
}

const ApiAdapter: IAdapter = _ApiAdapter();
Object.freeze(ApiAdapter);

export default ApiAdapter;