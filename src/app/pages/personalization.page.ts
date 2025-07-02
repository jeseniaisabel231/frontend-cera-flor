import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/categorias.service';
import { Headers } from '../components/header.component';

@Component({
  imports: [Headers, RouterLink],
  template: `
    <headers></headers>
    <main class="flex flex-col text-center">
      <div
        class=" relative flex h-[82vh] justify-center bg-gradient-to-r"
      >
      
        <img src="fondoJuego.png" alt="" class="absolute inset-0 w-full h-full object-cover z-0"/>
        <img src="bannerJuego.png" alt="" class="relative z-10 object-contain" />
        <a class="relative w-full" routerLink="/personalizacion-producto">
        <a href="" class="relative block h-full w-full overflow-hidden">
          <img
            src="banner2.png"
            alt=""
            class="h-[500px] w-full object-cover md:h-[300px] xl:h-auto"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float3 absolute top-[10%] left-[20%] w-8 lg:w-12"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float1 absolute top-[65%] left-[1%] w-4 lg:w-6"
          />

          <img
            src="banner2-flor1.png"
            alt=""
            class="animate-float2 absolute top-[10%] left-[3%] w-6 lg:w-10"
          />

          <img
            src="banner2-flor3.png"
            alt=""
            class="animate-float2 absolute top-[75%] left-[5%] w-6 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float1 absolute top-[85%] left-[30%] w-6 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float2 absolute top-[15%] left-[40%] w-4 lg:w-6"
          />

          <img
            src="banner2-flor2.png"
            alt=""
            class="animate-float1 absolute top-[9%] left-[50%] w-6 lg:w-12"
          />

          <img
            src="banner2-flor3.png"
            alt=""
            class="animate-float2 absolute top-[78%] left-[70%] w-4 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float3 absolute top-[15%] left-[75%] w-4 lg:w-5"
          />

          <img
            src="banner2-flor1.png"
            alt=""
            class="animate-float1 absolute top-[20%] left-[80%] w-8 lg:w-10"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float2 absolute top-[70%] left-[85%] w-5"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float3 absolute top-[13%] left-[90%] w-4 lg:w-10"
          />

          <img
            src="banner2-flor2.png"
            alt=""
            class="animate-float1 absolute top-[80%] left-[95%] w-4 sm:w-8"
          />

          
          <img
            src="banner2-dibujo.png"
            alt=""
            class="absolute top-[58%] left-[30%] w-44 transform transition-transform duration-300 hover:scale-120 md:top-[43%] md:left-[38%] md:w-3xs lg:left-[48%]"
          />
          <a
            class="bg-morado-600 text-amarrillo-500 hover:bg-morado-700 absolute top-[83%] left-[28%] w-50 transform rounded-2xl px-6 py-2 text-center font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:text-white md:top-[45%] md:left-[70%] lg:top-[45%] lg:left-[75%] lg:py-4 xl:w-60"
          >
            ¡Comienza a crear ahora!
          </a>
        </a>
      </a>
        <a
          class="absolute inset-y-0 left-0 my-auto flex items-center"
          [routerLink]="[
            '/taller-juego',
            almacenarCategoria['Velas artesanales'],
          ]"
        >
          <img
            src="velaJuego.png"
            alt=""
            class="h-80 w-80 transform transition-transform duration-200 hover:scale-110"
          />
          <button
            class="absolute top-110 left-20 cursor-pointer rounded-full bg-rose-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/40 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none active:scale-95"
          >
            ✨ Seleccionar Vela
          </button>
        </a>
        <a
          class="absolute inset-y-0 right-0 my-auto flex h-120 w-120 items-center justify-end overflow-hidden"
          [routerLink]="[
            '/taller-juego',
            almacenarCategoria['Jabones artesanales'],
          ]"
        >
          <img
            src="jabonJuego.png"
            alt=""
            class="h-80 w-80 transform transition-transform duration-200 hover:scale-110"
          />
          <button
            class="absolute top-95 left-50 cursor-pointer rounded-full bg-teal-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/40 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none active:scale-95"
          >
            🧼 Seleccionar Jabón
          </button>
        </a>
      </div>
    </main>
  `,
})
export class PersonalizationPage {
  public escogerOpcion = false;
  mostrarJuego() {
    this.escogerOpcion = true;
  }
  public serviceCategorias = inject(CategoryService);
  public almacenarCategoria = {} as any;

  constructor() {
    this.serviceCategorias.obtener().subscribe((respuesta: any) => {
      respuesta.categorias.map((categoria: any) => {
        this.almacenarCategoria[categoria.nombre] = categoria._id;
      });
    });
  }
}
