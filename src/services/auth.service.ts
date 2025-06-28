import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { CarritoService } from './carrito.service';
import { decodificarToken } from '../app/utils/decodificarToken';

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
  private carritoService = inject(CarritoService);
  private datosUsuario: any = {};
  public estaAutenticado = decodificarToken()?.exp * 1000 > Date.now();

  login(email: string, password: string) {
    const productos = this.carritoService.carrito().productos;

    return this.http
      .post<respuestaLogin>(`${this.urlBackend}/api/login`, {
        email,
        password,
      })
      .pipe(
        tap(({ token }) => {
          if (token) {
            localStorage.setItem('token', token);

            const isAdmin = decodificarToken()?.rol === 'admin';

            if (!isAdmin && productos.length > 0) {
              productos.forEach((producto: any) => {
                this.carritoService
                  .agregarCarrito(producto.producto, producto.cantidad, true)
                  .subscribe();
              });

              localStorage.removeItem('carrito');
              localStorage.removeItem('cantidadProductos');
            }
          }
        }),
      );
  }

  register(
    nombre: string,
    apellido: string,
    genero: string,
    email: string,
    password: string,
  ): Observable<respuestaLogin> {
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
    return this.http.post<any>(
      `${this.urlBackend}/api/cambiar-contrasenia?codigoRecuperacion=${codigoRecuperacion}`,
      {
        email,
        nuevaPassword,
      },
    );
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

  confirmarEmail(tokenConfirmar: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlBackend}/api/confirmarCliente/${tokenConfirmar}`,
    );
  }
}
