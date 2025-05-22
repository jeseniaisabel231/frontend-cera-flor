import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { venta } from '../../app/interfaces/venta.interface';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public ventas = signal<venta[]>([]); // Variable para guardar los productos luego de interceptar

  obtener() {
    return this.http
      .get(`${this.urlBackend}/api/ventas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => {
          this.ventas.set(respuesta.ventas);
        })
      );
  }
  editar(id: string, estado: string) {
    return this.http
      .put(`${this.urlBackend}/api/ventas/${id}`, {estado}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          this.ventas.update((ventasAnteriores) => {
            const index = ventasAnteriores.findIndex(
              (venta) => venta._id === id
            );
            console.log('index', index);
            console.log('estado', estado);
            if (index !== -1) {
              ventasAnteriores[index].estado = estado;
            }
            return ventasAnteriores;
          });
        })
      );
  }

}
