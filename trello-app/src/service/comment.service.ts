import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Comment } from 'src/model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  create(boardId: string, cardListId: string, cardId: string, content: string): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.BASE_URL}/boards/${boardId}/cardlists/${cardListId}/cards/${cardId}/comments`, content, {
      headers: this.authService.getAuthHeader()
    });
  }
}
