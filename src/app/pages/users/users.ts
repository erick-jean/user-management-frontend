import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Table } from '../../shared/components/table/table';

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
  imports: [MatTableModule, CommonModule, Table],
})
export class Users {
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly users = signal<User[]>([]);
  protected readonly errorMessage = signal('');
  protected readonly loggedUser = signal<User | null>(null);

  columns: { key: string; name: string, sortable?: boolean }[] = [
    { key: 'createdAt', name: 'Data de Criação', sortable: true },
    { key: 'name', name: 'Nome', sortable: true },
    { key: 'email', name: 'Email', sortable: true },
    { key: 'isActive', name: 'Ativo', sortable: true },
    { key: 'role', name: 'Função', sortable: true },
    { key: 'actions', name: 'Ações', sortable: false },
  ];

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
      },
      error: () => this.errorMessage.set('Nao foi possivel carregar usuarios.'),
    });
  }
}
