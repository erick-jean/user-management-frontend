import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');

  protected email = '';
  protected password = '';

  protected onSubmit() {
    if (!this.email || !this.password || this.isLoading()) {
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/users');
      },
      error: (error: HttpErrorResponse) => {
        const message =
          error.status === 0
            ? 'Nao foi possivel conectar com a API.'
            : 'Email ou senha invalidos.';

        this.errorMessage.set(message);
        this.isLoading.set(false);
      },
    });
  }
}
