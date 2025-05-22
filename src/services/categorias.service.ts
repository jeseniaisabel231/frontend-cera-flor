import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { categorias } from '../app/interfaces/categoria.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  private categorias = signal<categorias[]>([]);

  obtener() {
    return this.http
      .get(`${this.urlBackend}/api/categorias`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        // // Sirve para interceptar los datos que llegan de la  y es exitosa
        // tap((respuesta: any) => this.categorias.set(respuesta.categorias)) // Se guarda la respuesta en la variable usuarios
        tap((categorias: any) => this.categorias.set(categorias))
      );
  }
}
