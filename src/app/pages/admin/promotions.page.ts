import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PromocionesService } from '../../../services/admin/promociones.service';
import { FormProm } from '../../components/admin/formprom.component';
import { Actions } from '../../components/admin/modal.component';
import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
import { Presentation } from '../../components/admin/presentation.component';
import { Loading } from '../../components/loading.component';
import { Navegacion } from '../../components/navegacion.component';
import { promocion } from '../../interfaces/promocion.interface';
import { transformaFecha } from '../../utils/transformaFecha';
@Component({
  imports: [
    Navegacion,
    Presentation,
    Loading,
    FormProm,
    FormsModule,
    ModalAvisosComponent,
    TitleCasePipe,
  ],
  template: `
    <div class="flex min-h-dvh w-full bg-[#efecff]">
      <navegacion></navegacion>
      <div
        class="grid w-full grid-cols-5 grid-rows-4 gap-4 border-l border-[#d0c9fe] p-6"
      >
        <presentation titulo="Promociones" class="col-span-5"></presentation>

        <div
          class="col-span-5 col-start-1 row-span-3 row-start-2 w-full overflow-auto rounded-[18px] bg-white px-10 py-6 shadow-md"
        >
          <div class="flex justify-between">
            <div class="flex flex-col">
              <div
                class="flex w-full rounded-[18px] border border-[#eaeaea] bg-[#F3F5F7] p-2 sm:w-80 sm:flex-row sm:items-center"
              >
                <svg
                  class="text-[#3B3D3E]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                >
                  <path
                    d="M16.2188 15.7188L11.6142 10.8711C12.3563 9.79771 12.7554 8.50407 12.7542 7.17656C12.7542 3.70195 10.0686 0.875 6.76773 0.875C3.46686 0.875 0.78125 3.70195 0.78125 7.17656C0.78125 10.6512 3.46686 13.4781 6.76773 13.4781C8.02886 13.4794 9.25782 13.0592 10.2775 12.2781L14.8828 17.125L16.2188 15.7188ZM6.76773 11.4879C5.95756 11.488 5.16557 11.2351 4.49191 10.7614C3.81824 10.2877 3.29317 9.61425 2.9831 8.82638C2.67303 8.0385 2.59188 7.17152 2.74992 6.33509C2.90796 5.49866 3.29808 4.73035 3.87096 4.12733C4.44384 3.5243 5.17373 3.11364 5.96834 2.94728C6.76294 2.78093 7.58657 2.86635 8.33506 3.19274C9.08354 3.51913 9.72327 4.07183 10.1733 4.78095C10.6234 5.49007 10.8636 6.32375 10.8635 7.17656C10.8622 8.31959 10.4303 9.41541 9.66247 10.2236C8.89464 11.0319 7.85361 11.4865 6.76773 11.4879Z"
                    fill="#3B3D3E"
                  />
                </svg>
                <input
                  [(ngModel)]="servicePromociones.busqueda"
                  class="flex-1 bg-transparent pl-2 text-[14px] font-normal text-[#3B3D3E] outline-none placeholder-gray-400"
                  type="search"
                  placeholder="Buscar promociones por nombre..."
                  id="search"
                  name="search"
                />
              </div>
             
            </div>
            <button
              class="flex h-[40px] items-center gap-3 rounded-[10px] bg-[#41D9B5] px-4"
              (click)="registrarPromociones()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m3.692 8.615H8.615v3.077h-1.23V8.615H4.308v-1.23h3.077V4.308h1.23v3.077h3.077z"
                  fill="#3C3C3B"
                />
              </svg>
              Añadir promoción
            </button>
          </div>
          <formprom
            [(mostrarModal)]="mostrarModal"
            [acciones]="accionAsignada()"
            [servicioPromocion]="servicePromociones"
            [mostrarDatos]="enviarDatos()"
            [idRegistro]="idRegistro()"
          ></formprom>
          @if (servicePromociones.carga()) {
            <loading></loading>
          } @else {
            <div
              class="grid h-[380px] grid-cols-1 gap-6 overflow-y-auto pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              @for (item of servicePromociones.datosBuscados(); track $index) {
                <div
                  class="flex h-90 flex-col rounded-xl border border-gray-300"
                >
                  <div
                    class="flex aspect-video h-56 justify-center border-b-1 border-gray-300"
                  >
                    <img
                      [src]="item?.imagen"
                      alt=""
                      class="rounded-t-xl object-contain"
                    />
                  </div>
                  <div class="flex flex-col justify-between p-4">
                    <h2 class="font-semibold">
                      {{ item?.nombre | titlecase }}
                    </h2>

                    <span>Promocion creada el: {{ transformaFecha(item.createdAt) }}</span>
                  </div>
                  <div class="flex items-center justify-center gap-2 px-4">
                    <button
                      class="h-10 w-auto rounded-2xl bg-indigo-400 px-4 text-white hover:bg-indigo-500"
                      (click)="editarPromociones(item)"
                      title="Editar promoción"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6"
                      >
                        <path
                          d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712m-2.218 5.93-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32z"
                        />
                        <path
                          d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5z"
                        />
                      </svg>
                    </button>
                    <button
                      class="h-10 rounded-2xl bg-red-400 px-4 text-white hover:bg-red-500"
                      title="Eliminar promoción"
                      (click)="eliminarPromociones(item._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a49 49 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A49 49 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a53 53 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951m-6.136-1.452a51 51 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a50 50 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452m-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              } @empty {
                <div class="col-span-4 mt-6 flex justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                  >
                    <g fill="#292929">
                      <path
                        d="M8 9a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2zm7 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2zm-6 6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
                        clip-rule="evenodd"
                      />
                    </g>
                  </svg>
                  <p class="text-center">No se encontraron registros</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
    <app-modal
      [(mostrarModal)]="mostrarModalConfirmacion"
      [titulo]="'Confirmar eliminación'"
      [mensaje]="'¿Estás seguro de eliminar esta promoción?'"
      [tipo]="'confirmacion'"
      (confirmar)="confirmarEliminacion()"
    ></app-modal>
  `,
})
export class PromotionsPage {
  //variable que almacena el id de productos
  public idRegistro = signal<string>('');
  public mostrarModal = signal<boolean>(false);
  public servicePromociones = inject(PromocionesService);
  public mostrarModalConfirmacion = signal<boolean>(false);
  public promocionAEliminar = signal<string | null>(null);

