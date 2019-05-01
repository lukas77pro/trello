import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  get(id: String): Observable<Blob> {
    return this.httpClient.get(`${this.BASE_URL}/images/${id}`, {
      headers: this.authService.getAuthHeader(),
      responseType: 'blob'
    });
  }
}