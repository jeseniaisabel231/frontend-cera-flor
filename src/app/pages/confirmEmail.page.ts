import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';

@Component({
  template: `
    <headers></headers>
    <main class="flex h-[80vh] flex-col items-center justify-center">
      <div class="flex flex-col items-center gap-2">
        @if (respuesta.isLoading()) {
          <svg
            class="m-auto animate-spin fill-morado-500"
            xmlns="http://www.w3.org/2000/svg"
            height="70"
            width="70"
            viewBox="0 -960 960 960"
          >
            <path
              d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
            />
          </svg>
        } @else {
          @if (respuesta.statusCode() === 404) {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fb2c36"
                d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"
              />
            </svg>
            <h2 class="text-2xl font-extrabold text-red-500">
              Su cuenta ya ha sido confirmada o su enlace de confirmacion ha
              expirado
            </h2>
            <p>
              Si ya ha confirmado su cuenta, puede iniciar sesión. Si no, por
              favor intente registrarse nuevamente.
            </p>
            <a
              routerLink="/registro"
              class="bg-morado-500 hover:bg-morado-600 rounded-[15px] px-10 py-4 text-white transition-colors duration-300"
            >
              Continuar al registro
            </a>
          } @else if (respuesta.statusCode() === 500) {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fb2c36"
                d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"
              />
            </svg>
            <h2 class="text-2xl font-extrabold text-red-500">
              Ocurrió un error al confirmar su cuenta
            </h2>
            <p>
              El enlace de confirmación es inválido o ha expirado. Por favor,
              intente registrarse nuevamente.
            </p>
            <a
              routerLink="/registro"
              class="bg-morado-500 hover:bg-morado-600 rounded-[15px] px-10 py-4 text-white transition-colors duration-300"
            >
              Continuar al registro
            </a>
          } @else {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 48 48"
            >
              <defs>
                <mask id="IconifyId197b235c8644ca40f1">
                  <g
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                  >
                    <path
                      fill="#fff"
                      stroke="#fff"
                      d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"
                    />
                    <path stroke="#000" d="m17 24l5 5l10-10" />
                  </g>
                </mask>
              </defs>
              <path
                fill="oklch(72.3% 0.219 149.579)"
                d="M0 0h48v48H0z"
                mask="url(#IconifyId197b235c8644ca40f1)"
              />
            </svg>
            <h2 class="text-morado-600 text-2xl font-extrabold">
              ¡Email confirmado exitosamente!
            </h2>
            <p>Tu cuenta ha sido activada. Ahora puedes iniciar sesión.</p>
            <a
              routerLink="/iniciar-sesion"
              class="bg-morado-500 hover:bg-morado-600 rounded-[15px] px-10 py-4 text-white transition-colors duration-300"
            >
              Continuar al inicio de sesión
            </a>
          }
        }
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
