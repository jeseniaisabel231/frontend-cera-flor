import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { transformaFecha } from '../../utils/transformaFecha';
import { BillComponent } from '../bill.component';
export type TituloForms = 'usuario' | 'venta';
export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';
@Component({
  selector: 'modal',
  imports: [TitleCasePipe, CurrencyPipe, BillComponent],
  template: `
    <dialog
      #modal
      class="m-auto w-full max-w-3xl rounded-lg bg-white text-gray-800 shadow-xl backdrop:bg-gray-600/25 backdrop:backdrop-blur-[2px]"
    >
      <!-- Encabezado del modal -->
      <div
        class="flex items-center justify-between border-b border-gray-200 p-6"
      >
        <h1 class="text-xl font-semibold text-gray-900">
          {{ acciones() }} {{ titulo() | titlecase }}
        </h1>
        <button
          (click)="close()"
          class="cursor-pointer text-gray-500 transition-colors hover:text-gray-700 focus:outline-none"
          aria-label="Cerrar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Contenido del formulario -->
      <div class="p-6">
        @if (verDatos()['imagen']) {
          <div class="mb-6 flex justify-center">
            <!-- Contenedor de imagen si existe -->
            @let isMale = verDatos()['genero'] === 'Masculino';
            <img
              class="h-40 w-40 rounded-full border-4 border-gray-100 object-cover shadow-sm"
              [src]="
                verDatos()['imagen'] ||
                (isMale ? 'perfilHombre.jpg' : 'perfilMujer.jpg')
              "
              alt="Imagen de perfil"
            />
          </div>
        }

        <!-- Grid de campos -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 relative">
          @if (titulo() === 'venta') {
            <button
              class="bg-morado-600 hover:bg-morado-700 mr-[3px] flex h-6 w-[36px] cursor-pointer items-center justify-center rounded-[9px] px-2 text-white absolute right-2 top-8"
              (click)="verPDF()"
              title="Visualizar información"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-6"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                />
              </svg>
            </button>
          }

          @for (clave of clavesCampos(); track $index) {
            @if (clave.toString() !== 'imagen') {
              <div
                class="space-y-1"
                [class.col-span-2]="
                  clave.toString() === 'productos' ||
                  clave.toString() === 'cliente'
                "
              >
                <label
                  class="block text-sm font-bold text-gray-700"
                  [for]="clave"
                >
                  {{ inputs[titulo()]['nombres'][$index] }}
                </label>

                @if (clave.toString() === 'cliente') {
                  <div class="mt-1 rounded-md bg-gray-50 p-2 text-gray-900">
                    {{ nombreCliente(verDatos()[clave]) }}
                  </div>
                } @else if (
                  clave.toString().includes('fecha') ||
                  clave.toString() === 'createdAt' ||
                  clave.toString() === 'updatedAt'
                ) {
                  <div class="mt-1 rounded-md bg-gray-50 p-2 text-gray-700">
                    {{ transformaFecha(verDatos()[clave]) }}
                  </div>
                } @else if (clave.toString() === 'productos') {
                  <div class="flex max-h-80 flex-col gap-y-3 overflow-y-auto">
                    @for (prod of verDatos()[clave]; track $index) {
                      <div
                        class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <div class="flex max-w-3/4 items-center gap-x-3">
                          <img
                            [alt]="prod?.nombre"
                            [src]="prod?.imagen"
                            class="h-16 w-16 rounded-lg object-cover"
                          />
                          <div class="flex flex-col">
                            <h4 class="font-semibold text-gray-900">
                              {{
                                prod?.nombre
                                  ? prod.nombre
                                  : prod.tipo === 'ia'
                                    ? 'Producto personalizado por IA'
                                    : 'Producto personalizado'
                              }}
                            </h4>
                            <p class="text-xs text-gray-600">
                              {{
                                prod?.descripcion ||
                                  obtenerDescripcionProductoPersonalizado(
                                    prod?.ingredientes
                                  )
                              }}
                            </p>
                          </div>
                        </div>
                        <div
                          class="flex w-1/4 justify-end text-xs text-gray-700"
                        >
                          <span class="whitespace-nowrap">
                            {{ prod?.cantidad }} x
                            {{ prod?.precio | currency: 'USD' }}
                            = {{ prod?.subtotal | currency: 'USD' }}
                          </span>
                        </div>
                      </div>
                    }
                  </div>
                } @else if (clave.toString() === 'total') {
                  <div class="mt-1 rounded-md bg-gray-50 p-2 text-gray-900">
                    {{ verDatos()[clave] | currency: 'USD' }}
                  </div>
                } @else {
                  <div class="mt-1 rounded-md bg-gray-50 p-2 text-gray-700">
                    {{ verDatos()[clave] ?? 'Informacion no registrada' }}
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </dialog>
    @if (titulo() === 'venta') {
      <app-bill
        [(mostrarModal)]="mostrarPDF"
        [verVenta]="ventaAsignada()"
        [datosCliente]="datosCliente()"
      />
    }
  `,
})
export class ModalComponent {
  public verDatos = input<any>();
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public titulo = input.required<TituloForms>();
  public acciones = input.required<Actions>();

  public ventaAsignada = model<any>({});
  public datosCliente = model<any>({});
  public mostrarPDF = model<boolean>(false);

  public inputs: Record<TituloForms, Record<string, string[]>> = {
    usuario: {
      claves: [
        'nombre',
        'apellido',
        'imagen',
        'email',
        'genero',
        'telefono',
        'direccion',
        'cedula',
        'fecha_nacimiento',
        'createdAt',
        'updatedAt',
      ],
      nombres: [
        'Nombre',
        'Apellido',
        'Imagen',
        'Correo Electrónico',
        'Género',
        'Teléfono',
        'Dirección',
        'Cédula',
        'Fecha de Nacimiento',
        'Fecha de Registro',
        'Última Actualización',
      ],
    },
    venta: {
      claves: [
        'cliente',
        'productos',
        'total',
        'fecha_venta',
        'estado',
        'updatedAt',
      ],
      nombres: [
        'Cliente',
        'Productos',
        'Total',
        'Fecha de Venta',
        'Estado de entrega',
        'Última Actualización',
      ],
    },
  };

  public clavesCampos = computed(() => this.inputs[this.titulo()]['claves']);

  public close() {
    this.mostrarModal.set(false);
  }

  constructor() {
    effect(() => {
      const dialog = this.modal()?.nativeElement;
      if (this.mostrarModal()) {
        dialog?.showModal?.();
      } else {
        dialog?.close?.();
      }
    });
  }
  public nombreCliente(usuario: any): string {
    return `${usuario?.nombre} ${usuario?.apellido}`;
  }
  public producto(producto: any): number {
    return producto.length;
  }

  public transformaFecha(fecha: string): string {
    return transformaFecha(fecha);
  }

  public obtenerDescripcionProductoPersonalizado(ingredientes: any[]): string {
    return `Ingredientes utilizados: ${ingredientes
      .map(({ nombre }) => nombre)
      .join(', ')}`;
  }

  public verPDF() {
    const { cliente, ...venta } = this.verDatos();
    this.ventaAsignada.set(venta);
    this.datosCliente.set(cliente);
    this.mostrarPDF.set(true);
  }
}
