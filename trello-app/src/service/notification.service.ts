import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AppNotification } from 'src/model/app-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
   }

  create(notification: AppNotification): Observable<AppNotification> {
    return this.httpClient.post<AppNotification>(`${this.BASE_URL}/notification`, notification, {
      headers: this.authService.getAuthHeader()
    });
  }

  getAll(userId: string): Observable<AppNotification[]> {
    return this.httpClient.get<AppNotification[]>(`${this.BASE_URL}/notification`, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('userId', userId)
    });
  }
}
