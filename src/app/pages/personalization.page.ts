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
