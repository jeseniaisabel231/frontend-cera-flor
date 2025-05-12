import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientesService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
    obtener() {
        return this.http.get<any[]>(`${this.urlBackend}/api/ingredientes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    }
    registrar(datos: any) {
        return this.http.post<any>(`${this.urlBackend}/api/ingredientes`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    }
    eliminar(id: string) {
        return this.http.delete<any>(
        `${this.urlBackend}/api/ingredientes/${id}`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
        );
    }
    editar(id: string, datos: any) {
        return this.http.put<any>(
        `${this.urlBackend}/api/ingredientes/${id}`,
        datos,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
        );
    }

}
