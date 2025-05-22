import { Component, input } from '@angular/core';
import type { producto } from '../interfaces/producto.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ RouterLink],
  selector: 'card',
  standalone: true,
  template: `
    <div
      class="flex flex-col border border-gray-300 bg-white rounded-xl items-center h-98 cursor-pointer"
      [routerLink]="['/detalle-producto', producto()._id]"
    >
      <img
        [src]="producto().imagen"
        [alt]="producto().nombre"
        class="rounded-t-md h-60 w-full object-cover mb-4"
      />
      <div class="flex flex-col justify-between w-full px-4">
        <div class="text-sm text-gray-500 ">
          {{
            producto().id_categoria._id === '680fd248f613dc80267ba5d7'
              ? 'Jabones Artesanales'
              : 'Velas Artesanales'
          }}
        </div>
        <div class="font-semibold text-gray-800">{{ producto().nombre }}</div>
        <div class="text-purple-600 font-bold my-2">$
          {{ producto().precio }}
        </div>
        <button
          class="bg-morado-600 text-white font-bold py-2 rounded-2xl w-full hover:bg-morado-700 transition"
          
        >
          Comprar
        </button>
      </div>
    </div>
  `,
})
export class Card {
  producto = input.required<producto>();
}
