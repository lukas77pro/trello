import { Board } from '../model/board';

export abstract class Event<T> {
    abstract getType(): EventType;
    constructor(public payload: T) {}
}

export enum EventType {
    BoardCreated,
    BoardUpdated,
    BoardDeleted
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

export type Events =
| BoardCreatedEvent
| BoardUpdatedEvent
| BoardDeletedEvent;
