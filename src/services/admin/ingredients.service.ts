import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ingrediente } from '../../app/interfaces/ingrediente.interface';
import { environment } from '../../environments/environment';

interface Filtro {
  clave: keyof ingrediente;
  valor: string;
}

@Injectable({
  providedIn: 'root',
})
export class IngredientesService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public ingredientes = signal<ingrediente[]>([]);
  public carga = signal<boolean>(true);

  public busqueda = signal<string>('');
  public filtro = signal<Filtro>({
    clave: 'nombre',
    valor: '',
  });

  public datosFiltrados = computed(() => {
    const ingredientes = this.ingredientes();
    const { clave, valor } = this.filtro();

    if (valor) {
      return ingredientes.filter((ingrediente) => {
        if (typeof ingrediente[clave] === 'string') {
          return ingrediente[clave].toLowerCase() === valor;
        } else if (
          clave === 'id_categoria' &&
          Array.isArray(ingrediente[clave])
        ) {
          return ingrediente[clave].includes(valor);
        }
        return false;
      });
    }
    return ingredientes;
  });

  public datosBuscados = computed(() => {
    const ingredientes = this.datosFiltrados();
    const busqueda = this.busqueda().toLowerCase().trim();

    if (busqueda) {
      return ingredientes.filter((ingrediente) =>
        ingrediente.nombre.toLowerCase().includes(busqueda),
      );
    }
    return ingredientes;
  });

  constructor() {
    this.obtener()
      .subscribe()
      .add(() => this.carga.set(false));
  }

  obtener(page: number = 1, limit: number = 100) {
    return this.http
      .get<any>(
        `${this.urlBackend}/api/ingredientes?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .pipe(
        tap((respuesta: any) => this.ingredientes.set(respuesta.ingredientes)),
      );
  }
  registrar(datos: any) {
    return this.http
      .post<any>(`${this.urlBackend}/api/ingredientes`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) =>
          this.ingredientes.update((ingredientes) => [
            ...ingredientes,
            respuesta.ingrediente,
          ]),
        ),
      );
  }
  eliminar(id: string) {
    return this.http
      .delete<any>(`${this.urlBackend}/api/ingredientes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() =>
          this.ingredientes.update((ingredientes) =>
            ingredientes.filter((ingrediente) => ingrediente._id !== id),
          ),
        ),
      );
  }
  editar(id: string, datos: any) {
    return this.http
      .put<any>(`${this.urlBackend}/api/ingredientes/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((respuesta: any) =>
          this.ingredientes.update((ingredientes) =>
            ingredientes.map((ingrediente) =>
              ingrediente._id === id ? respuesta.ingrediente : ingrediente,
            ),
          ),
        ),
      );
  }

  extraerColorDominante(imageUrl: string) {
    return this.http.post<any>(
      'https://square-wylma-jhonmata0427s-projects-cccf87c0.koyeb.app/color-dominante',
      { imageUrl },
    );
  }
}
