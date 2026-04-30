import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { MatTableModule } from '@angular/material/table';

export interface UserTable {
  createdAt: string;
  name: string;
  email: string;
  isActive: boolean;
  role?: string;
  actions?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
  imports: [MatTableModule],
})
export class Users {
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  displayedColumns: string[] = ['createdAt', 'name', 'email', 'isActive', 'role', 'actions'];
  dataSource: UserTable[] = [];

  protected readonly users = signal<User[]>([]);
  protected readonly errorMessage = signal('');
  protected readonly loggedUser = signal<User | null>(null);

  protected logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  editUser(user: User) {
    // Implementar lógica de edição de usuário
    console.log('Editar usuário:', user);
  }

  deleteUser(user: User) {
    // Implementar lógica de exclusão de usuário
    console.log('Excluir usuário:', user);
  }

  constructor() {
    this.authService.getAuthMe().subscribe({
      next: (user) => this.loggedUser.set(user),
      error: () => this.errorMessage.set('Nao foi possivel carregar usuario logado.'),
    });

    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users.set(users);

        this.dataSource = users.map((user) => ({
          createdAt: user.createdAt,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
          role: user.role,
        }));
      },
      error: () => this.errorMessage.set('Nao foi possivel carregar usuarios.'),
    });
  }
}
