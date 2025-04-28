import { TitleCasePipe } from '@angular/common';
import { Component, input, model, output, signal } from '@angular/core';
import { usuario } from '../../interfaces/usuario.interface';
import {  venta } from '../../interfaces/venta.interface';
import { promocion } from '../../interfaces/promocion.interface';
import { producto } from '../../interfaces/producto.interface';
import { FormGroup } from '@angular/forms';
import { Actions } from './formproduct.component';


export type DatosTabla = usuario | venta  | promocion | producto; //representacion de la clave

@Component({
  selector: 'tabla',
  imports: [TitleCasePipe],
  template: `
    <table
      class="text-[14px] mt-6 table-auto border-collapse border-y-[2px] border-[#d5d6d6] w-full"
    >
      <thead>
        <tr class="border-y-[2px] border-[#dff1fb] bg-[#dff1fb]">
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
            {{ fila[columna] }}
          </td>
          }

          <td class="whitespace-nowrap flex justify-center p-1">
            <button
              class="flex items-center justify-center w-[36px] h-[21px] bg-[#4ab763] rounded-[8px] mr-[3px]"
              (click)="verFormulario(fila)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="none"
              >
                <path
                  d="M6.5 0A6.507 6.507 0 0 0 0 6.5C0 10.084 2.916 13 6.5 13S13 10.084 13 6.5 10.084 0 6.5 0Zm0 2.665a.845.845 0 1 1 0 1.69.845.845 0 0 1 0-1.69Zm1.56 7.345H5.2a.52.52 0 0 1 0-1.04h.91V6.11h-.52a.52.52 0 0 1 0-1.04h1.04a.52.52 0 0 1 .52.52v3.38h.91a.52.52 0 0 1 0 1.04Z"
                  fill="#3B3D3E"
                />
              </svg>
            </button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
})
export class TablaComponent {
  public mostrarModal = signal<boolean>(false);
  public desabilitado = signal<boolean>(false);
  public idAcciones = signal<number>(1);

  //variable para ver los cambios de la tabla
  public cambioEliminar = output<number>();

  //datos que van a llegar a la tabla
  public datosTabla = model<DatosTabla[]>(); //input es tipo DatosTabla

  public datosAlmacenados = input<FormGroup>();

  public servicioEliminar = input<any>();

  public acciones = signal<Actions>('Actualizar');
  public columnas = computed(
    () => Object.keys(this.datosTabla()?.[0] ?? []) as (keyof DatosTabla)[]
  );

  //visualizado
  public verFormulario(datos: DatosTabla) {
    this.mostrarModal.set(true);
    this.desabilitado.set(true);
    this.acciones.set('Visualizar'); //se utiliza .set cuando se modifica el valor
    this.datosAlmacenados()?.patchValue(datos);
  }
}
function computed(arg0: () => (keyof DatosTabla)[]) {
  throw new Error('Function not implemented.');
}

