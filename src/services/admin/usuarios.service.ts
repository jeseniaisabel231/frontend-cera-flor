import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { usuario } from '../../app/interfaces/usuario.interface';



@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private urlBackend =
    'https://tesis-ecommerce.onrender.com';
  private http = inject(HttpClient);

  

  //////////////////////////////////////////////////////////////
  //metodo get para obtener usuarios
  obtener() {
    
    return this.http
      .get<usuario[]>(`${this.urlBackend}/api/admin/clientes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }

  //////////////////////////////////////////////////////////////
  //metodo para eliminar un usuario
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      
  }

  //////////////////////////////////////////////////////////////////
  //metodo para actualizar estudiante
  actualizar(id: number, datos: usuario) {
    return this.http
      .put<usuario>(`${this.urlBackend}/usuarios/${id}`, datos, {//datos: es el cuerpo de solictud PUT
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

  }

  //////////////////////////////////////////////////////////////////
  //metodo para crear usuarios
  crear(usuario: usuario) {
    return this.http
      .post<usuario>(`${this.urlBackend}/usuarios`, usuario, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
  }
}
