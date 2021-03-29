export type IApiConfig = {
    apiRoot: string;
    tokenName: string;
    refreshTokenName: string;
}

export type IFetchResult = {
    data: any[];
    type: string;
    success: boolean;
    message: string;
    access_token: string;
    refresh_token: string;
    errors: any[];
}

export type IFetchRequest = {
    url: string;
    method: string;
    data: any;
    onError: (errors:any[]) => void;
}

export type ITokenSet = {
    accessToken: string|null;
    refreshToken: string|null;
}