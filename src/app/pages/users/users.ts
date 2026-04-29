import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);

  protected readonly users = signal<User[]>([]);
  protected readonly errorMessage = signal('');

  logout() {
    this.authService.logout();
  }

  constructor() {
    this.usersService.getAll().subscribe({
      next: (users) => this.users.set(users),
      error: () => this.errorMessage.set('Nao foi possivel carregar usuarios.'),
    });
  }
}
