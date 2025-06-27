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
  private http = inject(HttpClient);
  private datosUsuario: any = {};

  //endpoint de login
  login(email: string, password: string) {
    //metodo post: enviar datos
    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/api/login?environment=mobile`, {
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
        }),
      );
  }
  recuperarContrasenia(email: string): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/api/recuperar-contrasenia`, {
      email,
    });
  }
  restablecerContrasenia(
    email: string,
    nuevaPassword: string,
    codigoRecuperacion: string,
  ) {
    return this.http.post<any>(`${this.urlBackend}/api/cambiar-contrasenia?codigoRecuperacion=${codigoRecuperacion}`, {
      email,
      nuevaPassword,
    });
  }
  obtenerPerfil() {
    
    return this.http
      .get<any>(`${this.urlBackend}/api/perfil`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response) => {
          this.datosUsuario = response;
          localStorage.setItem(
            'datosUsuario',
            JSON.stringify(this.datosUsuario),
          );
        }),
      );
  }
  actualizarPerfil(datosCliente: any) {
    return this.http
      .put<any>(`${this.urlBackend}/api/perfil`, datosCliente, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((response) => {
          this.datosUsuario = response;
          localStorage.setItem(
            'datosUsuario',
            JSON.stringify(this.datosUsuario),
          );
        }),
      );
  }

  get estadoAutenticacion(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
  }
}
