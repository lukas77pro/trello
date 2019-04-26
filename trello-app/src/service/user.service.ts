import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  get(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.BASE_URL}/user/${userId}`, {
      headers: this.authService.getAuthHeader()
    });
  }

  create(user: User): Observable<{}> {
    return this.httpClient.post<{}>(`${this.BASE_URL}/user`, user);
  }
}
