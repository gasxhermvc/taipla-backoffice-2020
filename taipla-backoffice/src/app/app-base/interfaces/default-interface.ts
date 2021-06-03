export interface JsonWebToken {
    access_token: string
    expired: Date,
    payload?: User,
    client_id?: string,
    remember_me?: boolean,
    authenticated: boolean
}

export interface User {
    USER_ID?: number;
    CLIEBT_ID?: string;
    EMAIL?: string;
    FIRST_NAME?: string;
    LAST_NAME?: string;
    USERNAME?: string;
    PHONE?: number;
    ROLE?: string;
    RES_ID?: number;
    AVATAR?: string;
    DISPLAY_NAME?: string;
}
