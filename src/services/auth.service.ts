import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { usuario } from '../app/interfaces/usuario.interface';
import { decodificarToken } from '../app/utils/decodificarToken';
import { environment } from '../environments/environment';
import { CarritoService } from './carrito.service';

interface respuestaLogin {
  token: string;
  nombre: string;
  apellido: string;
  genero: string;
  email: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  private carritoService = inject(CarritoService);
  
  public datosUsuario = signal<usuario>({
    _id: '',
    nombre: '',
    apellido: '',
    imagen: '',
    email: '',
    genero: '',
    estado: '',
    cedula: '',
  });
  public cargaPerfil = signal<boolean>(true);
  public clienteAutenticado = signal<boolean>(false);

  constructor() {
    this.obtenerPerfil()
      .subscribe()
      .add(() => this.cargaPerfil.set(false));
  }

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
              productos.forEach(({ producto, cantidad }: any) =>
                this.carritoService
                  .agregarCarrito(producto, cantidad, true)
                  .subscribe(),
              );

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
    fecha_nacimiento: string,
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

  recuperarContraseniaAdmin(email: string): Observable<any> {
    return this.http.post<any>(
      `${this.urlBackend}/api/recuperarContraseniaAdmin`,
      {
        email,
      },
    );
  }

  recuperarContrasenia(email: string): Observable<any> {
    return this.http.post<any>(`${this.urlBackend}/api/recuperar-contrasenia`, {
      email,
    });
  }

  restablecerContraseniaAdmin(
    email: string,
    nuevaPassword: string,
    codigoRecuperacion: string,
  ): Observable<any> {
    return this.http.post<any>(
      `${this.urlBackend}/api/cambiarContraseniaAdmin?codigoRecuperacion=${codigoRecuperacion}`,
      {
        email,
        nuevaPassword,
      },
    );
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
        tap(({ cliente }) => {
          this.cargaPerfil.set(false);
          this.clienteAutenticado.set(true);
          this.datosUsuario.update((datos) => ({
            ...datos,
            ...cliente,
          }));
        }),
      );
  }

  actualizarPerfil(datosCliente: FormData) {
    return this.http
      .put<any>(`${this.urlBackend}/api/perfil`, datosCliente, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap(({ cliente }) => {
          this.datosUsuario.set(cliente);
        }),
      );
  }

  confirmarEmail(tokenConfirmar: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlBackend}/api/confirmarCliente/${tokenConfirmar}`,
    );
  }
}
