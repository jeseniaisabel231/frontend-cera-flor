import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { producto } from '../../app/interfaces/producto.interface';
import { environment } from '../../environments/environment';

interface Filtro {
  clave: keyof producto;
  valor: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public productos = signal<producto[]>([]);

  public carga = signal<boolean>(true);
  public busqueda = signal<string>('');
  public filtro = signal<Filtro>({
    clave: 'nombre', // En este caso no importa la clave porque no se va a filtrar cuando se seleccione "todos"
    valor: '',
  });

  public datosFiltrados = computed(() => {
    // El computed se ejecuta cuando cambia alguno de estos signals
    const { clave, valor } = this.filtro();
    const datos = this.productos();
    if (valor) {
      return datos.filter((producto) => {
        if (typeof producto[clave] === 'string') {
          return producto[clave].toLowerCase() === valor.toLowerCase();
        } else if (clave === 'id_categoria') {
          return producto.id_categoria?._id.toLowerCase() === valor.toLowerCase();
        }
        return false; // Si el tipo no es string o id_categoria, no se filtra
      });
    }
    return datos; // Si no hay valor en el filtro, retorna todos los productos
  });

  public datosBuscados = computed(() => {
    const busqueda = this.busqueda().toLowerCase().trim();
    const datos = this.datosFiltrados();
    if (busqueda) {
      return datos.filter(({ nombre }) =>
        nombre.toLowerCase().includes(busqueda),
      );
    }
    return datos; // Si no hay búsqueda, retorna los datos filtrados
  });

  public productosPorCantidad(cantidad: number = 4) {
    return this.productos().slice(0, cantidad);
  }

  constructor() {
    this.obtener()
      .subscribe()
      .add(() => this.carga.set(false)); // Llama al método obtener para cargar los productos al iniciar el servicio
  }

  obtener(page: number = 1, limit: number = 100) {
    return this.http
      .get(`${this.urlBackend}/api/productos?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(tap((respuesta: any) => this.productos.set(respuesta.productos)));
  }

  registrar(datos: FormData) {
    return this.http
      .post(`${this.urlBackend}/api/productos`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(({ producto }: any) =>
          this.productos.update((anteriores) => [...anteriores, producto]),
        ),
      );
  }

  eliminar(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() =>
          this.productos.update((anteriores) =>
            anteriores.filter((producto) => producto._id !== id),
          ),
        ),
      );
  }

  editar(id: string, datos: FormData) {
    return this.http
      .put(`${this.urlBackend}/api/productos/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) =>
          this.productos.update((anteriores) =>
            anteriores.map((producto) =>
              producto._id === id
                ? { ...producto, ...respuesta.producto }
                : producto,
            ),
          ),
        ),
      );
  }
}
