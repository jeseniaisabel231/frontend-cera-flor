import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Headers } from '../components/header.component';
@Component({
  imports: [Headers, RouterLink],
  template: `
    <headers></headers>
    <main class="flex flex-col text-center">
      <div class="mx-auto w-full max-w-6xl">
        <!-- Encabezado -->
        <div class="mb-16 text-center">
          <h1
            class="mt-8 mb-4 bg-gradient-to-r from-[#4ecdc4] to-[#ff6b6b] bg-clip-text text-3xl font-bold text-rose-600 md:text-4xl"
          >
            ¡Descubre tu Rutina Perfecta!
          </h1>
          <p class="mb-6 text-lg text-gray-700">
            Selecciona tu tipo de piel para personalizar tu experiencia de juego
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <div>
            <button
              routerLink="/taller-juego"
              class="w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-[#ff6b6b] to-[#c6426e] p-1 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-[#ff6b6b]/50"
            >
              <div
                class="flex h-full flex-col items-center justify-between rounded-xl bg-[#2e294e]/80 px-6 py-8 backdrop-blur-sm transition-all duration-500 group-hover:backdrop-blur-md"
              >
                <div class="text-center">
                  <h3 class="mb-2 text-2xl font-bold text-white">Piel Grasa</h3>
                  <p class="mb-6 text-gray-300">
                    Brillo intenso, poros dilatados, tendencia a acné
                  </p>
                  <div
                    class="inline-block transform rounded-full bg-[#ff6b6b] px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Seleccionar
                  </div>
                </div>
              </div>
            </button>
          </div>
          <!-- seccion de piel Seca -->
          <div>
            <button
              routerLink="/taller-juego"
              class="w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-[#4ecdc4] to-[#1a936f] p-1 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-[#4ecdc4]/50"
            >
              <div
                class="flex h-full flex-col items-center justify-between rounded-xl bg-[#2e294e]/80 px-6 py-8 backdrop-blur-sm transition-all duration-500 group-hover:backdrop-blur-md"
              >
                <div class="text-center">
                  <h3 class="mb-2 text-2xl font-bold text-white">Piel Seca</h3>
                  <p class="mb-6 text-gray-300">
                    Textura áspera, sensación de tirantez, descamación
                  </p>
                  <div
                    class="inline-block transform rounded-full bg-[#4ecdc4] px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Seleccionar
                  </div>
                </div>
              </div>
            </button>
          </div>

          <!-- seccion piel Mixta -->
          <div class="group">
            <button
              routerLink="/taller-juego"
              class="h-full w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-[#8b5fbf] to-[#6a3093] p-1 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-[#8b5fbf]/50"
            >
              <div
                class="flex h-full flex-col items-center justify-between rounded-xl bg-[#2e294e]/80 px-6 py-8 backdrop-blur-sm transition-all duration-500 group-hover:backdrop-blur-md"
              >
                <div class="text-center">
                  <h3 class="mb-2 text-2xl font-bold text-white">Piel Mixta</h3>
                  <p class="mb-6 text-gray-300">
                    Zona T grasa, mejillas secas, textura irregular
                  </p>
                  <div
                    class="inline-block transform rounded-full bg-[#8b5fbf] px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Seleccionar
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  `,
})
export class TiposJuegoPage {}
