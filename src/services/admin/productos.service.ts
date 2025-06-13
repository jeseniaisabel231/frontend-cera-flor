import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { promocion } from '../../app/interfaces/promocion.interface';
import { producto } from '../../app/interfaces/producto.interface';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public productos = signal<producto[]>([]); 

  obtener(page: number, limit: number = 4) {
    return this.http
      .get(`${this.urlBackend}/api/productos?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.productos.set(respuesta.productos);
        })
      );
  }
  registrar(datos: producto) {
    return this.http
      .post(`${this.urlBackend}/api/productos`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.productos.update((productosAnteriores) => {
            productosAnteriores.push(respuesta.producto);
            return productosAnteriores;
          });
        })
      );
  }
  eliminar(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          this.productos.update((productosAnteriores) => {
            const index = productosAnteriores.findIndex(
              (producto) => producto._id === id
            );
            if (index !== -1) {
              productosAnteriores.splice(index, 1);
            }
            return productosAnteriores;
          });
        })
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
          this.productos.update(
            (
              productosAnteriores // La variable de productos se tiene que actualizar
            ) => {
              const index = productosAnteriores.findIndex(
                (producto) => producto._id === id
              );
              if (index !== -1) {
                productosAnteriores[index] = respuesta.producto;
              }
              return productosAnteriores;
            }
          );
        })
      );
  }
}
