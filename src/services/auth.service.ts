import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

interface respuestaLogin {
  response: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private urlBackend = environment.urlApi;
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
  private http = inject(HttpClient);

  //endpoint de login
  login(email: string, password: string) {
    //metodo post: enviar datos
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/api/login`, {
        email,
        password,
      })
      .pipe(tap((response) => localStorage.setItem('token', response.token)));
  }

  register(
    nombre: string,
    apellido: string,
    genero: string,
    email: string,
    password: string,
    
    //confirmPassword: string,
  ): Observable<respuestaLogin> {
    // Método POST: enviar todos los datos necesarios
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/api/registro`, {
        nombre,
        apellido,
        genero,
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response?.token) {
            // Considera usar un servicio de autenticación en lugar de localStorage directo
            localStorage.setItem('token', response.token);
          }
        })
      );
  }
  recuperarContrasenia(email: string): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/api/recuperar-contrasenia`, {
      email,
    });
  }
}
