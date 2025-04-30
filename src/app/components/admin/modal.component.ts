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
      class="m-auto bg-white backdrop:bg-gris-600/25 backdrop:backdrop-blur-[2px] rounded-[10px] text-[#3C3C3B]"
    >
      <div class="flex  items-center py-5 justify-between px-7">
        <h1 class="text-[20px] text-black font-medium">
          {{ acciones() }} {{ titulo() | titlecase }}
        </h1>
        <button (click)="close()" class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewid_Box="0 0 512 512"
          >
            <path
              fill="#3C3C3B"
              d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"
            />
          </svg>
        </button>
      </div>

      <div
        class="grid grid-cols-2 gap-x-4 text-[17px] py-4  font-normal px-7 gap-y-3"
      >
        @for (item of obtenerDatos(); track $index) {
        <label [for]="item">{{ item | titlecase }}</label>

        @if(item.toString() === 'cliente_id'){
        {{ nombreCliente(verDatos()[item]) }}
        }@else if(item.toString() === 'productos') { @for (item of
        productos(verDatos()[item]); track $index) {
        <div class="flex flex-col gap-2">
          <span>
            Nombre del producto:
            {{ item.nombre }}
          </span>
          <span>
            Descripcion:
            {{ item.descripcion }}
          </span>
          <span>
            Precio:
            {{ item.precio }}$
          </span>
        </div>
        } }@else{
        {{ verDatos()?.value ? verDatos()?.value[item] : verDatos()[item] }}

        } }
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

  public inputs: Record<TituloForms, Record<string, string>> = {
    usuario: {
      //claves
      //valor
      nombre: 'text',
      apellido: 'text',
      cedula: 'number',
      fecha_nacimiento: 'date',
      ciudad: 'text',
      direccion: 'text',
      telefono: 'number',
      email: 'email',
    },
    promocion: {
      nombre: 'text',
      descripcion: 'text',
      codigo: 'text',
      creditos: 'number',
    },
    venta: {
      cliente_id: 'text',
      productos: 'text',
      total: 'number',
      fecha_venta: 'number',
    },
  };

  //variable que obtenga las claves de los 'inputs'
  public obtenerDatos = computed(() => Object.keys(this.inputs[this.titulo()]));

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
    return productos.map((item: any) => item.producto_id);
  }
}
