import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { CategoryService } from '../../services/categorias.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';
import { Loading } from '../components/loading.component';
import { carritoProducto } from '../interfaces/carrito.interface';
import type { ingrediente } from '../interfaces/ingrediente.interface';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    CurrencyPipe,
    RouterLink,
    Loading,
    ModalAvisosComponent,
    TitleCasePipe,
  ],
  template: `
    <headers></headers>
    <main class="flex min-h-screen flex-col bg-gray-50">
      <barranav rutaSeccionSeleccionada="carrito"></barranav>

      <div class="mt-10 flex flex-col px-6 pt-8 sm:px-40">
        <h1 class="text-[24px] font-bold">Carrito de Compras</h1>
        <p class="mt-1">Revisa y gestiona tus productos antes de pagar</p>
      </div>

      <div
        class="flex flex-col-reverse px-6 pb-10 sm:flex-row sm:gap-4 sm:px-10 md:px-30 lg:px-40"
      >
        <section class="mt-8 flex-1 lg:w-3/5">
          <div class="rounded-lg border border-gray-200 bg-white shadow-sm">
            @if (serviceCarrito.carga()) {
              <loading />
            } @else {
              @for (
                producto of serviceCarrito.carrito().productos;
                track $index
              ) {
                @let item = producto.producto;
                <article
                  class="flex items-center justify-between border-b border-gray-100 p-4 wrap-anywhere last:border-b-0 hover:bg-gray-50"
                  data-testid="producto-carrito"
                >
                  <div class="flex items-center gap-4">
                    <img
                      [src]="item.imagen || imagenPersonalizado"
                      [alt]="item.nombre"
                      class="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
                    />
                    <div class="flex h-28 flex-col justify-center">
                      <small class="text-xs font-medium text-gray-500">
                        {{ obtenerNombreCategoria(item.id_categoria) }}
                      </small>
                      <h2
                        class="text-lg font-bold text-gray-800"
                        data-testid="nombre-producto"
                      >
                        {{
                          item.nombre
                            ? (item.nombre | titlecase)
                            : producto.tipo_producto === 'personalizado'
                              ? 'Producto personalizado'
                              : 'Recomendación de IA'
                        }}
                      </h2>
                      <div class="mt-2 flex flex-wrap items-center gap-2">
                        <small
                          class="max-w-30 overflow-hidden rounded-full bg-[#9ffedb] px-3 py-1 text-xs text-ellipsis whitespace-nowrap"
                        >
                          <strong>Aroma:</strong>
                          {{ item.aroma }}
                        </small>
                        <small
                          class="rounded-full bg-[#ccc3fb] px-3 py-1 text-xs"
                        >
                          @if (item.tipo) {
                            <strong>Tipo:</strong>
                            {{ item.tipo }}
                          } @else {
                            <strong>Esencias:</strong>
                            {{ obtenerEsencias(item.ingredientes) }}
                          }
                        </small>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-4">
                    <div class="sm:flex sm:flex-row flex-col items-center gap-6 ">
                      <div
                        class="flex items-center rounded-full border border-gray-200"
                      >
                        <button
                          class="cursor-pointer rounded-l-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
                          (click)="
                            decrementarCantidad(
                              producto,
                              producto.tipo_producto
                            )
                          "
                          title="Disminuir cantidad"
                          [disabled]="producto.cantidad <= 1"
                          [class.text-gray-400]="producto.cantidad <= 1"
                          [class.cursor-not-allowed]="producto.cantidad <= 1"
                        >
                          -
                        </button>
                        <span class="px-2 text-lg font-medium ">
                          {{ producto.cantidad }}
                        </span>
                        <button
                          class="cursor-pointer rounded-r-full px-3 py-1 text-lg transition-colors hover:bg-gray-200"
                          (click)="
                            incrementarCantidad(
                              producto.producto_id,
                              producto.tipo_producto
                            )
                          "
                          title="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <p
                        class="md:text-xl font-bold text-[#9810fa] text-center"
                        data-testid="precio-producto"
                      >
                        $ {{ producto.precio_unitario }}
                      </p>

                    </div>

                    <button
                      class="group flex cursor-pointer items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                      (click)="
                        mostrarModalEliminar(
                          producto.producto_id,
                          producto.tipo_producto
                        )
                      "
                      title="Eliminar producto"
                      data-testid="eliminar-producto"
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
              } @empty {
                <div class="p-8 text-center">
                  <p class="text-lg text-gray-600">Tu carrito está vacío</p>
                  <button
                    routerLink="/catalogo"
                    [queryParams]="{ categoria: 'jabones-artesanales' }"
                    class="mt-4 cursor-pointer rounded-full bg-[#9810fa] px-6 py-2 font-medium text-white hover:bg-[#7a0dc7]"
                  >
                    Explorar productos
                  </button>
                </div>
              }
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
                  Subtotal ({{ serviceCarrito.carrito().productos.length }}
                  productos)
                </span>
                <span class="font-medium">
                  {{ calcularSubtotal() | currency }}
                </span>
              </li>
              <li class="flex justify-between">
                <span>Impuestos (IVA 15%)</span>
                <span class="font-medium">
                  {{ calcularImpuestos() | currency }}
                </span>
              </li>
              <li
                class="flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold"
              >
                <span>Total a pagar:</span>
                <span class="text-[#9810fa]">
                  {{ serviceCarrito.carrito().total | currency }}
                </span>
              </li>
            </ul>

            <button
              class="bg-morado-600 hover:bg-morado-700 mt-6 w-full cursor-pointer rounded-[12px] py-3 font-semibold text-white transition-colors disabled:bg-gray-400"
              routerLink="/informacion-pago"
              [disabled]="serviceCarrito.carrito().productos.length === 0"
            >
              Proceder al pago
            </button>
            <button
              class="mt-2 w-full cursor-pointer rounded-[12px] bg-red-500 py-3 font-semibold text-white transition-colors hover:bg-red-600 disabled:bg-gray-400"
              (click)="this.mostrarModalVaciar.set(true)"
              [disabled]="serviceCarrito.carrito().productos.length === 0"
            >
              Vaciar Carrito
            </button>
          </div>
        </aside>
      </div>
      <app-modal
        tipo="confirmacion"
        [titulo]="'Eliminar producto'"
        [mensaje]="'¿Está seguro/a de eliminar este producto del carrito?'"
        [(mostrarModal)]="mostrarModal"
        (decision)="desicionModal($event)"
        data-testid="modal-confirmacion"
      ></app-modal>

      <app-modal
        tipo="confirmacion"
        [titulo]="'Eliminar carrito'"
        [mensaje]="
          '¿Está seguro/a de eliminar todos los productos del carrito?'
        "
        [(mostrarModal)]="mostrarModalVaciar"
        (decision)="desicionModalVaciar($event)"
      ></app-modal>
    </main>
  `,
})
export class ShoppingCardPage {
  public serviceCarrito = inject(CarritoService);
  public cantidad = signal(1);
  public cantidadProducto = signal(0);
  public mostrarModal = signal(false);
  public desicionProducto = signal(false);
  public idEliminar = signal('');
  public tipoProductoEliminar = signal('');
  public imagenPersonalizado = localStorage.getItem('personalizacion') ?? '';
  public mostrarModalVaciar = signal(false);
  public servicioCategoria = inject(CategoryService);

