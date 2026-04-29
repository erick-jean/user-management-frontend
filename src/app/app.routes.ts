import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((component) => component.Login),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users/users').then((component) => component.Users),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
