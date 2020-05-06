export interface JsonWebToken {
    access_token: string
    payload?: User,
    remember_me?: boolean,
    authenticated: boolean
}

export interface User {
    client_id?: string;
    displayName?: string;
    email?: string;
    idRestaurant?: number;
    imageProfile?: string;
    phoneNumber?: number;
    role?: string;
}
