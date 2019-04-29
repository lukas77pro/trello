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
export class NavbarComponent {

  constructor(private authService: AuthService) {
  }

  getUser() {
    return this.authService.user;
  }

  logout(): void {
    this.authService.logout();
  }
}
