import axios, { Method } from "axios";
import config from './config';
import { IFetchResult, IFetchRequest, ITokenSet, DEFAULT_FETCH_RESULT } from './index';

export type IAdapter = {
    fetch: (options: IFetchRequest) => Promise<IFetchResult>;
    setTokens: (access_token:string, refresh_token:string) => Promise<void>;
    clearTokens: () => Promise<void>;
    getTokens: () => ITokenSet;
}

const _ApiAdapter = (): IAdapter => {
    return {
        fetch: async (options: IFetchRequest): Promise<IFetchResult> => {
        
            let result: IFetchResult = DEFAULT_FETCH_RESULT;
        
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
                result = data as IFetchResult;

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