import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { type productoPersonalizado } from '../app/interfaces/personalizacion.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalizationService {
  private urlBackend: string = environment.urlApi;
  private http = inject(HttpClient);
  public carga = signal<boolean>(true);
  public productosPersonalizados = signal<productoPersonalizado[]>([]);

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
        tap(({ productos }) => this.productosPersonalizados.set(productos)),
      );
  }

  obtenerPersonalizacion(id: string) {
    return this.http.get<any>(
      `${this.urlBackend}/api/productos-personalizados/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
  }

  subirFotoPersonalizacion(id: string, imagen: File) {
    const formData = new FormData();
    formData.append('imagen', imagen);

    return this.http
      .put<any>(
        `${this.urlBackend}/api/productos-personalizados/${id}/imagen`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .pipe(tap(() => this.obtenerPersonalizaciones().subscribe()));
  }

  editarPersonalizacion(id: string, ingredientes: any, tipo_producto: string) {
    return this.http
      .put<any>(
        `${this.urlBackend}/api/productos-personalizados/${id}`,
        { ingredientes, tipo_producto },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .pipe(tap(() => this.obtenerPersonalizaciones().subscribe()));
  }
  registrarPersonalizacion(datos: any) {
    return this.http.post<any>(
      `${this.urlBackend}/api/productos-personalizados`,
      datos,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
  }

  eliminarPersonalizacion(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/productos-personalizados/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta) => {
          this.productosPersonalizados.update((productos) =>
            productos.filter((p) => p._id !== id),
          );
        }),
      );
  }

  obtenerRecomendacion(id_categoria: string) {
    return this.http.post(
      `${this.urlBackend}/api/productos/recomendacion`,
      {
        id_categoria,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
