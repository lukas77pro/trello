import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  delete(id: string): Observable<{}> {
    return this.httpClient.delete(`${this.BASE_URL}/teams/${id}`, {
      headers: this.authService.getAuthHeader()
    });
  }

  addInvitation(id: string, userId: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/teams/${id}/invitations/add`, {}, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('userId', userId)
    });
  }

  removeInvitation(id: string, userId: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/teams/${id}/invitations/remove`, {}, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('userId', userId)
    });
  }

  getInvitations(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.BASE_URL}/teams/invitations`, {
      headers: this.authService.getAuthHeader()
    });
  }

  acceptInvitation(id: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/teams/${id}/invitations/accept`, {}, {
      headers: this.authService.getAuthHeader()
    });
  }

  rejectInvitation(id: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/teams/${id}/invitations/reject`, {},  {
      headers: this.authService.getAuthHeader()
    });
  }

  removeMember(id: string, userId: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/teams/${id}/members/remove`, {},  {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('userId', userId)
    });
  }

  leave(id: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/teams/${id}/members/leave`, {},  {
      headers: this.authService.getAuthHeader()
    });
  }
}
