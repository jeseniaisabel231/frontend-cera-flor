import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { promocion } from '../../app/interfaces/promocion.interface';
import { producto } from '../../app/interfaces/producto.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);

  obtener() {
    return this.http.get<producto[]>(`${this.urlBackend}/api/productos`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
  registrar(datos: producto) {
    return this.http.post<producto>(`${this.urlBackend}/api/productos`, datos, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
  eliminar(id: string) {
    return this.http.delete<producto>(
      `${this.urlBackend}/api/productos/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  }
  editar(id: string, datos: producto) {
    return this.http.put<producto>(
      `${this.urlBackend}/api/productos/${id}`,
      datos,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  }

}
