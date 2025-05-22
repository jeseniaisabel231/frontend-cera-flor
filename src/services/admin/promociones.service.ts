import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { promocion } from '../../app/interfaces/promocion.interface';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromocionesService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public promociones = signal<promocion[]>([]);

  obtener() {
    return this.http
      .get(`${this.urlBackend}/api/promociones`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.promociones.set(respuesta.promociones);
        })
      );
  }
  registrar(datos: promocion) {
    return this.http
      .post(`${this.urlBackend}/api/promociones`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.promociones.update((promocionesAnteriores) => {
            promocionesAnteriores.push(respuesta.promocion);
            return promocionesAnteriores;
          });
        })
      );
  }
  eliminar(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/promociones/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          this.promociones.update((promocionesAnteriores) => {
            const index = promocionesAnteriores.findIndex(
              (promocion) => promocion._id === id
            );
            if (index !== -1) {
              promocionesAnteriores.splice(index, 1);
            }
            return promocionesAnteriores;
          });
        })
      );
  }
  editar(id: string, datos: promocion) {
    return this.http
      .put(`${this.urlBackend}/api/promociones/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.promociones.update((promocionesAnteriores) => {
            const index = promocionesAnteriores.findIndex(
              (promocion) => promocion._id === id
            );
            if (index !== -1) {
              promocionesAnteriores[index] = respuesta.promocion;
            }
            return promocionesAnteriores;
          });
        })
      );
  }
}
