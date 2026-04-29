import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = '/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<{ accessToken: string }>(`${this.API}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.accessToken);
        }),
      );
  }

  getAuthMe() {
    return this.http.get<User>(`${this.API}/auth/me`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
