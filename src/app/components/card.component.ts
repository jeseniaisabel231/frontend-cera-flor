import { Component } from '@angular/core';
@Component({
  selector: 'card',
  template: `
    <article class="flex flex-col gap-1">
      <a href="#">
        <img
          src="producto1.png"
          alt="Jabón de arroz"
          class="rounded-t-xl w-full object-cover"
        />
      </a>

      <div
        class="bg-white border border-gray-300 rounded-b-xl py-4 px-6 flex flex-col gap-4"
      >
        <div class="text-left font-semibold">
          <h3 class="text-[17px] ">Jabón de arroz</h3>
          <p class="text-gray-600">$ 6.99</p>
        </div>

        <button
          class="bg-morado-600 text-amarrillo-500 font-bold py-2 rounded-2xl w-50 xl:w-60 "
        >
          Comprar
        </button>
      </div>
    </article>
  `,
})
export class Card {}
