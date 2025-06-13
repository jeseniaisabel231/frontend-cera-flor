import { Component } from '@angular/core';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Headers, RouterLink],
  template: `
    <headers></headers>
    <main class="flex flex-col text-center">
      <div class="flex justify-center bg-gradient-to-b py-20">
      <div class="mx-auto w-full max-w-4xl text-center">
        <h2 class="mb-6 text-3xl font-bold text-rose-600 md:text-4xl">
          ¿Qué producto quieres crear?
        </h2>

        <p class="mb-10 text-lg text-gray-700">
          Elige entre una vela aromática o un jabón personalizado.
        </p>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <img
              src="velaJP.png"
              alt="Jabón artesanal"
              class="mx-auto h-50 w-50 transform cursor-pointer object-contain drop-shadow-lg transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl"
            />
            <h3 class="mb-2 text-xl font-semibold text-rose-500">🕯️ Vela</h3>
            <p class="mb-4 text-sm text-gray-600">
              Ideal para crear ambientes relajantes y decorar tu hogar.
            </p>
            <button
              class="rounded-full bg-rose-500 px-4 py-2 font-medium text-white transition hover:bg-rose-600"
            >
              Seleccionar Vela
            </button>
          </div>

          <!-- Tarjeta JABÓN -->
          <div>
            <img
              src="jabonJP.png"
              alt="Jabón artesanal"
              class="mx-auto h-50 w-50 transform cursor-pointer object-contain drop-shadow-lg transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl"
            />
            <h3 class="mb-2 text-xl font-semibold text-teal-600">🧼 Jabón</h3>
            <p class="mb-4 text-sm text-gray-600">
              Personaliza tu jabón con ingredientes naturales para el cuidado de
              tu piel.
            </p>
            <button
              routerLink="/tipos-jabon-juego"
              class="rounded-full bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
            >
              Seleccionar Jabón
            </button>
          </div>
        </div>
      </div>
    </div>
      
    </main>
  `,
})
export class PersonalizationPage {
  public escogerOpcion = false;
  mostrarJuego() {
    this.escogerOpcion = true;
  }
}
