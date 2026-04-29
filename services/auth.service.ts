import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { email } from '@angular/forms/signals';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000';

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
