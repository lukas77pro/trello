import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Team } from 'src/model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  get(id: string): Observable<Team> {
    return this.httpClient.get<Team>(`${this.BASE_URL}/teams/${id}`, {
      headers: this.authService.getAuthHeader()
    });
  }

  getAll(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.BASE_URL}/teams`, {
      headers: this.authService.getAuthHeader()
    });
  }

  create(name: string): Observable<Team> {
    return this.httpClient.post<Team>(`${this.BASE_URL}/teams`, name, {
      headers: this.authService.getAuthHeader()
    });
  }
}
