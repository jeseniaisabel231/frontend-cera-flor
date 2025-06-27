import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { promocion } from '../../app/interfaces/promocion.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromocionesService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  private promociones = signal<promocion[]>([]);

  public carga = signal<boolean>(true);
  public busqueda = signal<string>('');

  public datosBuscados = computed(() => {
    const busqueda = this.busqueda().toLowerCase().trim();
    const promociones = this.promociones();
    if (busqueda) {
      return promociones.filter((promocion) =>
        promocion.nombre.toLowerCase().includes(busqueda),
      );
    }
    return promociones;
  });

  constructor() {
    this.obtener()
      .subscribe()
      .add(() => this.carga.set(false));
  }

  obtener(page: number = 1) {
    return this.http
      .get(`${this.urlBackend}/api/promociones?page=${page}&limit=100`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => this.promociones.set(respuesta.promociones)),
      );
  }
  registrar(datos: promocion) {
    return this.http
      .post(`${this.urlBackend}/api/promociones`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) =>
          this.promociones.update((promociones) => [
            ...promociones,
            respuesta.promocion,
          ]),
        ),
      );
  }
  eliminar(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/promociones/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() =>
          this.promociones.update((promociones) =>
            promociones.filter((promocion) => promocion._id !== id),
          ),
        ),
      );
  }
  editar(id: string, datos: promocion) {
    return this.http
      .put(`${this.urlBackend}/api/promociones/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) =>
          this.promociones.update((promociones) =>
            promociones.map((promocion) =>
              promocion._id === id
                ? { ...promocion, ...respuesta.promocion }
                : promocion,
            ),
          ),
        ),
      );
  }
}
