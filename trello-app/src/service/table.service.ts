import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/model/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  readonly BASE_URL = 'http://localhost:8080/trello';
  readonly USERNAME = 'trello';
  readonly PASSWORD = 'trello';
  readonly HEADERS = new HttpHeaders({
    'Authorization': `Basic ${btoa(`${this.USERNAME}:${this.PASSWORD}`)}`
  });

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(`${this.BASE_URL}/tables`, { headers: this.HEADERS });
  }

  get(id: String): Observable<Table> {
    return this.httpClient.get<Table>(`${this.BASE_URL}/tables/${id}`, { headers: this.HEADERS });
  }

  create(table: Table): Observable<Table> {
    return this.httpClient.post<Table>(`${this.BASE_URL}/tables`, table, { headers: this.HEADERS });
  }

  delete(id: String): Observable<{}> {
    return this.httpClient.delete(`${this.BASE_URL}/tables/${id}`, { headers: this.HEADERS });
  }
}
