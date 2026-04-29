import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  private readonly usersService = inject(UsersService);

  protected readonly users = signal<User[]>([]);
  protected readonly errorMessage = signal('');

  constructor() {
    this.usersService.getAll().subscribe({
      next: (users) => this.users.set(users),
      error: () => this.errorMessage.set('Nao foi possivel carregar usuarios.'),
    });
  }
}
