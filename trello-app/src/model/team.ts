import { User } from './user';

export interface Team {
    id: string;
    name: string;
    createor: User;
    members: User[];
}