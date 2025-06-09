import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import type { producto } from '../interfaces/producto.interface';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  imports: [RouterLink, DecimalPipe,TitleCasePipe],
  selector: 'card',
  standalone: true,
  template: `
    <article
      class="flex h-106 cursor-pointer flex-col rounded-xl border border-gray-300 bg-white"
    >
      <div class="" [routerLink]="['/detalle-producto', producto()._id]">
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
          <div class="font-bold text-[17px] text-gray-800">{{ producto().nombre | titlecase }}</div>
          <div class=" flex flex-wrap items-center gap-2">
            <small class="rounded-full bg-[#9ffedb] px-3 py-1 text-xs font-bold">
              {{ producto().aroma | titlecase }}
            </small>
            <small class="rounded-full bg-[#ccc3fb] px-3 py-1 text-xs font-bold">
              {{ producto().tipo | titlecase }}
            </small>
          </div>
          <div class="mt-3 font-bold text-[20px] text-purple-600">
            $
            {{ producto().precio | number:'1.2-2'  }}
          </div>
        </div>
      </div>
      <div class="flex gap-4 px-4">
        <div class="flex items-center rounded-full border border-gray-300">
          <button
            class="rounded-l-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
            (click)="decrementarCantidad()"
            title="Disminuir cantidad"
          >
            -
          </button>
          <span class="px-2">{{ cantidad() }}</span>
          <button
            class="rounded-r-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
            (click)="incrementarCantidad()"
            title="Aumentar cantidad"
          >
            +
          </button>
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
  incrementarCantidad() {
    this.cantidad.update((cantidadActual) => cantidadActual + 1);
  }

  decrementarCantidad() {
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
    this.serviceCarrito
      .agregarCarrito(this.producto(), this.cantidad())
      .subscribe({
        next: () => {
          this.emitirCantidad.emit(1);
        },
      });
  }
}
