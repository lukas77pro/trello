import { Injectable } from '@angular/core';
import { User } from 'src/model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly KEY_USER = 'keyUser';
  readonly BASE_URL = 'http://localhost:8098/trello';

  public user: User;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  loadUser(): void {
    const userData = localStorage.getItem(this.KEY_USER);
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  login(username: string, password: string) {
    return this.httpClient.get<User>(`${this.BASE_URL}/user`, {
      headers: new HttpHeaders().append('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    }).subscribe(user => {
      this.user = { ...user, password: password };
      localStorage.setItem(this.KEY_USER, JSON.stringify(this.user));
      this.router.navigate([''])
    })
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.KEY_USER);
    this.router.navigate(['/login']);
  }

  getAuthHeader(): HttpHeaders {
    return this.user ? new HttpHeaders({
      'Authorization': `Basic ${btoa(`${this.user.username}:${this.user.password}`)}`
    }) : null;
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }
}
