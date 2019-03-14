import { Events } from './events';

export interface Subscriber {
    onEventReceived(event: Events): void;
}