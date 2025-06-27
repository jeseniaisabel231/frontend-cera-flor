import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { VentasService } from '../../../services/admin/ventas.service';
import { Presentation } from '../../components/admin/presentation.component';
import { TablaComponent } from '../../components/admin/tabla.component';
import { Loading } from '../../components/loading.component';
import { Navegacion } from '../../components/navegacion.component';
import { ColumnasVenta } from '../../interfaces/venta.interface';
@Component({
  imports: [Navegacion, Presentation, Loading, TablaComponent, FormsModule],
  template: `
    <div class="flex min-h-dvh w-full bg-[#efecff]">
      <navegacion></navegacion>
      <div
        class="grid w-full grid-cols-5 grid-rows-4 gap-4 border-l border-[#d0c9fe] p-6"
      >
        <presentation titulo="Ventas" class="col-span-5"></presentation>

        <article
          class="col-span-5 col-start-1 row-span-3 row-start-2 w-full overflow-auto rounded-[18px] bg-white px-10 py-6 shadow-md"
        >
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
                class="flex-1 bg-transparent pl-2 text-[14px] font-normal text-[#3B3D3E] outline-none placeholder-gray-400"
                type="search"
                placeholder="Buscar ventas por cliente..."
                id="search"
                name="search"
                [(ngModel)]="serviceVentas.busqueda"
              />
            </div>
            <div class="mt-4 flex items-center gap-2">
              <span
                class="flex items-center gap-2 font-semibold text-[#3B3D3E]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                  />
                </svg>
                Filtrar por:
              </span>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  !serviceVentas.filtro() ? 'bg-[#806bff] text-white' : 'text-[#3B3D3E]'
                "
                (click)="serviceVentas.filtro.set('')"
              >
                <span>Todos</span>
              </button>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  serviceVentas.filtro() === 'finalizado'
                    ? 'bg-[#806bff] text-white'
                    : 'text-[#3B3D3E]'
                "
                (click)="serviceVentas.filtro.set('finalizado')"
              >
                <span>Finalizado</span>
              </button>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  serviceVentas.filtro() === 'pendiente'
                    ? 'bg-[#806bff] text-white'
                    : 'text-[#3B3D3E]'
                "
                (click)="serviceVentas.filtro.set('pendiente')"
              >
                <span>Pendiente</span>
              </button>
            </div>
          </div>
          @if (serviceVentas.carga()) {
            <loading></loading>
          } @else if (serviceVentas.datosBuscados().length > 0) {
            <div class="overflo-y-auto">
              <tabla
                [datosTabla]="serviceVentas.datosBuscados()"
                [columnasTabla]="columnasTabla"
                titulo="venta"
                acciones="Visualizar"
                [servicio]="serviceVentas"
              ></tabla>
            </div>
          } @else {
            <div class="mt-6 flex items-center justify-center gap-2">
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
        </article>
      </div>
    </div>
  `,
})
export class ShoppingPage {
  public serviceVentas = inject(VentasService);

  //variable que almacena lo que traera del backend
  public columnasTabla: ColumnasVenta = {
    claves: ['cliente_id', 'productos', 'total', 'fecha_venta', 'estado'],
    nombres: [
      'Cliente',
      'Productos',
      'Total',
      'Fecha de Venta',
      'Estado de Entrega',
    ],
  };
}
