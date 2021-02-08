export interface LoginForm {
    USERNAME: string;
    PASSWORD: string;
    REMEMBER_ME?: boolean;
}

export interface LoginResult {
    client_id?: string;
    access_token?: string;
    expire?: number;
    status_code?: number;
    message?: string;
}