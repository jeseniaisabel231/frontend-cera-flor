import { Component } from '@angular/core';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';
import { JuegoComponent } from '../components/juego.component';

@Component({
  imports: [Headers, BarranavComponent, JuegoComponent],
  template: `
    <headers></headers>
    <main class="flex flex-col text-center">
      <barranav rutaSeccionSeleccionada="personalización"></barranav>
      @if (!escogerOpcion) {
        <div class="pt-20">
          <h1 class="mb-4 text-3xl font-bold text-rose-600 md:text-4xl">
            ¡Bienvenido a tu Laboratorio Artesanal!
          </h1>

          <p class="mb-6 text-lg text-gray-700">
            Crea tu vela o jabón perfecto jugando paso a paso.
            <br />
            🎮 ¡Combina aromas, elige colores, formas e ingredientes!
          </p>

          <div class="mb-6 flex justify-center">
            <img
              src="banner2-dibujo.png"
              alt="Ilustración jabón y vela"
              class="animate-bounce md:h-40 md:w-48"
            />
          </div>

          <button
            (click)="mostrarJuego()"
            class="mx-auto rounded-full bg-rose-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-rose-600 hover:shadow-lg"
          >
            ¡Empezar a crear!
          </button>
        </div>
      } @else {
        <juego></juego>
      }
    </main>
  `,
})
export class PersonalizationPage {
  public escogerOpcion = false;
  mostrarJuego() {
    this.escogerOpcion = true;
  }
}
