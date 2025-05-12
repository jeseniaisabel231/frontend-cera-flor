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
import { FormGroup } from '@angular/forms';

export type TituloForms = 'usuario' | 'venta' | 'promocion';
export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';
@Component({
  selector: 'modal',
  imports: [TitleCasePipe],
  template: `
    <dialog
      #modal
      class="m-auto bg-white backdrop:bg-gray-600/25 backdrop:backdrop-blur-[2px] rounded-lg text-gray-800 max-w-3xl w-full shadow-xl"
    >
      <!-- Encabezado del modal -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ acciones() }} {{ titulo() | titlecase }}
        </h1>
        <button 
          (click)="close()" 
          class="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
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
        <!-- Contenedor de imagen si existe -->
        @if (verDatos()['imagen']) {
          <div class="flex justify-center mb-6">
            <img
              class="w-40 h-40 rounded-full object-cover border-4 border-gray-100 shadow-sm"
              [src]="verDatos()['imagen']"
              alt="Imagen de perfil"
            />
          </div>
        }

        <!-- Grid de campos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (item of clavesCampos(); track $index) {
            @if(item.toString() !== 'imagen') {
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700" [for]="item">
                  {{ item | titlecase }}
                </label>
                
                @if(item.toString() === 'cliente_id' ){
                  <div class="mt-1 text-gray-900 p-2 bg-gray-50 rounded-md">
                    {{ nombreCliente(verDatos()[item]) }}
                  </div>
                }
                @else if(item.toString() === 'productos') { 
                  <div class="space-y-3">
                    @for (prod of productos(verDatos()[item]); track $index) {
                      <div class="p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <div class="flex justify-between items-start">
                          <h3 class="font-medium text-gray-900">{{ prod?.nombre }}</h3>
                          <span class="text-sm font-semibold text-blue-600">{{ prod?.precio }}$</span>
                        </div>
                        @if(prod?.descripcion) {
                          <p class="mt-1 text-sm text-gray-600">{{ prod?.descripcion }}</p>
                        }
                      </div>
                    } 
                  </div>
                }
                @else {
                  <div class="mt-1 text-gray-900 p-2 bg-gray-50 rounded-md">
                    {{ verDatos()?.value ? verDatos()?.value[item] : verDatos()[item] }}
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
  public verDatos = input<any>(); //devuelve un objeto con los datos del formulario
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public titulo = input.required<TituloForms>();
  public acciones = input.required<Actions>();

  public inputs: Record<TituloForms, string[]> = {
    //nombras van igual que los del backend
    usuario: [
      'nombre',
      'apellido',
      'imagen',
      'email',
      'genero',
    ],
    promocion: [
      'nombre',
      'descripcion',
      'fecha de inicio',///pendienteee
      'fecha de fin',
    ],
    venta: [
      'cliente_id',
      'productos',
      'total',
      'fecha_venta',
    ],
  };

  //variable que obtenga las claves de los 'inputs'
  //ingresa al input y verifica el titulo y devuelve el array de inputs
  public clavesCampos = computed(() => this.inputs[this.titulo()]);

  //esta funcion se encarga de cerrar el modal
  public close() {
    this.mostrarModal.set(false);
  }

  constructor() {
    effect(() => {
      console.log(this.verDatos());
      console.log(
        `Acción: ${this.acciones()} - Título: ${this.acciones()} ${this.titulo()}`
      );

      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
  public nombreCliente(usuario: any): string {
    return `${usuario.nombre} ${usuario.apellido}`;
  }
  public producto(producto: any): number {
    return producto.length;
  }
  public productos(productos: any): any[] {
    console.log(productos);
    return productos.map((item: any) => item.producto_id);
  }
}
