import { Injectable, OnInit } from '@angular/core';
import { EventService} from 'src/event/event.service';
import { UserLoggedOut, UserLoggedIn } from 'src/event/events';
import { User } from 'src/model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly KEY_USER = 'keyUser';
  readonly BASE_URL = 'http://localhost:8098/trello';

  private user: User;

  constructor(private httpClient: HttpClient,
              private eventService: EventService) {

  }

  loadUser(): void {
    const userData = localStorage.getItem(this.KEY_USER);
    if (userData) {
      this.user = JSON.parse(userData);
      this.eventService.push(new UserLoggedIn(this.user));
    }
  }

  login(username: string, password: string) {
    return this.httpClient.get<User>(`${this.BASE_URL}/user`, {
      headers: new HttpHeaders().append('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    }).subscribe(user => {
      this.user = user;
      user.password = password;
      localStorage.setItem(this.KEY_USER, JSON.stringify(user));
      this.eventService.push(new UserLoggedIn(user));
    })
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.KEY_USER);
    this.eventService.push(new UserLoggedOut({}));
  }

  getAuthHeader(): HttpHeaders {
    return this.user ? new HttpHeaders({
      'Authorization': `Basic ${btoa(`${this.user.username}:${this.user.password}`)}`
    }) : null;
  }
}
