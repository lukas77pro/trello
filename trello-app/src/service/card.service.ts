import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from 'src/model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  create(title: string, boardId: string, cardListId: string): Observable<Card> {
    return this.httpClient.post<Card>(`${this.BASE_URL}/boards/${boardId}/cardlists/${cardListId}/cards`, title, {
      headers: this.authService.getAuthHeader()
    });
  }

  update(boardId: string, cardListId: string, cardId: string, card: Card): Observable<Card> {
    return this.httpClient.put<Card>(`${this.BASE_URL}/boards/${boardId}/cardlists/${cardListId}/cards/${cardId}`, card, {
      headers: this.authService.getAuthHeader()
    });
  }

  move(sourceCardListId: string, previousIndex: number,
       targetCardListId: string, currentIndex: number, boardId: string): Observable<{}> {
    return this.httpClient
        .put(`${this.BASE_URL}/boards/${boardId}/cardlists/${sourceCardListId}/cards/move`, {}, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams()
        .append('targetCardListId', targetCardListId)
        .append('previousIndex', previousIndex.toString())
        .append('currentIndex', currentIndex.toString())
    });
  }
}
