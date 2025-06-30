import { TitleCasePipe } from '@angular/common';
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
export type TituloForms = 'usuario' | 'venta';
export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';
@Component({
  selector: 'modal',
  imports: [TitleCasePipe],
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
          class="text-gray-500 transition-colors hover:text-gray-700 focus:outline-none cursor-pointer"
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
        <div class="mb-6 flex justify-center">
          <!-- Contenedor de imagen si existe -->
          @if (verDatos()['imagen']) {
            <img
              class="h-40 w-40 rounded-full border-4 border-gray-100 object-cover shadow-sm"
              [src]="verDatos()['imagen']"
              alt="Imagen de perfil"
            />
          } @else if (verDatos()['genero'] === 'Femenino') {
            <img
              class="h-40 w-40 rounded-full border-4 border-gray-100 object-cover shadow-sm"
              src="perfilMujer.jpg"
              alt="Imagen de perfil"
            />
          } @else {
            <img
              class="h-40 w-40 rounded-full border-4 border-gray-100 object-cover shadow-sm"
              src="perfilHombre.jpg"
              alt="Imagen de perfil"
            />
          }
        </div>

        <!-- Grid de campos -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          @for (clave of clavesCampos(); track $index) {
            @if (clave.toString() !== 'imagen') {
              <div class="space-y-1">
                <label
                  class="block text-sm  text-gray-700 font-bold"
                  [for]="clave"
                >
                  {{ inputs[titulo()]['nombres'][$index] }}
                </label>

                @if (clave.toString() === 'cliente_id') {
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
                  <div class="space-y-3">
                    @for (prod of verDatos()[clave]; track $index) {
                      <div
                        class="rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <div class="flex items-start justify-between">
                          <h3 class="font-medium text-gray-900">
                            Cantidad: {{ prod?.cantidad }}
                          </h3>
                          <span class="text-sm font-semibold text-blue-600">
                            Subtotal: {{ prod?.subtotal }}$
                          </span>
                        </div>
                      </div>
                    }
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
  `,
})
export class ModalComponent {
  public verDatos = input<any>();
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public titulo = input.required<TituloForms>();
  public acciones = input.required<Actions>();

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
      claves: ['cliente_id', 'productos', 'total', 'fecha_venta'],
      nombres: [
        'Cliente',
        'Productos',
        'Total',
        'Fecha de Venta',
      ],
    },
  };

  public clavesCampos = computed(() => this.inputs[this.titulo()]['claves']);

  public close() {
    this.mostrarModal.set(false);
  }

  constructor() {
    effect(() => {
      console.log(this.verDatos().productos)
    })
    
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
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
}
