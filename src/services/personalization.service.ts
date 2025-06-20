import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { personalizacion } from '../app/interfaces/personalizacion.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalizationService {
  private urlBackend: string = environment.urlApi;
  private http = inject(HttpClient);
  private personalizacion: personalizacion = {} as personalizacion;

  obtenerPersonalizacion(id: string) {
    return this.http
      .get<any>(`${this.urlBackend}/api/productos-personalizados/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(tap((respuesta: any) => {
        this.personalizacion = respuesta.producto;
      }));
  }
  editarPersonalizacion(id: string, datos: personalizacion) {
    return this.http
      .put<any>(
        `${this.urlBackend}/api/productos-personalizados/${id}`,
        datos,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .pipe(
        tap((respuesta: any) => {
          this.personalizacion = respuesta.producto_personalizado;

        }),
      );
  }
  registrarPersonalizacion(datos: personalizacion) {
    return this.http
      .post<any>(`${this.urlBackend}/api/productos-personalizados`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.personalizacion = respuesta.producto_personalizado;
        }),
      );
  }
  eliminarPersonalizacion(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/productos-personalizados/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          this.personalizacion = {} as personalizacion; // Resetea la personalización después de eliminar
        }),
      );
  }
}
