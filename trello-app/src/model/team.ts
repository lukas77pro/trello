import { User } from './user';

export interface Team {
    id: string;
    name: string;
    creator: User;
    members: User[];
    invitedUsers: User[];
}