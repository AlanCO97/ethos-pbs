export interface UserResponseData {
    id: string;
    name: string;
    email: string;
    fullName: string;
}

export interface AuthResponseData {
    user: UserResponseData;
    token?: string;
}