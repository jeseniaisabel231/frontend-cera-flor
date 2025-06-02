import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

//decodifica el token
function isAuthenticated() {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  if (!token) return false;

  return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
}
export const AuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return true;

  return inject(Router).createUrlTree(['/iniciar-sesion']);
};
export const NoAuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return inject(Router).createUrlTree(['/admin/dashboard']);

  return true;
};
