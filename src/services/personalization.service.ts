import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { personalizacion } from '../app/interfaces/personalizacion.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalizationService {
  private urlBackend: string = environment.urlApi;
  private http = inject(HttpClient);
  public carga = signal<boolean>(true);
  public productosPersonalizados = signal<personalizacion[]>([]);

  constructor() {
    this.obtenerPersonalizaciones()
      .subscribe()
      .add(() => this.carga.set(false));
  }

  obtenerPersonalizaciones() {
    return this.http
      .get<any>(`${this.urlBackend}/api/productos-personalizados?limit=100`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(({ productos }) => {
          this.productosPersonalizados.set(productos);
        }),
      );
  }

  obtenerPersonalizacion(id: string) {
    return this.http
      .get<any>(`${this.urlBackend}/api/productos-personalizados/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(tap((respuesta: any) => {}));
  }

  subirFotoPersonalizacion(id: string, filename: File) {
    const formData = new FormData();
    formData.append('foto', filename);

    return this.http.post<any>(
      `${this.urlBackend}/api/productos-personalizados/${id}/foto`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  editarPersonalizacion(id: string, datos: any) {
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
          this.productosPersonalizados.set(
            this.productosPersonalizados().map((p) =>
              p._id === id ? respuesta.producto_personalizado : p,
            ),
          );
        }),
      );
  }
  registrarPersonalizacion(datos: any) {
    return this.http
      .post<any>(`${this.urlBackend}/api/productos-personalizados`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.productosPersonalizados.set([
            ...this.productosPersonalizados(),
            respuesta.producto_personalizado,
          ]);
        }),
      );
  }
  eliminarPersonalizacion(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/productos-personalizados/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(tap(() => {}));
  }
}
