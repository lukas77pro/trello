import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';
import { Subscriber } from '../event/subscriber';
import { Events, EventType, BoardCreatedEvent, BoardDeletedEvent } from '../event/events';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loadUser();
  }
}
