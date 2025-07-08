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
        <h2 class="text-[18px] font-semibold text-white">Contáctanos:</h2>
        <a href="" class="text-[15px] text-[#b6b6b6] lg:hidden">
          © Flor & Cera Todos los derechos reservados.
        </a>
      </div>
    </footer>
  `,
})
export class Footeer {}
