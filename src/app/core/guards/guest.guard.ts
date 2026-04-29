import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasToken = !!localStorage.getItem('token');

  return hasToken ? router.createUrlTree(['/users']) : true;
};
