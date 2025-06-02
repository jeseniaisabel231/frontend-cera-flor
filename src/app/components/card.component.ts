import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import type { producto } from '../interfaces/producto.interface';

@Component({
  imports: [RouterLink],
  selector: 'card',
  standalone: true,
  template: `
    <article class="flex h-98 cursor-pointer flex-col rounded-xl border border-gray-300 bg-white">
      <div
        class=""
        [routerLink]="['/detalle-producto', producto()._id]"
      >
        <img
          [src]="producto().imagen"
          [alt]="producto().nombre"
          class="mb-4 h-60 w-full rounded-t-md border-b-1 border-gray-300 object-cover"
        />
        <div class="flex w-full flex-col justify-between px-4">
          <div class="text-sm text-gray-500">
            {{
              producto().id_categoria._id === '680fd248f613dc80267ba5d7'
                ? 'Jabones Artesanales'
                : 'Velas Artesanales'
            }}
          </div>
          <div class="font-semibold text-gray-800">{{ producto().nombre }}</div>
          <div class="my-2 font-bold text-purple-600">
            $
            {{ producto().precio }}
          </div>
        </div>
      </div>
      <div class="flex  gap-4 px-4">
        <div class="flex items-center rounded border px-2 py-1">
          <button class="px-2" (click)="decrementarCantidad()">-</button>
          <span class="px-2">{{cantidad()}}</span>
          <button class="px-2" (click)="incrementarCantidad()">+</button>
        </div>
        <button
          (click)="agregarAlCarrito()"
          class="bg-morado-600 hover:bg-morado-700 w-full rounded-2xl py-2 font-bold text-white transition"
        >
          Comprar
        </button>
      </div>
    </article>
  `,
})
export class Card {
  public producto = input.required<producto>();
  public serviceCarrito = inject(CarritoService);
  public cantidad = signal(1);
  public emitirCantidad = output<number>();

  //metodo para incrementar
  incrementarCantidad(){
    this.cantidad.update((cantidadActual) => cantidadActual + 1);
  }

  decrementarCantidad(){
    this.cantidad.update((cantidadActual) => {
      if (cantidadActual > 1) {
        return cantidadActual - 1;
      }
      return cantidadActual; // No decrementar si ya es 1
    });
  }
  //metodo para agregar al carrito
  agregarAlCarrito() {
    console.log('Producto agregado al carrito:', this.producto().nombre);
    this.serviceCarrito.agregarCarrito(this.producto(), this.cantidad()).subscribe({
      next: () => {
        this.emitirCantidad.emit(1);
      }
    });

  }
}
