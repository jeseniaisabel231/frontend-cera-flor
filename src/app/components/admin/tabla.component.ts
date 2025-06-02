import { TitleCasePipe } from '@angular/common';
import {
  Component,
  input,
  model,
  output,
  signal,
  computed,
  linkedSignal,
} from '@angular/core';
import { usuario } from '../../interfaces/usuario.interface';
import { venta } from '../../interfaces/venta.interface';
import { promocion } from '../../interfaces/promocion.interface';
import { FormGroup } from '@angular/forms';
import { Actions, ModalComponent, TituloForms } from './modal.component';
import { SwitchComponent } from '../switch.component';
import { transformaFecha } from '../../utils/transformaFecha';

export type DatosTabla = usuario | venta | promocion; //representacion de la clave

@Component({
  selector: 'tabla',
  imports: [TitleCasePipe, ModalComponent, SwitchComponent],
  template: `
    <table
      class="text-[14px] mt-6 table-auto border-collapse border-y-[2px] border-[#d5d6d6] w-full"
    >
      <thead>
        <tr class="border-y-[2px] border-[#c6bcff] bg-[#c6bcff]">
          @for (columna of columnas(); track $index) {
          <th class="py-2 p-1 text-center">{{ columna | titlecase }}</th>
          }
          <th class="py-2 text-center p-1">Acciones</th>
        </tr>
      </thead>
      <tbody>
        @for ( fila of datosTabla(); track $index) {

        <tr class="font-normal">
          @for(columna of columnas(); track $index) {

          <td
            class="max-w-[150px] truncate whitespace-nowrap overflow-hidden p-1 text-center"
          >
            @if(columna.toString() === 'cliente_id'){

            {{ nombreCliente(fila[columna]) }}
            }@else if(columna.toString() === 'productos'){

            {{ producto(fila[columna]) }}
            }@else if (columna.toString()==='imagen'){
            <img
              class="w-[30px] h-[30px] mx-auto rounded-full border border-gris-300"
              [src]="fila[columna] || '/sinFoto.jpg'"
              alt=""
            />
            } @else if( columna.toString() === 'estado') { @let esActivo =
            fila[columna] === 'activo' || fila[columna] === 'finalizado';

            <div
              class="border rounded-full font-bold"
              [class]="
                esActivo
                  ? 'border-[#4ab763] text-[#4ab763]'
                  : 'border-[#f44336] text-[#f44336]'
              "
            >
              <span>{{ fila[columna] }}</span>
            </div>
            }@else if(columna.toString() === 'fecha_venta'){
              {{ transformaFecha(fila[columna]) }}
            }
            
            @else{
            {{ fila[columna] }}

            }
          </td>
          }

          <td class="whitespace-nowrap flex justify-center p-1 gap-2">
            <switch
              [estado]="verificarEstado(fila)"
              [servicio]="servicio()"
              [verificarTipo]="verificarTipo(fila)"
              [id]="fila._id"
            ></switch>

            <button
              class="bg-green-400 text-white px-2 rounded-[9px] hover:bg-green-500   flex items-center justify-center w-[36px] h-6 brounded-[8px] mr-[3px]"
              (click)="verFormulario(fila)"
              title="Visualizar información"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34zM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </td>
        </tr>
        }
      </tbody>
    </table>

    <modal
      [(mostrarModal)]="mostrarModal"
      [titulo]="titulo()"
      [verDatos]="datosMostrar()"
      [acciones]="acciones()"
    ></modal>
  `,
})
export class TablaComponent {
  public mostrarModal = signal<boolean>(false);
  public titulo = input.required<TituloForms>();

  //datos que van a llegar a la tabla
  public datosTabla = input<DatosTabla[]>(); //input es tipo DatosTabla

  public datosMostrar = linkedSignal<DatosTabla>(
    () => this.datosTabla()?.[0] ?? ({} as DatosTabla)
  ); //input es tipo DatosTabla

  public servicio = input<any>();

  public acciones = signal<Actions>('Visualizar');

  public columnasMostrar = input<(keyof DatosTabla)[]>();

  // En TablaComponent
  public columnas = computed(() => {
    const todasLasColumnas = Object.keys(
      this.datosTabla()?.[0] ?? []
    ) as (keyof DatosTabla)[];
    // Excluir las columnas que no quieres mostrar
    return todasLasColumnas.filter(
      (columna) =>
        ![
          'telefono',
          'cedula',
          'direccion',
          'fecha_nacimiento',
          'imagen_id',
          '__v',
          '_id',
          'confirmEmail',
          'createdAt',
          'updatedAt',
        ].includes(columna)
    );
  });

  //visualizado
  public verFormulario(datos: DatosTabla) {
    this.datosMostrar.set(datos);
    this.mostrarModal.set(true);
    this.acciones.set('Visualizar'); //se utiliza .set cuando se modifica el valor
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
  public eliminarUsuario(id: string) {
    this.servicio()
      .eliminarEstado(id)
      .subscribe({
        next: () => {},
        error: (error: any) => {
          console.error('Error al eliminar el usuario:', error);
        },
      });
  }
  public activarUsuario(id: string) {
    this.servicio()
      .activarEstado(id)
      .subscribe({
        next: () => {},
        error: (error: any) => {
          console.error('Error al activar el usuario:', error);
        },
      });
  }
  //metodo para verificar el estado
  public verificarEstado(item: any): boolean {
    return item.estado === 'activo' || item.estado === 'finalizado';
  }
  public actualizarElemento(datos: DatosTabla) {
    this.datosMostrar.set(datos);
    this.mostrarModal.set(true);
    this.acciones.set('Actualizar');
  }
  //metodo para comprobar si es un cliente o venta
  public verificarTipo(item: any): string {
    if (item.estado === 'activo' || item.estado === 'inactivo') {
      return 'cliente';
    } else {
      return 'venta';
    }
  }
  public transformaFecha(fecha: string): string {
    return transformaFecha(fecha);
  }
}
