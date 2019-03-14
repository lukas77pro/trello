import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../model/board';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  readonly BASE_URL = 'http://localhost:8098/trello';
  readonly USERNAME = 'trello';
  readonly PASSWORD = 'trello';
  readonly HEADERS = new HttpHeaders({
    'Authorization': `Basic ${btoa(`${this.USERNAME}:${this.PASSWORD}`)}`
  });

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.BASE_URL}/boards`, { headers: this.HEADERS });
  }

  get(id: String): Observable<Board> {
    return this.httpClient.get<Board>(`${this.BASE_URL}/boards/${id}`, { headers: this.HEADERS });
  }

  create(boardName: string): Observable<Board> {
    return this.httpClient.post<Board>(`${this.BASE_URL}/boards`, boardName, {
      headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(`${this.USERNAME}:${this.PASSWORD}`)}`
      })
    });
  }

  delete(id: String): Observable<{}> {
    return this.httpClient.delete(`${this.BASE_URL}/boards/${id}`, { headers: this.HEADERS });
  }
}
