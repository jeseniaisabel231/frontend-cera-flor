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
        <ul class="flex flex-row gap-8">
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
        <div class="flex flex-row gap-4">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full border border-white text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 34 34"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.046 4.94A16.86 16.86 0 0 0 17.071 0C7.741 0 .146 7.557.141 16.848a16.74 16.74 0 0 0 2.261 8.424L0 34l8.974-2.343a17 17 0 0 0 8.09 2.05h.007c9.33 0 16.924-7.559 16.929-16.849a16.7 16.7 0 0 0-4.954-11.917M17.071 30.864h-.006c-2.518 0-4.991-.674-7.161-1.952l-.514-.304-5.325 1.39 1.421-5.167-.334-.531A13.9 13.9 0 0 1 3 16.849C3 9.127 9.315 2.845 17.077 2.845A14.04 14.04 0 0 1 31.142 16.86c-.003 7.721-6.315 14.004-14.07 14.004m7.718-10.488c-.423-.211-2.505-1.23-2.89-1.37s-.67-.21-.952.211c-.281.422-1.093 1.366-1.34 1.65-.246.285-.493.317-.915.105-.423-.21-1.787-.654-3.403-2.089-1.257-1.116-2.106-2.494-2.352-2.916-.247-.42-.027-.65.185-.859.19-.189.423-.491.634-.737s.283-.422.423-.703.07-.527-.035-.737-.952-2.283-1.304-3.126c-.344-.821-.692-.71-.951-.723a17 17 0 0 0-.812-.015 1.56 1.56 0 0 0-1.127.527c-.388.422-1.481 1.442-1.481 3.512s1.518 4.074 1.727 4.355c.21.28 2.983 4.533 7.226 6.357q1.183.506 2.412.886c1.013.32 1.935.276 2.664.167.813-.12 2.504-1.018 2.855-2.002.352-.983.353-1.826.247-2.001s-.388-.282-.811-.492"
                fill="#FFFFEC"
              />
            </svg>
          </div>
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full border border-white text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-instagram-icon lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </div>
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full border border-white text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="30"
              viewBox="0 0 27 34"
              fill="none"
            >
              <path
                d="M23.638 7.271a7 7 0 0 1-.614-.39 9 9 0 0 1-1.575-1.46 8.45 8.45 0 0 1-1.775-3.997h.007C19.546.56 19.6 0 19.61 0h-5.35v22.58c0 .302 0 .602-.012.898 0 .037-.003.07-.005.11q0 .026-.003.05v.013a5.3 5.3 0 0 1-.693 2.28 4.74 4.74 0 0 1-1.593 1.656 4.2 4.2 0 0 1-2.213.637c-2.493 0-4.513-2.218-4.513-4.958s2.02-4.958 4.513-4.958c.471 0 .94.08 1.389.24l.006-5.945a9.14 9.14 0 0 0-4.063.347 9.7 9.7 0 0 0-3.594 2.098 11.3 11.3 0 0 0-2.291 3.083C.962 18.556.11 20.264.007 23.035c-.065 1.573.368 3.203.574 3.877v.014c.13.397.633 1.75 1.452 2.891.661.916 1.442 1.72 2.318 2.386v-.014l.013.014c2.59 1.921 5.462 1.795 5.462 1.795.497-.022 2.162 0 4.053-.978 2.098-1.084 3.292-2.7 3.292-2.7a11.5 11.5 0 0 0 1.793-3.253c.485-1.39.646-3.055.646-3.72v-11.98c.065.043.93.667.93.667s1.245.871 3.188 1.438c1.394.404 3.272.49 3.272.49V8.164c-.658.077-1.994-.15-3.362-.894"
                fill="#FFFFEC"
              />
            </svg>
          </div>
        </div>
        <a href="" class="text-[15px] text-[#b6b6b6] lg:hidden">
          © Flor & Cera Todos los derechos reservados.
        </a>
      </div>
    </footer>
  `,
})
export class Footeer {}
