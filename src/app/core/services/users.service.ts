import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private API = '/api/users';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<{ data: User[] }>(this.API)
      .pipe(map((response) => response.data));
  }

  create(user: Partial<User>) {
    return this.http.post<User>(this.API, user);
  }
}
