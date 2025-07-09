import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { CategoryService } from '../../services/categorias.service';
import type { producto } from '../interfaces/producto.interface';

@Component({
  imports: [RouterLink, DecimalPipe, TitleCasePipe],
  selector: 'card',
  standalone: true,
  template: `
    <article
      class="flex h-106 cursor-pointer flex-col rounded-xl border border-gray-300 bg-white"
    >
      <div [routerLink]="['/detalle-producto', producto()._id]">
        <img
          [src]="producto().imagen"
          [alt]="producto().nombre"
          class="mb-4 h-60 w-full rounded-t-md border-b-1 border-gray-300 object-cover"
        />
        <div class="flex w-full flex-col justify-between px-4">
          <div class="text-sm text-gray-500">
            {{ obtenerCategoria() | titlecase }}
          </div>
          <h2
            class="overflow-hidden text-[17px] font-bold text-ellipsis whitespace-nowrap text-gray-800"
          >
            {{ producto().nombre | titlecase }}
          </h2>
          <div class="flex w-full items-center gap-2">
            <small
              class="overflow-hidden rounded-full bg-[#9ffedb] px-3 py-1 text-xs font-bold text-ellipsis whitespace-nowrap"
            >
              {{ producto().aroma | titlecase }}
            </small>
            <small
              class="overflow-hidden rounded-full bg-[#ccc3fb] px-3 py-1 text-xs font-bold text-ellipsis whitespace-nowrap"
            >
              {{ producto().tipo | titlecase }}
            </small>
          </div>
          <div class="mt-3 text-[20px] font-bold text-purple-600">
            $
            {{ producto().precio | number: '1.2-2' }}
          </div>
        </div>
      </div>
      <div class="flex gap-4 px-4">
        <div class="flex items-center rounded-full border border-gray-300">
          <button
            class=" rounded-l-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
            (click)="decrementarCantidad(); $event.stopPropagation()"
            title="Disminuir cantidad"
            [class]="
              cantidad() <= 1
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            "
            [disabled]="cantidad() <= 1"
          >
            -
          </button>
          <span class="px-2">{{ cantidad() }}</span>
          <button
            class="cursor-pointer rounded-r-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
            (click)="incrementarCantidad(); $event.stopPropagation()"
            title="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <button
          (click)="agregarAlCarrito()"
          class="bg-morado-600 hover:bg-morado-700 flex w-full cursor-pointer items-center justify-center rounded-2xl py-2 font-bold text-white transition"
        >
          @if (carga()) {
            <svg
              class="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="#fff"
            >
              <path
                d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
              />
            </svg>
          } @else {
            Comprar
          }
        </button>
      </div>
    </article>
    @if (mostrarMensajeExito()) {
      <div
        class="fixed right-0 bottom-0 left-0 z-50 flex justify-center gap-2 bg-[#9f93e7] p-4 text-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ffffff"
            d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
          />
        </svg>
        <p class="font-bold">Producto agregado exitosamente.</p>
      </div>
    }
  `,
})
export class Card {
  public producto = input.required<producto>();
  public serviceCarrito = inject(CarritoService);
  public cantidad = signal(1);
  public mostrarMensajeExito = signal(false);
  public carga = signal(false);
  public servicioCategorias = inject(CategoryService);

  //metodo para incrementar
  incrementarCantidad() {
    this.cantidad.update((cantidadActual) => cantidadActual + 1);
  }
  obtenerCategoria() {
    const categoria = this.servicioCategorias
      .categorias()
      .find((cat) => cat._id === this.producto().id_categoria._id);
    return categoria ? categoria.nombre : 'Sin categoría';
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
    this.carga.set(true);
    this.serviceCarrito
      .agregarCarrito(this.producto(), this.cantidad())
      .subscribe({
        next: ({ carrito }: any) => {
          this.cantidad.set(1);
          this.carga.set(false);
          this.mostrarMensajeExito.set(true);
          setTimeout(() => {
            this.mostrarMensajeExito.set(false);
          }, 2000);
        },
        error: (error) => {
          this.carga.set(false);
        },
      });
  }
}
