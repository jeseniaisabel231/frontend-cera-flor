import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientesService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public ingredientes: any[] = [];

  obtener(page: number = 1, limit: number = 100) {
    return this.http
      .get<any>(
        `${this.urlBackend}/api/ingredientes?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .pipe(
        tap((respuesta: any) => {
          this.ingredientes = respuesta.ingredientes;
        }),
      );
  }
  registrar(datos: any) {
    return this.http
      .post<any>(`${this.urlBackend}/api/ingredientes`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.ingredientes.push(respuesta.ingrediente);
        }),
      );
  }
  eliminar(id: string) {
    return this.http
      .delete<any>(`${this.urlBackend}/api/ingredientes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          const index = this.ingredientes.findIndex(
            (ingrediente) => ingrediente._id === id,
          );

          if (index !== -1) {
            this.ingredientes.splice(index, 1);
          }
        }),
      );
  }
  editar(id: string, datos: any) {
    return this.http
      .put<any>(`${this.urlBackend}/api/ingredientes/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          const index = this.ingredientes.findIndex(
            (ingrediente) => ingrediente._id === id,
          );
          if (index !== -1) {
            this.ingredientes[index] = respuesta.ingrediente;
          }
        }),
      );
  }
}
