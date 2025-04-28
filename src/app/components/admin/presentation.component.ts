import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

export type TituloForms =
  | 'Dashboard'
  | 'Usuarios'
  | 'Productos y catálogo'
  | 'Ventas'
  | 'Promociones'; //representacion de la clave
@Component({
  selector: 'presentation',
  template: `
    <div
      class="flex flex-col w-full h-full bg-white rounded-[18px] py-6 px-10 shadow-md justify-center"
    >
      <h2 class="font-extrabold text-2xl">{{ titulo() }}</h2>
      <p class="text-gris-300 text-[14px] mt-4">
        <time datetime="2025-02-04">{{ tiempoActual }}</time>
      </p>
      <p>{{ saludo }}, Estefanía</p>
    </div>
  `,
})
export class Presentation {
  public titulo = input.required<TituloForms>();

  public tiempoActual: string = '';
  public saludo: string = '';

  constructor() {
    this.actualizarHoraSaludo();
    setInterval(() => this.actualizarHoraSaludo(), 1000);
  }

  private actualizarHoraSaludo(): void {
    const actual = new Date();
    this.tiempoActual = actual.toLocaleTimeString();
    const horas = actual.getHours();
    if (horas < 12) {
      this.saludo = 'Buenos días';
    } else if (horas < 18) {
      this.saludo = 'Buenas tardes';
    } else {
      this.saludo = 'Buenas noches';
    }
  }
}
