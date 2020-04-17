export interface User {
    user_id: number;
    client_id: string;
    username: string;
    prefix?: string;
    firstname?: string;
    lastname?: string;
    status: string;
}