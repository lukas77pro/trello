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

  create(name: string, boardId: string): Observable<CardList> {
    return this.httpClient.post<CardList>(`${this.BASE_URL}/cardlist`, name, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().set('boardId', boardId)
    });
  }
}
