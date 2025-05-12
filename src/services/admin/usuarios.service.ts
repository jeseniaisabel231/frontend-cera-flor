import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { usuario } from '../../app/interfaces/usuario.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
   private urlBackend = environment.urlApi;
  private http = inject(HttpClient);

  obtener() {
    return this.http.get<usuario[]>(`${this.urlBackend}/api/admin/clientes`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
