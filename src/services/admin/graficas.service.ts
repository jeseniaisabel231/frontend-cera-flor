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
    const fechaFin = new Intl.DateTimeFormat('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(fechaActual).split('/').reverse().join('-');

    fechaActual.setDate(fechaActual.getDate() - 13);

    const fechaInicio = new Intl.DateTimeFormat('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(fechaActual).split('/').reverse().join('-');

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
