import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { categorias } from '../app/interfaces/categoria.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private urlBackend = environment.urlApi;
  private http = inject(HttpClient);
  public categorias = signal<categorias[]>([]);

  constructor() {
    this.obtener().subscribe();
  }

  obtener() {
    return this.http
      .get(`${this.urlBackend}/api/categorias`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(({ categorias }: any) => {
          this.categorias.set(categorias);
        }),
      );
  }
}