  //variable para setear los datos en el formulario
  public enviarDatos = signal<promocion | null>(null);
  public accionAsignada = signal<Actions>('Registrar'); //valor inicial registrar

  //mettodo para visualizar promociones
  public visualizarPromociones(datos: promocion) {
    this.enviarDatos.set(datos);
    this.mostrarModal.set(true);
    this.accionAsignada.set('Visualizar'); //cambia el valor de la accion asignada al formulario
  }

  // Metodo para editar promociones
  public editarPromociones(datos: promocion) {
    this.enviarDatos.set(datos);
    this.idRegistro.set(datos._id); // Establece el ID del promocion a editar
    this.mostrarModal.set(true);
    this.accionAsignada.set('Actualizar'); // Cambia a modo edición
  }
  public registrarPromociones() {
    this.enviarDatos.set(null); // Limpia los datos del formulario
    this.idRegistro.set(''); // Limpia el ID del registro
    this.mostrarModal.set(true);
    this.accionAsignada.set('Registrar'); // Cambia a modo registro
  }

  //metodo para eliminar un promocion cuando doy click al boton
  public eliminarPromociones(id: string) {
    //this.servicePromociones.eliminar(id).subscribe();
    this.promocionAEliminar.set(id);
    this.mostrarModalConfirmacion.set(true);
  }
  public confirmarEliminacion() {
    const id = this.promocionAEliminar();
    if (id) {
      this.servicePromociones.eliminar(id).subscribe();
    }
  }

  public transformaFecha(fecha: string): string {
    return transformaFecha(fecha);
  }

}
