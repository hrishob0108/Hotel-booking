import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const roleGuard = (requiredRole: 'ADMIN' | 'USER'): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    if (authService.getRole() === requiredRole) {
      return true;
    }

    // Redirect to appropriate dashboard
    if (authService.isAdmin()) {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/user']);
    }
    return false;
  };
};
