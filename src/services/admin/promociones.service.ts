import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { promocion } from '../../app/interfaces/promocion.interface';

@Injectable({
  providedIn: 'root',
})
export class PromocionesService {
  private urlBackend = 'https://tesis-ecommerce.onrender.com';
  private http = inject(HttpClient);

  obtener() {
    return this.http.get<promocion[]>(`${this.urlBackend}/api/promociones`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
