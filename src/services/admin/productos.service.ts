import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { promocion } from '../../app/interfaces/promocion.interface';
import { producto } from '../../app/interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBackend = 'https://tesis-ecommerce.onrender.com';
  private http = inject(HttpClient);

  obtener() {
    return this.http.get<producto[]>(`${this.urlBackend}/api/productos`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
