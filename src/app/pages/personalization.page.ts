import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/categorias.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [Headers, ModalAvisosComponent],
  template: `
    <headers></headers>
    <main class="flex flex-col text-center ">
      <div class="relative flex h-[82vh] justify-center bg-gradient-to-r ">
        <img
          src="fondoJuego.png"
          class="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <img
          src="bannerJuego.png"
          class="absolute inset-0 z-10 m-auto sm:w-2/5 object-contain w-50"
        />
        <a class="relative block h-full w-full overflow-hidden">
          <img
            src="banner2-burbuja.png"
            class="animate-float3 absolute top-[10%] left-[20%] w-8 lg:w-12"
          />

          <img
            src="banner2-burbuja.png"
            class="animate-float1 absolute top-[65%] left-[1%] w-4 lg:w-6"
          />

          <img
            src="banner2-flor1.png"
            class="animate-float2 absolute top-[10%] left-[3%] w-6 lg:w-10"
          />

          <img
            src="banner2-flor3.png"
            class="animate-float2 absolute top-[75%] left-[5%] w-6 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            class="animate-float1 absolute top-[85%] left-[30%] w-6 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            class="animate-float2 absolute top-[15%] left-[40%] w-4 lg:w-6"
          />

          <img
            src="banner2-flor2.png"
            class="animate-float1 absolute top-[9%] left-[50%] w-6 lg:w-12"
          />

          <img
            src="banner2-flor3.png"
            class="animate-float2 absolute top-[78%] left-[70%] w-4 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            class="animate-float3 absolute top-[15%] left-[75%] w-4 lg:w-5"
          />

          <img
            src="banner2-flor1.png"
            class="animate-float1 absolute top-[20%] left-[80%] w-8 lg:w-10"
          />

          <img
            src="banner2-burbuja.png"
            class="animate-float2 absolute top-[70%] left-[85%] w-5"
          />

          <img
            src="banner2-burbuja.png"
            class="animate-float3 absolute top-[13%] left-[90%] w-4 lg:w-10"
          />

          <img
            src="banner2-flor2.png"
            class="animate-float1 absolute top-[80%] left-[95%] w-4 sm:w-8"
          />
        </a>
        <button
          class="group absolute inset-y-0 left-0 my-auto flex items-center cursor-pointer"
          (click)="
            authService.clienteAutenticado()
              ? this.router.navigate([
                  '/taller-juego',
                  almacenarCategoria['Velas artesanales'],
                ])
              : mostrarModal.set(true)
          "
        >
          <div
            class="absolute z-10 hidden md:h-98 md:w-98 h-60 w-60  items-center justify-center rounded-full bg-white/30 backdrop-blur-md transition duration-300 group-hover:flex top-10 "
          ></div>
          <img
            src="velaJuego.png"
            class="relative h-50 w-50 md:z-20 md:h-80 md:w-80 mb-80 md:mt-0 md:mb-0 transform transition-transform duration-300 group-hover:scale-110 "
          />
          <strong
            class="group absolute top-10 left-40 w-40 md:top-110 md:left-20 z-30 cursor-pointer rounded-full bg-rose-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/40 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none active:scale-95"
          >
            🕯️ Crear Mi Vela
          </strong>
        </button>
        <button
          class="group absolute inset-y-0 right-0 my-auto flex h-120 w-120 items-center justify-end overflow-hidden cursor-pointer "
          (click)="
            authService.clienteAutenticado()
              ? this.router.navigate([
                  '/taller-juego',
                  almacenarCategoria['Jabones artesanales'],
                ])
              : mostrarModal.set(true)
          "
        >
          <div
            class="absolute z-10 hidden md:h-98 md:w-98 h-60 w-60 top-60 md:top-0 items-center justify-center rounded-full bg-white/30 backdrop-blur-md transition duration-300 group-hover:flex"
          >
            
          </div>
          <img
            src="jabonJuego.png"
            class="relative z-20 h-50 w-50 transform transition-transform duration-200 hover:scale-110  md:h-80 md:w-80 mt-70 md:mt-0"
          />
          <strong
            class="group absolute top-106 left-40 md:top-95 md:left-50 z-30 cursor-pointer rounded-full bg-teal-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/40 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none active:scale-95"
          >
            🧼 Crear Mi Jabón
          </strong>
        </button>
      </div>
      <app-modal
        [(mostrarModal)]="mostrarModal"
        titulo="¡Recuerda!"
        mensaje="Para crear un producto personalizado, primero debes iniciar sesión."
        tipo="exito"
        (confirmar)="this.router.navigate(['/iniciar-sesion'])"
      />
    </main>
  `,
})
export class PersonalizationPage {
  public serviceCategorias = inject(CategoryService);
  public authService = inject(AuthService);
  public almacenarCategoria = {} as any;
  public mostrarModal = signal<boolean>(false);
  public router = inject(Router);

  constructor() {
    this.serviceCategorias.obtener().subscribe((respuesta: any) => {
      respuesta.categorias.map((categoria: any) => {
        this.almacenarCategoria[categoria.nombre] = categoria._id;
      });
    });
  }
}
