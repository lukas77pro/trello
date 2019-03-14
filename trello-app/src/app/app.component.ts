import { Component, OnDestroy } from '@angular/core';
import { EventService } from '../event/event.service';
import { Subscriber } from '../event/subscriber';
import { Events, EventType, BoardCreatedEvent, BoardDeletedEvent } from '../event/events';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements Subscriber, OnDestroy {

  constructor(private eventService: EventService) {
    eventService.subscribe(this, EventType.BoardCreated, EventType.BoardDeleted);
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribe(this);
  }

  onEventReceived(event: Events): void {
    switch (event.getType()) {
      case EventType.BoardCreated: {
        console.log((event as BoardDeletedEvent).payload);
        break;
      }
      case EventType.BoardDeleted: {
        console.log((event as BoardDeletedEvent).payload + 'aaa');
        break;
      }
    }
  }
}
