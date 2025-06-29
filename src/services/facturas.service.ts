import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public carga = signal<boolean>(true);
  public facturas = signal<any[]>([]);

  constructor() {
    this.obtenerFacturas()
      .subscribe()
      .add(() => this.carga.set(false));
  }

  obtenerFacturas() {
    return this.http.get<any>(`${this.urlBackend}/api/ventas/cliente/mis-ventas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).pipe(
      tap(({ ventas }) => {
        this.facturas.set(ventas);
      })
    );
  }

  obtenerFacturaPorId(id: string) {
    return this.http.get<any>(`${this.urlBackend}/api/ventas/cliente/factura/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

}
