import { Component,  OnDestroy } from '@angular/core';
import { User } from 'src/model/user';
import { EventService } from 'src/event/event.service';
import { EventType, Events, UserLoggedIn } from 'src/event/events';
import { Subscriber } from 'src/event/subscriber';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, Subscriber {
  user: User;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private router: Router) {
    this.eventService.subscribe(this, EventType.UserLoggedIn, EventType.UserLoggedOut);
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribe(this);
  }

  onEventReceived(event: Events): void {
    this.user = event instanceof UserLoggedIn ? event.payload : null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
