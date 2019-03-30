import { Injectable } from '@angular/core';
import { CardList } from '../model/card-list';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardListService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  create(title: string, boardId: string): Observable<CardList> {
    return this.httpClient.post<CardList>(`${this.BASE_URL}/boards/${boardId}/cardlists`, title, {
      headers: this.authService.getAuthHeader()
    });
  }

  move(previousIndex: number, currentIndex: number, boardId: string): Observable<{}> {
    return this.httpClient.put(`${this.BASE_URL}/boards/${boardId}/cardlists/move`, {}, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams()
        .append('previousIndex', previousIndex.toString())
        .append('currentIndex', currentIndex.toString())
    });
  }
}
