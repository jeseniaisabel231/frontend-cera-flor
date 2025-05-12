import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { promocion } from '../../app/interfaces/promocion.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromocionesService {
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
   private urlBackend = environment.urlApi;
  private http = inject(HttpClient);

  obtener() {
    return this.http.get<promocion[]>(`${this.urlBackend}/api/promociones`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
  registrar(datos: promocion) {
    return this.http.post<promocion>(
      `${this.urlBackend}/api/promociones`,
      datos,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  }
  eliminar(id: string) {
    return this.http.delete<promocion>(
      `${this.urlBackend}/api/promociones/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  }
  editar(id: string, datos: promocion) {
    return this.http.put<promocion>(
      `${this.urlBackend}/api/promociones/${id}`,
      datos,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  }
  
}
