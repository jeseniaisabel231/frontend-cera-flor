import { Component, effect, input, linkedSignal, signal } from '@angular/core';
import { ColumnasUsuario, usuario } from '../../interfaces/usuario.interface';
import { ColumnasVenta, venta } from '../../interfaces/venta.interface';
import { transformaFecha } from '../../utils/transformaFecha';
import { SwitchComponent } from '../switch.component';
import { Actions, ModalComponent, TituloForms } from './modal.component';
import { ModalAvisosComponent } from './modalavisos.component';

export type DatosTabla = usuario | venta; //representacion de la clave

@Component({
  selector: 'tabla',
  imports: [ModalComponent, SwitchComponent, ModalAvisosComponent],
  template: `
    <table
      class="mt-6 w-full table-auto border-collapse overflow-hidden rounded-lg text-[14px] shadow-md"
    >
      <thead>
        <tr class="bg-[#c6bcff]">
          @for (nombre of columnasTabla()?.nombres; track $index) {
            <th class="text-center font-semibold text-gray-800">
              {{ nombre }}
            </th>
          }
          <th class="p-3 text-center font-semibold text-gray-800">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        @for (fila of datosTabla(); track $index) {
          <tr class="transition-colors duration-150 hover:bg-gray-50">
            @for (columna of columnasTabla()?.claves; track $index) {
              <td class="max-w-[150px] p-3 text-center">
                <div class="truncate whitespace-nowrap">
                  @if (columna.toString() === 'cliente_id') {
                    {{ nombreCliente(fila[columna]) }}
                  } @else if (columna.toString() === 'productos') {
                    {{ producto(fila[columna]) }}
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
                </div>
              </td>
            }

            <td class="p-3">
              <div class="flex items-center justify-center gap-3">
                <button
                  (click)="confirmarCambioEstado(fila)"
                  [title]="
                    verificarTipo(fila) === 'venta'
                      ? 'pendiente o finalizado'
                      : 'activo o inactivo'
                  "
                >
                  <switch [estado]="verificarEstado(fila)"></switch>
                </button>

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
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>

    <app-modal
      titulo="Confirmación de acción"
      [(mostrarModal)]="mostrarModalDesicion"
      (decision)="almacenarDesicion($event)"
      tipo="decidir"
      [mensaje]="mensajeEstado()"
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
  public itemPorCambiar = signal<DatosTabla>({} as DatosTabla); //para almacenar el item que se va a cambiar
  public datosTabla = input<any[]>();
  public mensajeEstado = signal<string>('');

  public datosMostrar = linkedSignal<DatosTabla>(
    () => this.datosTabla()?.[0] ?? ({} as DatosTabla),
  ); //input es tipo DatosTabla

  public servicio = input<any>();
  public columnasTabla = input<ColumnasUsuario | ColumnasVenta>();

  public acciones = signal<Actions>('Visualizar');

  public mostrarModalDesicion = signal(false);
  constructor() {
    effect(() => {
      if (this.decision()) {
        this.cambiarEstado();
        this.decision.set(false);
      }
    });
  }

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
  verificarTipo(item: any): string {
    if (item.estado === 'activo' || item.estado === 'inactivo') {
      return 'cliente';
    } else {
      return 'venta';
    }
  }

  transformaFecha(fecha: string): string {
    return transformaFecha(fecha);
  }

  almacenarDesicion(decision: boolean) {
    this.decision.set(decision);
  }

  cambiarEstado() {
    const item = this.itemPorCambiar();
    const estado = this.verificarEstado(item);
    const esVenta = this.verificarTipo(item) === 'venta';

    if (esVenta) {
      this.servicio()
        .editar(item._id, estado ? 'pendiente' : 'finalizado')
        .subscribe({});
      return;
    }
    if (estado) {
      this.servicio().eliminarEstado(item._id).subscribe();
    } else {
      this.servicio().activarEstado(item._id).subscribe();
    }
  }

  public confirmarCambioEstado(item: any) {
    const estado = this.verificarEstado(item);
    const esVenta = this.verificarTipo(item) === 'venta';
    if (esVenta) {
      this.mensajeEstado.set(
        estado
          ? '¿Está seguro de que desea finalizar la venta?'
          : '¿Está seguro de que desea reactivar la venta?',
      );
    } else {
      this.mensajeEstado.set(
        estado
          ? `¿Está seguro de que desea inactivar al cliente ${item.nombre} ${item.apellido}?`
          : `¿Está seguro de que desea activar al cliente ${item.nombre} ${item.apellido}?`,
      );
    }
    this.mostrarModalDesicion.set(true);
    this.itemPorCambiar.set(item);
  }
}
