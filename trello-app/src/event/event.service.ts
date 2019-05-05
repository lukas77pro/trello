import { Injectable } from '@angular/core';
import { Subscriber } from './subscriber';
import { Events, EventType } from './events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private subscribers: Map<EventType, Set<Subscriber>>;

  constructor() {
    this.subscribers = new Map;
  }

  subscribe(subscriber: Subscriber, ...eventTypes: EventType[]) {
    eventTypes.forEach(eventType => this.subscribeForEvent(subscriber, eventType));
  }

  unsubscribe(subscriber: Subscriber) {
    this.subscribers.forEach(eventSubscribers => eventSubscribers.delete(subscriber));
  }

  push(event: Events) {
    const eventSubscribers = this.subscribers.get(event.getType());
    if (eventSubscribers) {
      eventSubscribers.forEach(subscriber => subscriber.onEventReceived(event));
    }
  }

  private subscribeForEvent(subscriber: Subscriber, eventType: EventType) {
    let eventSubscribers = this.subscribers.get(eventType);
    if (!eventSubscribers) {
      eventSubscribers =  new Set;
      this.subscribers.set(eventType, eventSubscribers);
    }
    eventSubscribers.add(subscriber);
  }
}
