import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'headers',
  template: `
    <header
      class="flex flex-col h-[20dvh] sticky top-0 z-50 bg-morado-700 shadow-md"
    >
      <div
        class=" flex items-center  bg-amarrillo-500 px-10 lg:px-28 py-2 justify-between "
      >
        <a class="flex items-center gap-x-3 cursor-pointer">
          <img src="logo.png" alt="Flor & Cera" />
          <h1 class="font-playfair font-bold text-[25px] hidden lg:block ">
            Flor & Cera
          </h1>
        </a>

        <div class="flex gap-x-7 w-4/5 justify-end cursor-pointer">
          <div class="relative w-full justify-end flex">
            <input
              class="h-10 w-full sm:w-3/5 bg-white border border-gris-500 rounded-[15px] p-2 pl-4 pr-10 outline-[#3C3C3B] "
              placeholder="Buscar productos...."
              id="search"
              name="search"
            />
            <svg
              class="absolute right-2 inset-y-0 my-auto "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m19.6 21-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.887T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5a6.1 6.1 0 0 1-1.3 3.8l6.3 6.3zM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5t-1.312-3.187T9.5 5 6.313 6.313 5 9.5t1.313 3.188T9.5 14"
                fill="#3C3C3B"
              />
            </svg>
          </div>

          <div class="flex flex-row  items-center ">
            <div class="flex flex-row  items-center pr-3 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#3C3C3B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19 20.75a1 1 0 0 0 1-1v-1.246c.004-2.806-3.974-5.004-8-5.004s-8 2.198-8 5.004v1.246a1 1 0 0 0 1 1zM15.604 6.854a3.604 3.604 0 1 1-7.208 0a3.604 3.604 0 0 1 7.208 0"
                />
              </svg>
              <a class="hidden sm:block whitespace-nowrap" href="#">
                Mi cuenta
              </a>
            </div>
            <div class="h-10 border-[1px] border-[#a0a0a0]"></div>

            <div class="flex flex-row  items-center pl-3 gap-1 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="#3C3C3B"
                  d="M864 158.704H672.815V97.328c0-52.944-43.056-96-96-96H449.183c-52.944 0-96 43.056-96 96v61.376H159.999c-35.344 0-64 28.656-64 64v735.968c0 35.344 28.656 64 64 64h704c35.344 0 64-28.656 64-64V222.704c0-35.344-28.656-64-64-64zM417.184 97.328c0-17.664 14.336-32 32-32h127.632c17.664 0 32 14.336 32 32v61.376H417.184zM864 958.672H160V222.704h193.184v65.84s-.848 31.967 31.809 31.967c36 0 32.192-31.967 32.192-31.967v-65.84h191.632v65.84s-2.128 32.128 31.872 32.128c32 0 32.128-32.128 32.128-32.128v-65.84h191.184z"
                />
              </svg>
              <a class="hidden sm:block" href="#">Compras</a>
              <span
                id="cart-counter"
                class="absolute -top-4 -right-6 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                20
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav
        class="flex w-full bg-morado-500 text-white h-18 items-center justify-center"
      >
        <ul class="flex flex-row gap-14 font-semibold">
          <li><a routerLink="/inicio">Inicio</a></li>
          <li><a href="#">Catálogo</a></li>
          <li><a href="#">Personalización</a></li>
          <li><a href="#">Sobre nosotros</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export class Headers {}
