import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { promocion } from '../../interfaces/promocion.interface';
import { usuario } from '../../interfaces/usuario.interface';
import { venta } from '../../interfaces/venta.interface';
import { transformaFecha } from '../../utils/transformaFecha';
import { SwitchComponent } from '../switch.component';
import { Actions, ModalComponent, TituloForms } from './modal.component';
import { ModalAvisosComponent } from './modalavisos.component';

export type DatosTabla = usuario | venta | promocion; //representacion de la clave

@Component({
  selector: 'tabla',
  imports: [
    TitleCasePipe,
    ModalComponent,
    SwitchComponent,
    ModalAvisosComponent,
  ],
  template: `
    <table
      class="mt-6 w-full table-auto border-collapse border-y-[2px] border-[#d5d6d6] text-[14px]"
    >
      <thead>
        <tr class="border-y-[2px] border-[#c6bcff] bg-[#c6bcff]">
          @for (columna of columnas(); track $index) {
            <th class="p-1 py-2 text-center">{{ columna | titlecase }}</th>
          }
          <th class="p-1 py-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        @for (fila of datosTabla(); track $index) {
          <tr class="font-normal">
            @for (columna of columnas(); track $index) {
              <td
                class="max-w-[150px] truncate overflow-hidden p-1 text-center whitespace-nowrap"
              >
                @if (columna.toString() === 'cliente_id') {
                  {{ nombreCliente(fila[columna]) }}
                } @else if (columna.toString() === 'productos') {
                  {{ producto(fila[columna]) }}
                } @else if (columna.toString() === 'imagen') {
                  <img
                    class="border-gris-300 mx-auto h-[30px] w-[30px] rounded-full border"
                    [src]="fila[columna] || '/sinFoto.jpg'"
                    alt=""
                  />
                } @else if (columna.toString() === 'estado') {
                  @let esActivo =
                    fila[columna] === 'activo' ||
                    fila[columna] === 'finalizado';

                  <div
                    class="rounded-full border font-bold"
                    [class]="
                      esActivo
                        ? 'border-[#4ab763] text-[#4ab763]'
                        : 'border-[#f44336] text-[#f44336]'
                    "
                  >
                    <span>{{ fila[columna] }}</span>
                  </div>
                } @else if (columna.toString() === 'fecha_venta') {
                  {{ transformaFecha(fila[columna]) }}
                } @else {
                  {{ fila[columna] }}
                }
              </td>
            }

            <td class="flex justify-center gap-2 p-1 whitespace-nowrap">
              <switch
                [estado]="verificarEstado(fila)"
                [servicio]="servicio()"
                [verificarTipo]="verificarTipo(fila)"
                [id]="fila._id"
                (emitirCambio)="recibirCambio($event)"
                [(decision)]="decision"
                [idPorCambiar]="idPorCambiar()"
              ></switch>

              <button
                class="brounded-[8px] mr-[3px] flex h-6 w-[36px] items-center justify-center rounded-[9px] bg-green-400 px-2 text-white hover:bg-green-500"
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

    <app-modal
      [(mostrarModal)]="mostrarModalDesicion"
      (decision)="almacenarDesicion($event)"
      tipo="decidir"
    ></app-modal>

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
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public decision = signal<boolean>(false);
  public idPorCambiar = signal<string>('');

  //datos que van a llegar a la tabla
  public datosTabla = input<DatosTabla[]>(); //input es tipo DatosTabla

  public datosMostrar = linkedSignal<DatosTabla>(
    () => this.datosTabla()?.[0] ?? ({} as DatosTabla),
  ); //input es tipo DatosTabla

  public servicio = input<any>();

  public acciones = signal<Actions>('Visualizar');

  public columnasMostrar = input<(keyof DatosTabla)[]>();
  public mostrarModalDesicion = signal(false);

  // En TablaComponent
  public columnas = computed(() => {
    const todasLasColumnas = Object.keys(
      this.datosTabla()?.[0] ?? [],
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
        ].includes(columna),
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

  public recibirCambio(id: string) {
    this.idPorCambiar.set(id);
    this.mostrarModalDesicion.set(true);
  }

  public almacenarDesicion(decision: boolean) {
    this.decision.set(decision);
  }
}
