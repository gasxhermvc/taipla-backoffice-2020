export interface LoginForm {
    username: string;
    password: string;
    remember_me?: boolean;
}

export interface LoginResult {
    client_id?: string;
    access_token?: string;
    expire?: number;
    status_code?: number;
    message?: string;
}