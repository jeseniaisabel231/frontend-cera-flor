import { Component } from '@angular/core';
@Component({
  selector: 'juego',
  template: `
    <div
      class="flex py-20 justify-center bg-gradient-to-b from-orange-50 via-rose-50 to-pink-100 "
    >
      <div class="mx-auto w-full max-w-4xl text-center">
        <h2 class="mb-6 text-3xl font-bold text-rose-600 md:text-4xl">
          ¿Qué producto quieres crear?
        </h2>

        <p class="mb-10 text-lg text-gray-700">
          Elige entre una vela aromática o un jabón personalizado.
        </p>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div
            class="transform cursor-pointer rounded-2xl border border-orange-200 bg-white p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src=""
              alt="Vela artesanal"
              class="mx-auto mb-4 h-24 w-24"
            />
            <h3 class="mb-2 text-xl font-semibold text-rose-500">🕯️ Vela</h3>
            <p class="mb-4 text-sm text-gray-600">
              Ideal para crear ambientes relajantes, decorar tu hogar o regalar
              algo único.
            </p>
            <button
              class="rounded-full bg-rose-500 px-4 py-2 font-medium text-white transition hover:bg-rose-600"
            >
              Seleccionar Vela
            </button>
          </div>

          <!-- Tarjeta JABÓN -->
          <div
            class="transform cursor-pointer rounded-2xl border border-teal-200 bg-white p-6 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src=""
              alt="Jabón artesanal"
              class="mx-auto mb-4 h-24 w-24"
            />
            <h3 class="mb-2 text-xl font-semibold text-teal-600">🧼 Jabón</h3>
            <p class="mb-4 text-sm text-gray-600">
              Personaliza tu jabón con ingredientes naturales para el cuidado de
              tu piel.
            </p>
            <button
              class="rounded-full bg-teal-500 px-4 py-2 font-medium text-white transition hover:bg-teal-600"
            >
              Seleccionar Jabón
            </button>
          </div>
        </div>

      </div>
</div>
  `,
})
export class JuegoComponent {}