  actualizarCantidadEnCarrito(
    producto_id: string,
    cantidad: number = 1,
    tipo_producto: string,
  ) {
    this.serviceCarrito
      .modificarCantidadCarrito(producto_id, cantidad, tipo_producto)
      .subscribe();
  }

  calcularImpuestos() {
    const iva = 0.15;
    return this.serviceCarrito.carrito().total * iva;
  }

  calcularSubtotal() {
    return this.serviceCarrito.carrito().total - this.calcularImpuestos();
  }

  incrementarCantidad(producto_id: string, tipo_producto: string) {
    this.actualizarCantidadEnCarrito(producto_id, 1, tipo_producto);
  }

  decrementarCantidad(producto: carritoProducto, tipo_producto: string) {
    if (producto.cantidad > 1) {
      this.actualizarCantidadEnCarrito(producto.producto_id, -1, tipo_producto);
    }
  }

  desicionModal(decision: boolean) {
    this.desicionProducto.set(decision);
    if (decision) {
      this.serviceCarrito
        .eliminarCarrito(this.idEliminar(), this.tipoProductoEliminar())
        .subscribe();
    }
  }

  desicionModalVaciar(decision: boolean) {
    if (decision) {
      this.serviceCarrito.vaciarCarrito().subscribe();
    }
  }

  mostrarModalEliminar(producto_id: string, tipo_producto: string = 'normal') {
    this.idEliminar.set(producto_id);
    this.tipoProductoEliminar.set(tipo_producto);
    this.mostrarModal.set(true);
  }

  obtenerNombreCategoria(categoria: any): string {
    if (typeof categoria === 'string') {
      const categoriaEncontrada = this.servicioCategoria
        .categorias()
        .find((cat) => cat._id === categoria);
      return categoriaEncontrada
        ? categoriaEncontrada.nombre
        : 'Categoría desconocida';
    }

    return categoria;
  }

  obtenerEsencias(ingredientes: ingrediente[]): string {
    if (!ingredientes || ingredientes.length === 0) {
      return 'Sin esencias';
    }
    return ingredientes.filter((ing) => ing.tipo === 'esencia').map((ing) => ing.nombre).join(', ');
  }
}
