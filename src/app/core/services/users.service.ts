import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private API = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.API);
  }

  create(user: Partial<User>) {
    return this.http.post<User>(this.API, user);
  }
}
