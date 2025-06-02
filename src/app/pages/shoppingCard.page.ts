import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { BarranavComponent } from '../components/barranav.component';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [Headers, BarranavComponent, Footeer, CurrencyPipe],
  template: `
    <headers [(nuevaCantidad)]="nuevaCantidad"></headers>
    <main class="flex min-h-screen flex-col">
      <barranav rutaSeccionSeleccionada="carrito"></barranav>

      <!-- Contenido principal del carrito -->
      <div class="grid grid-cols-1 gap-10 px-60 py-10 md:grid-cols-3">
        <!-- Lista de productos -->
        <section class="mt-10 md:col-span-2">
          <h1 class="border-b-1">Carrito de Compras</h1>
          <!-- Producto -->
          @for (producto of carritoProductos.productos; track $index) {
            <article
              class="border-gris-200 flex max-w-6xl justify-between rounded-lg border-b-1 p-4 px-4"
            >
              <div class="flex items-center gap-4">
                <img
                  [src]="producto.producto_id.imagen"
                  [alt]="producto.producto_id.nombre"
                  class="h-26 w-26 rounded object-cover"
                />
                <div class="flex flex-col">
                  <h2 class="">
                    {{ producto.producto_id.nombre }}
                  </h2>
                  <div class="mt-2 flex items-center gap-2">
                    <small class="bg-amarrillo-600 rounded-2xl px-2">
                      <strong>Aroma:</strong>
                      {{ producto.producto_id.aroma }}
                    </small>
                    <small class="bg-amarrillo-600 rounded-2xl px-2">
                      <strong>Tipo:</strong>
                      {{ producto.producto_id.tipo }}
                    </small>
                  </div>
                  <p class="mt-8 font-medium text-[#9810fa]">
                    {{ producto.producto_id.precio | currency }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end gap-8">
                <button class="text-gray-600 hover:text-red-600" (click)="eliminarProducto(producto.producto_id._id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#3C3C3B"
                      fill-rule="evenodd"
                      d="M320 85.334H192V42.667h128zm-85.333 128H192V384h42.667zm85.333 0h-42.667V384H320zM448 128v42.667h-42.667v298.667H106.667V170.667H64V128z"
                    />
                  </svg>
                </button>
                <div class="flex items-center rounded border">
                  <button
                    class="px-2 text-xl"
                    (click)="decrementarCantidad(producto)"
                  >
                    -
                  </button>
                  <span class="px-3">{{ producto.cantidad }}</span>
                  <button
                    class="px-2 text-xl"
                    (click)="incrementarCantidad(producto)"
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          }
        </section>

        <!-- Resumen del pedido -->
        <aside
          class="border-gris-200 mt-10 h-fit rounded-lg border bg-white p-6"
        >
          <h3 class="mb-4 text-lg font-bold text-green-900">
            Resumen del pedido
          </h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ calcularSubtotal() | currency }}</span>
            </li>
            <li class="flex justify-between">
              <span>Impuestos</span>
              <span>{{ calcularImpuestos() | currency }}</span>
            </li>
            <li class="flex justify-between border-t pt-2 font-semibold">
              <span>Total a pagar:</span>
              <span>{{ carritoProductos.total | currency }}</span>
            </li>
          </ul>
          <button
            class="mt-6 w-full rounded-full bg-orange-500 py-2 font-semibold text-white transition duration-300 hover:bg-orange-600"
          >
            Pagar
          </button>
        </aside>
      </div>
    </main>
    <footeer></footeer>
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
        console.log('Carrito cargado del service:', respuesta);
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
        next: (respuesta) => {
          this.actualizarTotales();
        },
        error: (error) => {
          console.error('Error al actualizar cantidad:', error);
        },
      });
  }
  actualizarTotales() {
    this.carritoProductos.total = this.carritoProductos.productos.reduce(
      (total: number, producto: any) =>
        total + producto.producto_id.precio * producto.cantidad,
      0,
    );
  }
  eliminarProducto(producto_id: string) {
    console.log('Eliminando producto con ID:', producto_id);
    this.serviceCarrito.eliminarCarrito(producto_id).subscribe({
      next: (respuesta) => {
        console.log('Producto eliminado:', respuesta);
        this.actualizarTotales();
      },
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
    this.actualizarTotales();
  }

  decrementarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      this.actualizarCantidadEnCarrito(producto, -1);
      this.actualizarTotales();
    }
  }
  recibirCantidad(cantidad: number) {
    this.nuevaCantidad.set(cantidad);
  }
}
