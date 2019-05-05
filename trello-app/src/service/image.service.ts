import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Image } from 'src/model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly BASE_URL = 'http://localhost:8098/trello';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post(`${this.BASE_URL}/images`, formData, {
      headers: this.authService.getAuthHeader(),
      responseType: 'text'
    });
  }

  get(id: String, size: number = 0): Observable<Image> {
    return this.httpClient.get<Image>(`${this.BASE_URL}/images/${id}`, {
      headers: this.authService.getAuthHeader(),
      params: new HttpParams().append('size', `${size}`)
    });
  }
}