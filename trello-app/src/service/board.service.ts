import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../model/board';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  getAll(teamId: string): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.BASE_URL}/boards`, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('teamId', teamId)
    });
  }

  get(id: String): Observable<Board> {
    return this.httpClient.get<Board>(`${this.BASE_URL}/boards/${id}`, {
      headers: this.authService.getAuthHeader()
    });
  }

  create(title: string, teamId: string): Observable<Board> {
    return this.httpClient.post<Board>(`${this.BASE_URL}/boards`, title, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('teamId', teamId)
    });
  }

  delete(id: String): Observable<{}> {
    return this.httpClient.delete(`${this.BASE_URL}/boards/${id}`, {
      headers: this.authService.getAuthHeader()
    });
  }

  move(previousIndex: number, currentIndex: number): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/boards/move`, {}, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams()
        .append('previousIndex', previousIndex.toString())
        .append('currentIndex', currentIndex.toString())
    });
  }
}
