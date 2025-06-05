import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { BarranavComponent } from '../components/barranav.component';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [Headers, BarranavComponent, Footeer, CurrencyPipe, RouterLink],
  template: `
    <headers [(nuevaCantidad)]="nuevaCantidad"></headers>
    <main class="flex min-h-screen flex-col bg-gray-50">
      <barranav rutaSeccionSeleccionada="carrito"></barranav>

      <div class="px-6 pt-8 sm:px-40 mt-10">
        <h1 class="text-[24px] font-bold ">Carrito de Compras</h1>
        <p class="mt-1">
          Revisa y gestiona tus productos antes de pagar
        </p>
      </div>

      <div
        class="flex flex-col-reverse px-6 pb-10 sm:flex-row sm:gap-4 sm:px-10 md:px-30 lg:px-40"
      >
        <section class="mt-8 flex-1 lg:w-3/5">
          <div class="rounded-lg border border-gray-200 bg-white shadow-sm">
            @if (carritoProductos.productos.length === 0) {
              <div class="p-8 text-center">
                <p class="text-lg text-gray-600">Tu carrito está vacío</p>
                <button
                  routerLink="/catalogo"
                  [queryParams]="{ categoria: 'jabones-artesanales' }"
                  class="mt-4 rounded-full bg-[#9810fa] px-6 py-2 font-medium text-white hover:bg-[#7a0dc7]"
                >
                  Explorar productos
                </button>
              </div>
            }

            @for (producto of carritoProductos.productos; track $index) {
              <article
                class="flex items-center justify-between border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50"
              >
                <div class="flex items-center gap-4">
                  <img
                    [src]="producto.producto_id.imagen"
                    [alt]="producto.producto_id.nombre"
                    class="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
                  />
                  <div class="flex h-28 flex-col justify-center">
                    <small class="text-xs font-medium text-gray-500">
                      {{
                        producto.producto_id.id_categoria._id ===
                        '680fd248f613dc80267ba5d7'
                          ? 'Jabones Artesanales'
                          : 'Velas Artesanales'
                      }}
                    </small>
                    <h2 class="text-lg font-bold text-gray-800">
                      {{ producto.producto_id.nombre }}
                    </h2>
                    <div class="mt-2 flex flex-wrap items-center gap-2">
                      <small
                        class="rounded-full bg-[#9ffedb] px-3 py-1 text-xs"
                      >
                        <strong>Aroma:</strong>
                        {{ producto.producto_id.aroma }}
                      </small>
                      <small
                        class="rounded-full bg-[#ccc3fb] px-3 py-1 text-xs"
                      >
                        <strong>Tipo:</strong>
                        {{ producto.producto_id.tipo }}
                      </small>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col items-end gap-4">
                  <div class="flex items-center gap-6">
                    <div
                      class="flex items-center rounded-full border border-gray-200"
                    >
                      <button
                        class="rounded-l-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
                        (click)="decrementarCantidad(producto)"
                        title="Disminuir cantidad"
                        [disabled]="producto.cantidad <= 1"
                        [class.text-gray-400]="producto.cantidad <= 1"
                        [class.cursor-not-allowed]="producto.cantidad <= 1"
                      >
                        -
                      </button>
                      <span class="px-2 text-lg font-medium">
                        {{ producto.cantidad }}
                      </span>
                      <button
                        class="rounded-r-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
                        (click)="incrementarCantidad(producto)"
                        title="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <p class="text-xl font-bold text-[#9810fa]">
                      {{
                        producto.producto_id.precio * producto.cantidad
                          | currency
                      }}
                    </p>
                  </div>

                  <button
                    class="group flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                    (click)="eliminarProducto(producto.producto_id._id)"
                    title="Eliminar producto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 512 512"
                      class="fill-current"
                    >
                      <path
                        d="M320 85.334H192V42.667h128zm-85.333 128H192V384h42.667zm85.333 0h-42.667V384H320zM448 128v42.667h-42.667v298.667H106.667V170.667H64V128z"
                      />
                    </svg>
                    <span class="hidden sm:inline">Eliminar</span>
                  </button>
                </div>
              </article>
            }
          </div>
        </section>

        <aside class="mt-8 h-fit lg:w-2/5 lg:pl-4">
          <div
            class="sticky top-28 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 class="mb-4 text-xl font-bold text-gray-800">
              Resumen del pedido
            </h3>

            <ul class="space-y-3 text-gray-700">
              <li class="flex justify-between">
                <span>
                  Subtotal ({{ carritoProductos.productos.length }} productos)
                </span>
                <span class="font-medium">
                  {{ calcularSubtotal() | currency }}
                </span>
              </li>
              <li class="flex justify-between">
                <span>Impuestos</span>
                <span class="font-medium">
                  {{ calcularImpuestos() | currency }}
                </span>
              </li>
              <li
                class="flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold"
              >
                <span>Total a pagar:</span>
                <span class="text-[#9810fa]">
                  {{ carritoProductos.total | currency }}
                </span>
              </li>
            </ul>

            <button
              class="mt-6 w-full rounded-full bg-[#9810fa] py-3 font-semibold text-white transition-colors hover:bg-[#7a0dc7] disabled:bg-gray-400"
              routerLink="/informacion-pago"
              [disabled]="carritoProductos.productos.length === 0"
            >
              Proceder al pago
            </button>

          </div>
        </aside>
      </div>
    </main>
  `,
})
export class ShoppingCardPage {
  public serviceCarrito = inject(CarritoService);
  public carritoProductos: any = {};
  public cantidad = signal(1);
  public nuevaCantidad = signal(0);

  constructor() {
    // Inicializar el carrito al cargar la página
    this.serviceCarrito.obtenerCarrito().subscribe({
      next: (respuesta) => {
        this.carritoProductos = respuesta.carrito ?? {}; // Asignar el carrito a la variable objeto{}
      },
      error: (error) => {
        console.error('Error al cargar el carrito:', error);
      },
    });
  }

  actualizarCantidadEnCarrito(producto: any, cantidad: number = 1) {
    this.serviceCarrito
      .modificarCantidadCarrito(producto.producto_id._id, cantidad)
      .subscribe({
        error: (error) => {
          console.error('Error al actualizar cantidad:', error);
        },
      });
  }
  eliminarProducto(producto_id: string) {
    console.log('Eliminando producto con ID:', producto_id);
    this.serviceCarrito.eliminarCarrito(producto_id).subscribe({
      error: (error) => {
        console.error('Error al eliminar producto:', error);
      },
    });
  }

  calcularSubtotal() {
    const iva = 0.15;
    const impuestos = this.carritoProductos.total * iva;
    return this.carritoProductos.total - impuestos;
  }
  calcularImpuestos() {
    const iva = 0.15;
    return this.carritoProductos.total * iva;
  }
  //metodo para incrementar
  incrementarCantidad(producto: any) {
    this.actualizarCantidadEnCarrito(producto);
  }

  decrementarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      this.actualizarCantidadEnCarrito(producto, -1);
    }
  }
}
