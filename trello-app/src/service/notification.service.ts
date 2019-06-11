import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
   }

  create(title: string): Observable<Notification> {
    return this.httpClient.post<Notification>(`${this.BASE_URL}/notification`, title, {
      headers: this.authService.getAuthHeader()
    });
  }

  getAll(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`${this.BASE_URL}/notification`, {
      headers: this.authService.getAuthHeader()
    });
  }
}
