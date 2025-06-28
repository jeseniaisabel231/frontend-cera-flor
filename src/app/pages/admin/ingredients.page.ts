import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Actions } from '../../components/admin/modal.component';
import { Presentation } from '../../components/admin/presentation.component';
import { Loading } from '../../components/loading.component';
import { Navegacion } from '../../components/navegacion.component';

import { TitleCasePipe } from '@angular/common';
import { IngredientesService } from '../../../services/admin/ingredients.service';
import { CategoryService } from '../../../services/categorias.service';
import { FormIngredientsComponent } from '../../components/admin/formIngredients.component';
import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
import { categorias } from '../../interfaces/categoria.interface';
import { ingrediente } from '../../interfaces/ingrediente.interface';

@Component({
  imports: [
    Navegacion,
    Presentation,
    FormsModule,
    ModalAvisosComponent,
    FormIngredientsComponent,
    Loading,
    TitleCasePipe,
  ],
  template: `
    <main class="flex w-full bg-[#efecff]">
      <navegacion></navegacion>

      <section
        class="grid w-full grid-cols-1 gap-4 border-l border-[#d0c9fe] p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
      >
        <presentation titulo="Ingredientes" class="col-span-5"></presentation>

        <article
          class="relative col-span-5 col-start-1 row-span-3 row-start-2 w-full overflow-auto rounded-[18px] bg-white px-10 py-6 shadow-md"
        >
          <div class="mb-4 flex flex-col gap-4">
            <div class="flex w-full justify-between">
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
                  placeholder="Buscar ingredientes por nombre..."
                  id="search"
                  name="search"
                  [(ngModel)]="servicioIngredientes.busqueda"
                />
              </div>
              <button
                class="flex h-[40px] items-center gap-3 rounded-[10px] bg-[#41D9B5] px-4"
                (click)="verFormulario()"
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
                  Registrar ingrediente
              </button>
            </div>
            <div class="flex items-center gap-2">
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
                  !servicioIngredientes.filtro().valor
                    ? 'bg-[#806bff] font-semibold text-white'
                    : 'text-gray-700'
                "
                (click)="servicioIngredientes.filtro.set({ clave: 'tipo', valor: '' })"
              >
                <span>Todos</span>
              </button>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  servicioIngredientes.filtro().valor === 'molde'
                    ? 'bg-[#806bff] font-semibold text-white'
                    : 'text-gray-700'
                "
                (click)="servicioIngredientes.filtro.set({ clave: 'tipo', valor: 'molde' })"
              >
                <span>Moldes</span>
              </button>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  servicioIngredientes.filtro().valor === 'color'
                    ? 'bg-[#806bff] font-semibold text-white'
                    : 'text-gray-700'
                "
                (click)="servicioIngredientes.filtro.set({ clave: 'tipo', valor: 'color' })"
              >
                <span>Colores</span>
              </button>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  servicioIngredientes.filtro().valor === 'esencia'
                    ? 'bg-[#806bff] font-semibold text-white'
                    : 'text-gray-700'
                "
                (click)="servicioIngredientes.filtro.set({ clave: 'tipo', valor: 'esencia' })"
              >
                <span>Esencias</span>
              </button>
              <button
                class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                [class]="
                  servicioIngredientes.filtro().valor === 'aroma'
                    ? 'bg-[#806bff] font-semibold text-white'
                    : 'text-gray-700'
                "
                (click)="servicioIngredientes.filtro.set({ clave: 'tipo', valor: 'aroma' })"
              >
                <span>Aromas</span>
              </button>
              @for (categoria of categorias; track $index) {
                <button
                  class="relative inline-flex items-center rounded-[15px] border border-gray-300 px-4 py-2 text-[14px] hover:border-[#806bff]"
                  [class]="
                    servicioIngredientes.filtro().valor === categoria._id
                      ? 'bg-[#806bff] font-semibold text-white'
                      : 'text-gray-700'
                  "
                  (click)="servicioIngredientes.filtro.set({ clave: 'id_categoria', valor: categoria._id })"
                >
                  <span>{{ categoria.nombre }}</span>
                </button>
              }
            </div>
          </div>
          <form-ingredients
            [(mostrarModal)]="mostrarModal"
            [acciones]="accionAsignada()"
            [mostrarDatos]="enviarDatos()"
            [idRegistro]="idRegistro()"
          ></form-ingredients>

          @if (servicioIngredientes.carga()) {
            <loading></loading>
          } @else {
            <section
              class="grid h-[380px] grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              @for (item of servicioIngredientes.datosBuscados(); track $index) {
                <div
                  class="mx-auto flex h-90 min-h-[400px] w-full max-w-[300px] flex-col rounded-xl border border-gray-300"
                >
                  <figure
                    class="relative aspect-square overflow-hidden border-b border-gray-300 pt-[75%]"
                  >
                    <img
                      [src]="item?.imagen"
                      alt="{{ item?.nombre }}"
                      class="absolute top-0 left-0 h-full w-full rounded-t-md object-contain"
                    />
                  </figure>
                  <div class="flex flex-col justify-between p-4">
                    <div class="flex flex-wrap items-center gap-1">
                      <small
                        class="rounded-full bg-[#9ffedb] px-2 py-1 text-[11px] font-bold"
                      >
                        {{ getCategorias(item?.id_categoria) }}
                      </small>
                      <small
                        class="rounded-full bg-[#ccc3fb] px-2 py-1 text-[11px] font-bold"
                      >
                        {{ item?.tipo | titlecase }}
                      </small>
                    </div>
                    <h3 class="mt-2 text-[17px] font-bold text-gray-800">
                      {{ item?.nombre | titlecase }}
                    </h3>
                    <p class="text-lg font-bold text-purple-600">
                      $ {{ item?.precio }}
                    </p>
                    <p class="mt-1 flex items-center text-sm text-green-600">
                      <span
                        class="mr-2 h-2 w-2 rounded-full bg-green-500"
                      ></span>
                      {{ item?.stock }} ejemplares disponibles
                    </p>
                  </div>
                  <div class="flex items-center justify-center gap-2 px-4 pb-4">
                    <button
                      class="h-10 rounded-2xl bg-green-400 px-4 text-white hover:bg-green-500"
                      (click)="abrirFormulario(item)"
                      title="Visualizar ingrediente"
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
                    <button
                      class="h-10 w-auto rounded-2xl bg-indigo-400 px-4 text-white hover:bg-indigo-500"
                      (click)="editarIngrediente(item)"
                      title="Editar ingrediente"
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
                      (click)="eliminarIngrediente(item._id)"
                      title="Eliminar ingrediente"
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
            </section>
          }
        </article>
      </section>
    </main>
    <app-modal
      [(mostrarModal)]="mostrarModalConfirmacion"
      [titulo]="'Confirmar eliminación'"
      [mensaje]="'¿Estás seguro de eliminar este ingrediente?'"
      [tipo]="'confirmacion'"
      (confirmar)="confirmarEliminacion()"
    ></app-modal>
  `,
})
export class IngredientsPage {
  public idRegistro = signal<string>(''); //almacena el id del ingrediente a editar
  public mostrarModal = signal<boolean>(false);
  public servicioIngredientes = inject(IngredientesService);
  public serviceCategorias = inject(CategoryService);
  public categorias: categorias[] = []; //almacena las categorias
  public categoriasObject: Record<string, string> = {}; //almacena las categorias como un objeto
  public enviarDatos = signal<ingrediente | null>(null);
  public accionAsignada = signal<Actions>('Registrar'); //valor inicial registrar
  public mostrarModalConfirmacion = signal<boolean>(false);
  public ingredienteEliminar = signal<string | null>(null);


