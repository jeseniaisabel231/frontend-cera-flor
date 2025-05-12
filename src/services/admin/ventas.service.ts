import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { venta } from '../../app/interfaces/venta.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
   private urlBackend = environment.urlApi;
  private http = inject(HttpClient);

  obtener() {
    return this.http.get<venta[]>(`${this.urlBackend}/api/ventas`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}