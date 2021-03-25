import axios, { Method } from "axios";
import config from './config';

export type IFetchResult = {
    data: Array<any>;
    type: string;
    success: boolean;
    message: string;
    access_token: string;
    refresh_token: string;
    errors: Array<any>;
}

export type IFetchRequest = {
    url: string;
    method: string;
    data: any;
}

export type IAdapter = {
    fetch: (options: IFetchRequest) => Promise<IFetchResult>,
    setTokens: (access_token:string, refresh_token:string) => Promise<void>,
    clearTokens: () => Promise<void>,
}

const _ApiAdapter = (): IAdapter => {
    return {
        fetch: async (options: IFetchRequest): Promise<IFetchResult> => {
        
            let result: IFetchResult = {
                data: [],
                type: 'GET',
                success: false,
                message: '',
                access_token: '',
                refresh_token: '',
                errors: []
            }
        
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
                result.errors = [error];
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
    };
}

const ApiAdapter: IAdapter = _ApiAdapter();
Object.freeze(ApiAdapter);

export default ApiAdapter;