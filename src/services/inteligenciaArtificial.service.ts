import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InteligenciaArtificialService {
  private http = inject(HttpClient);
  private urlBackend = environment.urlApi;

  obtenerRecomendacion(tipo: string, id_categoria: string) {
    return this.http.post(`${this.urlBackend}/api/productos/recomendacion`,
      {
        tipo,
        id_categoria
      }
      , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

}
