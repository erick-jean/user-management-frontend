import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);

  protected readonly users = signal<User[]>([]);
  protected readonly errorMessage = signal('');
  protected readonly loggedUser = signal<User | null>(null);

  protected logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  constructor() {
    this.authService.getAuthMe().subscribe({
      next: (user) => this.loggedUser.set(user),
      error: () => this.errorMessage.set('Nao foi possivel carregar usuario logado.'),
    });

    this.usersService.getAll().subscribe({
      next: (users) => this.users.set(users),
      error: () => this.errorMessage.set('Nao foi possivel carregar usuarios.'),
    });
  }
}
