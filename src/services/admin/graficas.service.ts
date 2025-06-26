import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GraficaVentas } from '../../app/interfaces/graficas.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);

  obtenerVentas() {
    const fechaActual = new Date();
    const fechaFin = fechaActual.toISOString().split('T')[0];
    fechaActual.setDate(fechaActual.getDate() - 14);
    const fechaInicio = fechaActual.toISOString().split('T')[0];
    console.log('Fecha inicio:', fechaInicio);
    console.log('Fecha fin:', fechaFin);
    return this.http.get<GraficaVentas>(
      `${this.urlBackend}/api/ventas/dashboard?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
  }
  obtenerProductos() {
    return this.http.get<any>(`${this.urlBackend}/api/productos?limit=100`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
  obtenerUsuarios() {
    return this.http.get<any>(
      `${this.urlBackend}/api/admin/clientes?limit=100`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
  }
  obtenerTodasLasVentas() {
    return this.http.get<any>(`${this.urlBackend}/api/ventas?limit=100`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
