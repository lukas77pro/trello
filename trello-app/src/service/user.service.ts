import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient) {
  }

  create(user: User): Observable<{}> {
    return this.httpClient.post<{}>(`${this.BASE_URL}/user`, user);
  }
}
