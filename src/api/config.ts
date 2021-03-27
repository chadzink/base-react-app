export type IApiConfig = {
    apiRoot: string;
    tokenName: string;
    refreshTokenName: string;
}

const Config: IApiConfig = {
    apiRoot: 'http://localhost:44389/',
    tokenName: 'base-react-app-token',
    refreshTokenName: 'base-react-app-refresh-token',
}

export default Config;