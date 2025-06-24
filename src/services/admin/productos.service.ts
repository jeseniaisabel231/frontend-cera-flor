import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { producto } from '../../app/interfaces/producto.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public productos: producto[] = [];

  obtener(page: number, limit: number = 100) {
    return this.http
      .get(`${this.urlBackend}/api/productos?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.productos = respuesta.productos;
        }),
      );
  }
  registrar(datos: producto) {
    return this.http
      .post(`${this.urlBackend}/api/productos`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.productos.push(respuesta.producto);
        }),
      );
  }
  eliminar(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          const index = this.productos.findIndex((producto) => producto._id === id);

          if (index !== -1) {
            this.productos.splice(index, 1);
          }
        }),
      );
  }
  editar(id: string, datos: producto) {
    return this.http
      .put(`${this.urlBackend}/api/productos/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        // Intercepta en la peticion
        tap((respuesta: any) => {
          // Almacena la respuesta del backend en la variable respuesta

          const index = this.productos.findIndex(
            (producto) => producto._id === id,
          );
          if (index !== -1) {
            this.productos[index] = respuesta.producto;
          }
        }),
      );
  }
}
