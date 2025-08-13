import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/categorias.service';
import { PersonalizationService } from '../../services/personalization.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';
import { Loading } from '../components/loading.component';
import { ModalResumenProductoComponent } from '../components/modalResumenProducto.component';
import type { productoPersonalizado } from '../interfaces/personalizacion.interface';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    CurrencyPipe,
    Loading,
    ModalAvisosComponent,
    TitleCasePipe,
    ModalResumenProductoComponent,
    DatePipe,
    RouterLink,
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
          <div class="grid grid-cols-1 gap-4 rounded-lg md:grid-cols-2">
            @if (servicePersonalizacion.carga()) {
              <loading class="col-span-2" />
            } @else {
              @for (
                producto of servicePersonalizacion.productosPersonalizados();
                track $index
              ) {
                <article
                  class="flex cursor-pointer flex-wrap items-center justify-between rounded-lg border-b border-gray-100 bg-white p-4 wrap-anywhere shadow-sm last:border-b-0 hover:bg-gray-50"
                  (click)="mostrarModalResumen(producto)"
                >
                  <div class="flex flex-row items-center gap-4">
                    <img
                      [src]="producto.imagen"
                      alt="Imagen del producto personalizado"
                      class="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
                    />
                    <div class="flex h-28 flex-col justify-center">
                      <small class="text-xs font-medium text-gray-500">
                        {{ nombreCategoria(producto.id_categoria) }}
                      </small>
                      <h2 class="text-lg font-bold text-gray-800">
                        {{
                          producto.tipo_producto === 'personalizado'
                            ? 'Producto personalizado'
                            : 'Producto producto con IA'
                        }}
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
                          {{
                            obtenerTipo(producto.ingredientes, 'esencia')
                              | titlecase
                          }}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-end gap-2">
                      <button
                        class="group flex cursor-pointer items-center gap-1 text-sm text-gray-500 transition-colors hover:text-red-600"
                        (click)="
                          mostrarModalEliminar(producto._id);
                          $event.stopPropagation()
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

                      <button
                        class="group flex cursor-pointer items-center gap-1 text-sm text-gray-500 transition-colors hover:text-green-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 1.75A10.25 10.25 0 1 0 22.25 12A10.26 10.26 0 0 0 12 1.75m0 4.69a1 1 0 1 1-.03 0zm1 10.83a1 1 0 1 1-2 0v-6.33a1 1 0 0 1 2 0z"
                          />
                        </svg>
                        <span class="hidden sm:inline">Ver mas</span>
                      </button>
                    </div>
                    <div class="mt-4 flex flex-col items-end">
                      <p class="text-morado-700 text-lg font-bold">
                        {{ producto.precio | currency: 'USD' }}
                      </p>
                      <small class="text-xs text-gray-500">
                        {{ producto.updatedAt | date: 'dd/MM/yyyy' }}
                      </small>
                    </div>
                  </div>
                </article>
              } @empty {
                <div class="col-span-2 p-8 text-center">
                  <p class="text-lg text-gray-600">
                    No tienes productos personalizados por el momento
                  </p>
                  <button
                    routerLink="/personalizacion-producto"
                    class="mt-4 cursor-pointer rounded-full bg-[#9810fa] px-6 py-2 font-medium text-white hover:bg-[#7a0dc7]"
                  >
                    ¡Crea tu producto personalizado!
                  </button>
                </div>
              }
            }
          </div>
        </section>
      </div>
      <app-modal-resumen [(mostrarModal)]="mostrarResumen" [datos]="datos()" />

      <app-modal
        tipo="confirmacion"
        (decision)="recibirDecision($event)"
        [titulo]="'Eliminar producto'"
        [mensaje]="
          '¿Está seguro/a de eliminar este producto de tus personalizaciones?'
        "
        [(mostrarModal)]="mostrarModal"
      ></app-modal>
    </main>
  `,
})
export class CustmizedProductPage {
  public servicePersonalizacion = inject(PersonalizationService);
  public serviceCategorias = inject(CategoryService);
  public mostrarResumen = signal(false);
  public datos = signal<productoPersonalizado>({} as productoPersonalizado);

  public mostrarModal = signal(false);
  public idEliminar = signal('');

  public recibirDecision(decision: boolean) {
    if (decision) {
      this.servicePersonalizacion
        .eliminarPersonalizacion(this.idEliminar())
        .subscribe();
    }
  }

  public mostrarModalEliminar(producto_id: string) {
    this.idEliminar.set(producto_id);
    this.mostrarModal.set(true);
  }

  public obtenerTipo(ingredientes: any[], tipo: string): string {
    return ingredientes
      .filter((i) => i.tipo === tipo)
      .map((i) => i.nombre)
      .join(', ');
  }

  public mostrarModalResumen(producto: productoPersonalizado) {
    this.datos.set(producto);
    this.mostrarResumen.set(true);
  }

  public nombreCategoria(id: string) {
    return (
      this.serviceCategorias.categorias().find((c) => c._id === id)?.nombre ??
      ''
    );
  }
}
