import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PersonalizationService } from '../../services/personalization.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';
import { Loading } from '../components/loading.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    RouterLink,
    Loading,
    ModalAvisosComponent,
    TitleCasePipe,
  ],
  template: `
    <headers></headers>
    <main class="flex min-h-screen flex-col bg-gray-50">
      <barranav rutaSeccionSeleccionada="carrito"></barranav>

      <div class="mt-10 px-6 pt-8 sm:px-40">
        <h1 class="text-[24px] font-bold">Productos personalizados</h1>
        <p class="mt-1">
          Revisa y gestiona tus productos personalizados antes de agregarlos al
          carrito
        </p>
      </div>

      <div
        class="flex flex-col-reverse px-6 pb-10 sm:flex-row sm:gap-4 sm:px-10 md:px-30 lg:px-40"
      >
        <section class="mt-8 flex-1 lg:w-3/5">
          <div class="grid grid-cols-2 gap-4 rounded-lg">
            @if (servicePersonalizacion.carga()) {
              <loading />
            } @else {
              @for (
                producto of servicePersonalizacion.productosPersonalizados();
                track $index
              ) {
                <article
                  class="flex flex-wrap items-center justify-between rounded-lg border-b border-gray-100 bg-white p-4 wrap-anywhere shadow-sm last:border-b-0 hover:bg-gray-50"
                >
                  <div class="flex flex-row items-center gap-4">
                    <!-- <img
                      [src]="item.imagen"
                      [alt]="item.nombre"
                      class="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
                    /> -->
                    <div class="flex h-28 flex-col justify-center">
                      <small class="text-xs font-medium text-gray-500">
                        {{
                          producto.id_categoria.toString() ===
                          '680fd248f613dc80267ba5d7'
                            ? 'Jabones Artesanales'
                            : 'Velas Artesanales'
                        }}
                      </small>
                      <h2 class="text-lg font-bold text-gray-800">
                        {{ 'Producto personalizado' }}
                      </h2>
                      <div class="mt-2 flex flex-wrap items-center gap-2">
                        <small
                          class="max-w-30 overflow-hidden rounded-full bg-[#9ffedb] px-3 py-1 text-xs text-ellipsis whitespace-nowrap"
                        >
                          <strong>Aroma:</strong>
                          {{ producto.aroma | titlecase }}
                        </small>
                        <small
                          class="rounded-full bg-[#ccc3fb] px-3 py-1 text-xs"
                        >
                          <strong>Esencias:</strong>
                          {{ obtenerTipo(producto.ingredientes, 'esencia') | titlecase }}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-4">
                    <p class="text-xl font-bold text-[#9810fa]">
                      $ {{ producto.precio }}
                    </p>

                    <button
                      class="group flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                      (click)="
                        mostrarModalEliminar(
                          producto._id,
                          producto.tipo_producto
                        )
                      "
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
              } @empty {
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
            }
          </div>
        </section>
      </div>
      <app-modal
        tipo="decidir"
        [titulo]="'Eliminar producto'"
        [mensaje]="'¿Está seguro/a de eliminar este producto del carrito?'"
        [(mostrarModal)]="mostrarModal"
      ></app-modal>
    </main>
  `,
})
export class CustmizedProductPage {
  public servicePersonalizacion = inject(PersonalizationService);
  public cantidad = signal(1);
  public cantidadProducto = signal(0);
  public mostrarModal = signal(false);
  public desicionProducto = signal(false);
  public idEliminar = signal('');
  public tipoProductoEliminar = signal('');

  // desicionModal(decision: boolean) {
  //   this.desicionProducto.set(decision);
  //   if (decision) {
  //     this.serviceCarrito
  //       .eliminarCarrito(this.idEliminar(), this.tipoProductoEliminar())
  //       .subscribe();
  //   }
  // }

  mostrarModalEliminar(producto_id: string, tipo_producto: string = 'normal') {
    this.idEliminar.set(producto_id);
    this.tipoProductoEliminar.set(tipo_producto);
    this.mostrarModal.set(true);
  }

  obtenerTipo(ingredientes: any[], tipo: string): string {
    return (
      ingredientes
        .filter((i) => i.tipo === tipo)
        .map((i) => i.nombre)
        .join(', ')
    );
  }
}
