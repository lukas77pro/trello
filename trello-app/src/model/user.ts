import { Role } from './role';

export interface User {
    id: string;
    username: string;
    password: string;
    imageId?: string;
    email: string;
    roles: Role[];
}