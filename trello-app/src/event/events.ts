import { Board } from '../model/board';
import { User } from 'src/model/user';

export abstract class Event<T> {
    abstract getType(): EventType;
    constructor(public payload: T) {}
}

export enum EventType {
    BoardCreated,
    BoardUpdated,
    BoardDeleted,
    UserLoggedIn,
    UserLoggedOut,
}

export class BoardCreatedEvent extends Event<Board> {
    getType = () => EventType.BoardCreated;
}

export class BoardUpdatedEvent extends Event<Board> {
    getType = () => EventType.BoardUpdated;
}

export class BoardDeletedEvent extends Event<string> {
    getType = () => EventType.BoardDeleted;
}

export class UserLoggedIn extends Event<User> {
    getType = () => EventType.UserLoggedIn;
}

export class UserLoggedOut extends Event<any> {
    getType = () => EventType.UserLoggedOut;
}

export type Events =
| BoardCreatedEvent
| BoardUpdatedEvent
| BoardDeletedEvent
| UserLoggedIn
| UserLoggedOut;
