export interface IUserProfile {
    email: string;
    username: string;
    is_active: boolean;
    is_email_verified: boolean;
    is_superuser: boolean;
    first_name: string;
    last_name: string;
    id: number;
}

export interface IUserProfileUpdate {
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_email_verified?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    username: string;
    first_name: string;
    last_name?: string;
    password: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_email_verified?: boolean;
}
