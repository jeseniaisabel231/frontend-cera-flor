import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { usuario } from '../../app/interfaces/usuario.interface';
import { environment } from '../../environments/environment';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  private usuarios = signal<usuario[]>([]); // Variable para guardar los usuarios luego de interceptar

  obtener() {
    return this.http
      .get(`${this.urlBackend}/api/admin/clientes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        // Sirve para interceptar los datos que llegan de la  y es exitosa
        tap((respuesta: any) => this.usuarios.set(respuesta.clientes)) // Se guarda la respuesta en la variable usuarios
      );
  }

  activarEstado(id: string) {
    return this.http
      .patch(
        `${this.urlBackend}/api/admin/clientes/activar/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .pipe(
        tap(() =>
          this.usuarios.update((usuarios) => {
            const index = usuarios.findIndex((usuario) => usuario._id === id);

            if (index !== -1) { // Encontro al usuario porque el indice en el array es diferente de -1
              usuarios[index].estado = 'activo'; // Cambia el estado a activo del usuario idenficado con el indice
            }
            return usuarios; // Retorno todos los usuarios incluyendo el que se acaba de modificar
          })
        ) // Actualiza la lista de usuarios eliminando el usuario con el id proporcionado
      );
  }
  eliminarEstado(id: string) {
    return this.http
      .delete(`${this.urlBackend}/api/admin/clientes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() =>
          this.usuarios.update((usuarios) => {
            const index = usuarios.findIndex((usuario) => usuario._id === id);

            if (index !== -1) {
              usuarios[index].estado = 'inactivo'; // Cambia el estado a inactivo
            }
            return usuarios;
          })
        ) // Actualiza la lista de usuarios eliminando el usuario con el id proporcionado
      );
  }
}
