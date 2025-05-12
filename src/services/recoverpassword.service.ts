import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecoverPasswordService {
   private urlBackend = environment.urlApi;
  //private urlBackend = 'https://tesis-ecommerce.onrender.com';
  private http = inject(HttpClient);

  //recuperar contraseña
  recoverPassword(email: string) {
    return this.http.post(`${this.urlBackend}/api/recuperar-contrasenia`, {
      email,
    });
  }
}
