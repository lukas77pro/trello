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
    return this.httpClient.get<User>(`${this.BASE_URL}/users`, {
      headers: new HttpHeaders().append('Authorization', `Basic ${btoa(`${username}:${password}`)}`)
    }).subscribe(user => {
      this.user = this.saveUser({ ...user, password: password });
      this.router.navigate([''])
    })
  }

  updateUserImage(imageId: string) {
    this.user = this.saveUser({...this.user, imageId: imageId});
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

  private saveUser(user: User) {
    localStorage.setItem(this.KEY_USER, JSON.stringify(user));
    return user;
  }
}
