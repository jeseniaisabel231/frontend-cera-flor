import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { decodificarToken } from '../utils/decodificarToken';

//decodifica el token
function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
}
export const AuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return true; // Si está autenticado, permite el acceso a las rutas protegidas

  return inject(Router).createUrlTree(['/iniciar-sesion']); // Si no está autenticado, redirige a la página de inicio de sesión
};
export const NoAuthGuard: CanActivateFn = () => {
  const tokenDecodificado = decodificarToken();
  if (!tokenDecodificado) {
    return true; // Si no hay token, permite el acceso a las rutas de autenticacion para que el usuario inicie sesion o se registre
  }

  if (tokenDecodificado.rol === 'admin') {
    return inject(Router).createUrlTree(['/admin/dashboard']); // Si es administrador, redirige al dashboard
  }

  return inject(Router).createUrlTree(['/inicio']); // Si es cliente, redirige a inicio
};
//cuando es administrador
export const AdminGuard: CanActivateFn = () => {
  const tokenDecodificado = decodificarToken();
  
  if (tokenDecodificado?.rol !== 'admin') {
    return inject(Router).createUrlTree(['/iniciar-sesion']); // Si no es admin, redirige a inicio
  }

  return true; // Si es admin, permite el acceso
}
