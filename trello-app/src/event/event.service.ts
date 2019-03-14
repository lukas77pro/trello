import { Injectable } from '@angular/core';
import { Subscriber } from './subscriber';
import { Events, Event, EventType } from './events';

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
    this.subscribers.forEach((subs, type) => console.log(subs));
  }

  unsubscribe(subscriber: Subscriber) {
    this.subscribers.forEach(eventSubscribers => eventSubscribers.delete(subscriber));
    this.subscribers.forEach((subs, type) => console.log(subs));
  }

  push(event: Events) {
    console.log(event);
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
