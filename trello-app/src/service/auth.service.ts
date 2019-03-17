import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventService } from 'src/event/event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private eventService: EventService) {

  }

  login(username: string, password: string) {
    this.httpClient.get<User>(`${this.BASE_URL}/login`, {
      headers: new HttpHeaders().append('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    }).pipe().subscribe(user => {
      console.log(user);
    });
  }
}
