import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { usuario } from '../../app/interfaces/usuario.interface';
import { environment } from '../../environments/environment';

interface Filtro {
  clave: keyof usuario;
  valor: 'femenino' | 'masculino' | 'activo' | 'inactivo' | '';
}

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private urlBackend = environment.urlApi + '/api/admin/clientes';
  private http = inject(HttpClient);
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
  private usuarios = signal<usuario[]>([]);

  public carga = signal<boolean>(true);
  public busqueda = signal<string>('');
  public filtro = signal<Filtro>({
    clave: 'nombre', // En este caso no importa la clave porque no se va a filtrar cuando se seleccione "todos"
    valor: '',
  });

  public datosFiltrados = computed(() => {
    // El computed se ejecuta cuando cambia alguno de estos signals
    const { clave, valor } = this.filtro();
    const datos = this.usuarios();

    if (valor) {
      return datos.filter((usuario) => usuario[clave]?.toLowerCase() === valor);
    }

    return datos; // Si no hay valor en el filtro, retorna todos los usuarios
  });
  public datosBuscados = computed(() => {
    const busqueda = this.busqueda().toLowerCase().trim();
    const datos = this.datosFiltrados();

    if (busqueda) {
      return datos.filter(
        ({ nombre, apellido, email }) =>
          nombre.toLowerCase().includes(busqueda) ||
          apellido.toLowerCase().includes(busqueda) ||
          email.toLowerCase().includes(busqueda),
      );
    }

    return datos; // Si no hay búsqueda, retorna los datos filtrados
  });

  constructor() {
    this.obtener()
      .subscribe()
      .add(() => this.carga.set(false)); // Llama al método obtener para cargar los usuarios al iniciar el servicio
  }

  obtener() {
    return this.http
      .get(this.urlBackend, { headers: this.headers })
      .pipe(tap((respuesta: any) => this.usuarios.set(respuesta.clientes)));
  }

  activarEstado(id: string) {
    return this.http
      .patch(`${this.urlBackend}/activar/${id}`, {}, { headers: this.headers })
      .pipe(
        tap(() =>
          this.usuarios.update((usuarios) => usuarios.map((usuario) =>
            usuario._id === id ? { ...usuario, estado: 'activo' } : usuario,
          )),
        ),
      );
  }

  eliminarEstado(id: string) {
    return this.http
      .delete(`${this.urlBackend}/${id}`, { headers: this.headers })
      .pipe(
        tap(() =>
          this.usuarios.update((usuarios) => usuarios.map((usuario) =>
            usuario._id === id ? { ...usuario, estado: 'inactivo' } : usuario,
          )),
        ),
      );
  }
}
