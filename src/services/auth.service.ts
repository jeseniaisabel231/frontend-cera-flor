import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

interface respuestaLogin {
  response: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBackend = '';
  private http = inject(HttpClient);

  //endpoint de login
  login(email: string, password: string) {
    //metodo post: enviar datos
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/auth/login`, {
        email,
        password,
      })
      .pipe(tap((response) => localStorage.setItem('token', response.token)));
  }
  //endpoint de registro
  register(nombre:string, apellido:string, email: string, genero:string, password: string) {
    //metodo post: enviar datos
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/auth/login`, {
        email,
        password,
      })
      .pipe(tap((response) => localStorage.setItem('token', response.token)));
  }
}
