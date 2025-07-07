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
        <div class="flex items-center justify-center col-span-2">
          <img
          src="logo.png"
          class="animate-pulse mx-auto h-24 w-22"
          />
        </div>
      } @else {
        @let producto = productoResource().value().producto;

        <figure>
          <img
            [src]="producto.imagen"
            alt="Jabón de avena"
            class="w-full h-auto md:h-100 md:w-100 rounded-xl object-cover"
          />
        </figure>
        <article class="wrap-anywhere">
          <h2
            class="font-playfair mb-8 text-[20px] font-semibold text-wrap sm:text-2xl md:text-3xl"
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

          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex gap-4">
              <span class="text-3xl font-bold text-purple-600">
                $ {{ producto.precio }}
              </span>

              <div
                class="flex items-center rounded-full border border-gray-600"
              >
                <button
                  class="rounded-l-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
                  (click)="decrementarCantidad()"
                  title="Disminuir cantidad"
                  [class]="cantidad() <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
                  [disabled]="cantidad() <= 1"
                >
                  -
                </button>
                <span class="px-2">{{ cantidad() }}</span>
                <button
                  class="cursor-pointer rounded-r-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
                  (click)="incrementarCantidad()"
                  title="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <button
              class="bg-morado-600 hover:bg-morado-700 cursor-pointer rounded-2xl px-8 py-3 font-bold text-white transition "
              (click)="agregarAlCarrito(producto)"
            >
              @if (carga()) {
                <svg
                  class="animate-spin mx-auto"
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
                Agregar al carrito
              }
            </button>
          </div>
        </article>
      }
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
    </div>
  `,
})
export class ProductDetailsComponent {
  public servicioCarrito = inject(CarritoService);
  public producto_id = input();
  public cantidad = signal(1);
  public carga = signal(false);
  public productoResource = input.required<HttpResourceRef<any>>();
  public mostrarMensajeExito = signal(false);

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
    this.carga.set(true);
    this.servicioCarrito
      .agregarCarrito(producto, this.cantidad())
      .subscribe({
        next: () => {
          this.cantidad.set(1);
          this.mostrarMensajeExito.set(true);
          setTimeout(() => {
            this.mostrarMensajeExito.set(false);
          }, 2000);
        },
      })
      .add(() => {
        this.carga.set(false);
      });
  }
}
