import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('authToken') !== null;
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};