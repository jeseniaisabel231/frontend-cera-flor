import { TitleCasePipe } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'product-details',
  imports: [TitleCasePipe],
  template: `
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 pt-6 pb-4 md:grid-cols-2"
    >
      @if (productoResource().isLoading()) {
        <div class="flex items-center justify-center">
          <div
            class="h-34 w-34 animate-spin rounded-full border-b-2 border-gray-900"
          ></div>
        </div>
      } @else {
        @let producto = productoResource().value().producto;

        <figure>
          <img
            [src]="producto.imagen"
            alt="Jabón de avena"
            class="size-100 rounded-xl object-cover"
          />
        </figure>
        <article class="wrap-anywhere">
          <h2
            class="font-playfair mb-8 text-[20px] font-semibold text-wrap sm:text-2xl"
          >
            {{ producto.nombre | titlecase }}
          </h2>
          <p class="mb-4 text-wrap">
            {{ producto.descripcion }}
          </p>

          <h2 class="mb-2 font-semibold">Beneficios</h2>
          <ul class="mb-4 list-inside list-disc space-y-1">
            @for (beneficio of producto.beneficios; track beneficio) {
              <li>{{ beneficio }}</li>
            }
          </ul>

          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <span class="text-3xl font-bold text-purple-600">
                $ {{ producto.precio }}
              </span>

              <div
                class="flex items-center rounded-full border border-gray-600"
              >
                <button
                  class="rounded-l-full px-3 py-1 text-lg transition-colors hover:bg-gray-200 cursor-pointer"
                  (click)="decrementarCantidad()"
                  title="Disminuir cantidad"
                >
                  -
                </button>
                <span class="px-2">{{ cantidad() }}</span>
                <button
                  class="rounded-r-full px-3 py-1 text-lg transition-colors hover:bg-gray-200 cursor-pointer"
                  (click)="incrementarCantidad()"
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <button
              class="bg-morado-600 hover:bg-morado-700 rounded-2xl px-8 py-3 font-bold text-white transition cursor-pointer"
              (click)="agregarAlCarrito(producto)"
            >
              Agregar al carrito
            </button>
          </div>
        </article>
      }
    </div>
  `,
})
export class ProductDetailsComponent {
  public servicioCarrito = inject(CarritoService);
  public producto_id = input();
  public cantidad = signal(1);

  public productoResource = input.required<HttpResourceRef<any>>();

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

  agregarAlCarrito(producto: any) {
    this.servicioCarrito.agregarCarrito(producto, this.cantidad()).subscribe({
      next: () => {
        this.cantidad.set(1);
      },
    });
  }
}
