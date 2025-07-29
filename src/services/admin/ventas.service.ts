import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { venta } from '../../app/interfaces/venta.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  private ventas = signal<venta[]>([]);

  public carga = signal<boolean>(true);
  public busqueda = signal<string>('');
  public filtro = signal<string>('');

  public datosFiltrados = computed(() => {
    const filtro = this.filtro();
    const ventas = this.ventas();

    if (filtro) {
      return ventas.filter((venta) => venta.estado === filtro);
    }
    return ventas;
  });

  public datosBuscados = computed(() => {
    const busqueda = this.busqueda().toLowerCase().trim();
    const datosFiltrados = this.datosFiltrados();
    if (busqueda) {
      return datosFiltrados.filter(
        ({ cliente }) =>
          cliente.nombre.toLowerCase().includes(busqueda) ||
          cliente.apellido.toLowerCase().includes(busqueda),
      );
    }
    return datosFiltrados;
  });

  constructor() {
    this.obtener()
      .subscribe()
      .add(() => this.carga.set(false));
  }

  obtener(limit = 50, page = 1) {
    return this.http
      .get(`${this.urlBackend}/api/ventas?limit=${limit}&page=${page}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) => this.ventas.set(respuesta.ventas)),
      );
  }

  editar(id: string, estado: string) {
    return this.http
      .put(
        `${this.urlBackend}/api/ventas/${id}`,
        { estado },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .pipe(
        tap(() => this.ventas.update((ventas) =>
          ventas.map((venta) =>
            venta._id === id ? { ...venta, estado } : venta,
          ),
        )),
      );
  }
}