  public datosIngredientes = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    id_categoria: new FormControl('', [Validators.required]),
  });
  //funcion para abrir el formulario con los datos visualizar o editar
  public abrirFormulario(datos: ingrediente) {
    this.enviarDatos.set(datos);
    this.mostrarModal.set(true);
    this.accionAsignada.set('Visualizar'); //cambia el valor de la accion asignada al formulario
  }
  // Agrega estos métodos en tu ProductsPage
  public editarIngrediente(datos: ingrediente) {
    this.enviarDatos.set(datos);
    this.idRegistro.set(datos._id);
    this.mostrarModal.set(true);
    this.accionAsignada.set('Actualizar'); // Cambia a modo edición
  }
  //metodo para ver el formulario de registro
  public verFormulario() {
    this.enviarDatos.set(null);
    this.mostrarModal.set(true);
    this.accionAsignada.set('Registrar'); //cambia el valor de la accion asignada al formulario
  }

  //metodo para eliminar un ingrediente cuando doy click al boton
  public eliminarIngrediente(id: string) {
    //this.servicioIngredientes.eliminar(id).subscribe();
    this.ingredienteEliminar.set(id);
    this.mostrarModalConfirmacion.set(true);
  }

  public confirmarEliminacion() {
    const id = this.ingredienteEliminar();
    this.servicioIngredientes.eliminar(id!).subscribe();
  }

  constructor() {
    this.serviceCategorias.obtener().subscribe({
      next: (respuesta: any) => {
        this.categorias = respuesta.categorias;

        this.categorias.forEach(({ _id, nombre }) => {
          this.categoriasObject[_id] = nombre;
        });
      },
    });
  }

  public getCategorias(id: any): string {
    return this.categoriasObject[id] || 'Ambas Categorías';
  }
}
