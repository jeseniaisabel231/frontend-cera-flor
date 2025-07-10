import { Component, input } from '@angular/core';

export type TituloDashboard =
  | 'Dashboard'
  | 'Clientes'
  | 'Productos'
  | 'Ventas'
  | 'Promociones'
  | 'Ingredientes' //representacion de la clave
  | 'Categorías'
@Component({
  selector: 'presentation',
  template: `
    <div
      class="flex h-full w-full flex-col justify-center rounded-[18px] bg-white px-10 py-6 shadow-md"
    >
      <h2 class="text-2xl font-extrabold">{{ titulo() }}</h2>
      <div class="text-gris-300 mt-4 flex items-center gap-2 text-[14px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#292929"
            d="M12 22q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 13t.713-3.512t1.924-2.85t2.85-1.925T12 4t3.513.713t2.85 1.925t1.925 2.85T21 13t-.712 3.513t-1.925 2.85t-2.85 1.925T12 22m2.8-4.8l1.4-1.4l-3.2-3.2V8h-2v5.4zM5.6 2.35L7 3.75L2.75 8l-1.4-1.4zm12.8 0l4.25 4.25l-1.4 1.4L17 3.75z"
          />
        </svg>
        <span class="my-auto">{{ tiempoActual }}</span>
      </div>
      <p class="mt-1">{{ saludo }}, Estefanía</p>
    </div>
  `,
})
export class Presentation {
  public titulo = input.required<TituloDashboard>();

  public tiempoActual: string = '';
  public saludo: string = '';

  constructor() {
    this.actualizarHoraSaludo();
    setInterval(() => this.actualizarHoraSaludo(), 1000);
  }

  private actualizarHoraSaludo(): void {
    const actual = new Date();
    this.tiempoActual = actual.toLocaleTimeString('es-EC', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
