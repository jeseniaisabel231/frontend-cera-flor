import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footeer',
  imports: [RouterLink],
  template: `
    <footer
      class="flex flex-col items-center justify-evenly bg-[#3C3C3B] py-7 lg:flex-row"
    >
      <div class="flex flex-col items-center gap-4 pb-5 lg:flex-row">
        <img src="logo.png" alt="flor y cera" class="h-24" />
        <h1 class="font-playfair text-[25px] font-bold text-[#FFFFEC]">
          Flor & Cera
        </h1>
      </div>
      <nav
        class="flex w-full flex-col items-center justify-center gap-y-5 border-y border-white py-4 text-[#FFFFEC] lg:h-30 lg:w-auto lg:border-x lg:border-y-0 lg:px-20"
      >
        <ul class="flex flex-col gap-4 text-center md:flex-row md:gap-8">
          <li><a routerLink="/inicio">Inicio</a></li>
          <li>
            <a
              routerLink="/catalogo"
              [queryParams]="{ categoria: 'jabones-artesanales' }"
            >
              Catálogo
            </a>
          </li>
          <li><a routerLink="/personalizacion-producto">Personalización</a></li>
          <li><a routerLink="/sobre-nosotros">Sobre nosotros</a></li>
        </ul>
        <a href="" class="hidden text-[15px] text-[#b6b6b6] lg:block">
          © Flor & Cera Todos los derechos reservados.
        </a>
      </nav>
      <div class="flex flex-col items-center justify-center gap-5 py-5">
        <p class="flex font-semibold text-[20px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M4.088 3.25a.75.75 0 0 0-.75.643a9 9 0 0 0-.088 1.24c0 4.548 3.524 8.27 8 8.647V20a.75.75 0 0 0 1.5 0v-6.22c4.476-.377 8-4.1 8-8.648q0-.63-.089-1.24a.75.75 0 0 0-.75-.642A8.76 8.76 0 0 0 12 8.407A8.76 8.76 0 0 0 4.088 3.25"
            />
          </svg>
           Hecho con amor, aroma y propósito 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M4.088 3.25a.75.75 0 0 0-.75.643a9 9 0 0 0-.088 1.24c0 4.548 3.524 8.27 8 8.647V20a.75.75 0 0 0 1.5 0v-6.22c4.476-.377 8-4.1 8-8.648q0-.63-.089-1.24a.75.75 0 0 0-.75-.642A8.76 8.76 0 0 0 12 8.407A8.76 8.76 0 0 0 4.088 3.25"
            />
          </svg>
        </p>
        <a href="" class="text-[15px] text-[#b6b6b6] lg:hidden">
          © Flor & Cera Todos los derechos reservados.
        </a>
      </div>
    </footer>
  `,
})
export class Footeer {}
