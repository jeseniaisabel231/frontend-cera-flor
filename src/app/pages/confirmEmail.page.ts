import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';

@Component({
  template: `
    <headers></headers>
    <main>
      <div>
        @if (respuesta.statusCode() === 404) {
          <h2>
            Su cuenta ya ha sido confirmada o su enlace de confirmacion ha
            expirado
          </h2>
        } @else if (respuesta.statusCode() === 500) {
          <h2>Error al confirmar el email</h2>
        } @else {
          <h2>¡Email confirmado exitosamente!</h2>
          <p>Tu cuenta ha sido activada. Ahora puedes iniciar sesión.</p>
        }
        <a
          routerLink="/iniciar-sesion"
          class="bg-morado-500 hover:bg-morado-600 rounded-[15px] px-10 py-4 text-white transition-colors duration-300"
        >
          Iniciar sesión
        </a>
      </div>
    </main>
    <footeer></footeer>
  `,
  imports: [Headers, Footeer, RouterLink],
})
export class ConfirmEmailPage {
  public token = input.required();
  public respuesta = httpResource(
    () => `${environment.urlApi}/api/confirmarCliente/${this.token()}`,
  );

  // constructor(){
  //   console.log(this.token());
  //   // this.servicioConfirmarEmail.confirmarEmail(this.token()!).subscribe({
  //   //   next: (response) => {
  //   //     console.log('Email confirmado exitosamente', response);
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('Error al confirmar el email', error);
  //   //   }
  //   // });
  // }
}
