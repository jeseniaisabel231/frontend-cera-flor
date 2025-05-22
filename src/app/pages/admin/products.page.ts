import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { Navegacion } from '../../components/navegacion.component';
import { FormProducto } from '../../components/admin/formproduct.component';
import { Presentation } from '../../components/admin/presentation.component';
import { Loading } from '../../components/loading.component';
import { ProductosService } from '../../../services/admin/productos.service';
import { producto } from '../../interfaces/producto.interface';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Actions } from '../../components/admin/modal.component';
import { ToastComponent } from '../../components/toast.component';
import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';

@Component({
  imports: [
    Navegacion,
    FormProducto,
    Presentation,
    Loading,
    FormsModule,
    ModalAvisosComponent,
  ],
  template: `
    <div class="bg-[#efecff] w-full flex min-h-dvh">
      <navegacion></navegacion>

      <div
        class="grid grid-cols-5 grid-rows-4 gap-4 p-6 w-full border-l border-[#d0c9fe]"
      >
        <presentation
          titulo="Productos y catálogo"
          class="col-span-5"
        ></presentation>

        <div
          class="overflow-auto w-full col-span-5 row-span-3 col-start-1 row-start-2 bg-white rounded-[18px]  py-6 px-10 shadow-md"
        >
          <div class="flex justify-between">
            <div
              class="flex sm:flex-row sm:items-center w-full sm:w-80 bg-[#F3F5F7] border border-[#eaeaea] rounded-[18px] p-2"
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
                class="flex-1 bg-transparent text-[14px] font-normal text-[#3B3D3E] outline-none pl-2"
                type="search"
                placeholder="Buscar por nombre"
                id="search"
                name="search"
                [(ngModel)]="busqueda"
              />
            </div>
            <button
              class="flex items-center gap-3 px-4 h-[40px] bg-[#41D9B5] rounded-[10px] "
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
              Añadir producto
            </button>
          </div>
          <formulario
            [(mostrarModal)]="mostrarModal"
            [acciones]="accionAsignada()"
            [servicioProductos]="serviceProductos"
            [mostrarDatos]="enviarDatos()"
            [idRegistro]="idRegistro()"
          ></formulario>

          <div class="flex gap-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-8 cursor-pointer"
              (click)="paginaAnterior()"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clip-rule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-8"
              (click)="siguientePagina()"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clip-rule="evenodd"
              
              />
            </svg>
          </div>
          <!--Lista de productos en cartas -->

          @if(carga()){
          <loading></loading>
          }@else {
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6"
          >
            @for( item of productos; track $index) {

            <div class="flexflex-col border border-gray-300 rounded-xl h-104">
              <div
                class="flex justify-center border-b-1 border-gray-300 h-56 w-60 "
              >
                <img
                  [src]="item?.imagen"
                  alt=""
                  class="object-cover h-full w-full rounded-t-xl"
                />
              </div>
              <div class="flex flex-col justify-between p-4">
                <p class="text-sm text-gray-400">
                  {{
                    item?.id_categoria?._id === '680fd248f613dc80267ba5d7'
                      ? 'Jabones Artesanales'
                      : 'Velas Artesanales'
                  }}
                </p>
                <h3 class="text-lg font-semibold ">{{ item?.nombre }}</h3>
                <p class="text-md font-bold mt-2">$ {{ item?.precio }}</p>
                <p class="text-sm text-green-600 flex items-center mt-1">
                  <span class="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  {{ item?.stock }} ejemplares disponibles
                </p>
              </div>
              <div class="flex justify-center items-center px-4 gap-2">
                <button
                  class="bg-green-400 text-white px-4 h-10 rounded-2xl hover:bg-green-500"
                  (click)="abrirFormulario(item)"
                  title="Visualizar producto"
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
                  class="bg-indigo-400 text-white px-4 h-10 rounded-2xl hover:bg-indigo-500 w-auto"
                  (click)="editarProducto(item)"
                  title="Editar producto"
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
                  class="bg-red-400 text-white px-4  rounded-2xl hover:bg-red-500 h-10 "
                  (click)="eliminarProducto(item._id)"
                  title="Eliminar producto"
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
            }
          </div>

          }
        </div>
      </div>
    </div>
    <app-modal
      [(mostrarModal)]="mostrarModalConfirmacion"
      [titulo]="'Confirmar eliminación'"
      [mensaje]="'¿Estás seguro de eliminar este producto?'"
      [tipo]="'confirmacion'"
      (confirmar)="confirmarEliminacion()"
    ></app-modal>
  `,
})
export class ProductsPage {
  public idRegistro = signal<string>(''); //almacena el id del producto a editar
  public mostrarModal = signal<boolean>(false);
  public carga = signal<boolean>(true); //variable para mostrar el loading
  public serviceProductos = inject(ProductosService);
  public busqueda = signal<string>('');
  public numeroPagina = signal<number>(1); //almacena el numero de pagina

  //variable para setear los datos en el formulario
  public enviarDatos = signal<producto | null>(null);

  //creacion de variable que almacenara la accion del formulario
  public accionAsignada = signal<Actions>('Registrar'); //valor inicial registrar

  //variables para el modal avisos
  public mostrarModalConfirmacion = signal<boolean>(false);
  public productoEliminar = signal<string | null>(null);

  //variable que almacena datos filtrados de barra de busqueda
  public datosBuscados = linkedSignal<producto[]>(() =>
    this.productos.filter((registro) =>
      registro.nombre.toLowerCase().includes(this.busqueda().toLowerCase())
    )
  );
  //variable que almacena lo que traera del backend
  public productos: producto[] = [];
  public datosProductos = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  //funcion para abrir el formulario con los datos visualizar o editar
  public abrirFormulario(datos: producto) {
    this.enviarDatos.set(datos);
    this.mostrarModal.set(true);
    this.accionAsignada.set('Visualizar'); //cambia el valor de la accion asignada al formulario
  }

  // Agrega estos métodos en tu ProductsPage
  public editarProducto(datos: producto) {
    this.enviarDatos.set(datos);
    this.idRegistro.set(datos._id); // Establece el ID del producto a editar
    this.mostrarModal.set(true);
    this.accionAsignada.set('Actualizar'); // Cambia a modo edición
  }
  //metodo para ver el formulario de registro
  public verFormulario() {
    this.enviarDatos.set(null);
    this.mostrarModal.set(true);
    this.accionAsignada.set('Registrar'); //cambia el valor de la accion asignada al formulario
  }

  //metodo para eliminar un producto cuando doy click al boton
  public eliminarProducto(id: string) {
    //this.serviceProductos.eliminar(id).subscribe();
    this.productoEliminar.set(id);
    this.mostrarModalConfirmacion.set(true);
  }
  public confirmarEliminacion() {
    const id = this.productoEliminar();
    if (id) {
      this.serviceProductos.eliminar(id).subscribe({
        next: () => {
          // Actualiza la lista después de eliminar
          this.obtenerProductos(this.numeroPagina());
          // Muestra mensaje de éxito
          this.mostrarMensaje(
            'Éxito',
            'Producto eliminado correctamente',
            'exito'
          );
        },
        error: () => {
          this.mostrarMensaje(
            'Error',
            'No se pudo eliminar este producto',
            'error'
          );
        },
      });
    }
  }
  private obtenerProductos(numeroPagina: number) {
    this.serviceProductos.obtener(numeroPagina).subscribe({
      next: (respuesta: any) => {
        console.log('Respuesta del backend:', respuesta);
        this.productos = respuesta.productos;
        this.datosBuscados.set(this.productos);
      },
    }).add(() => {
      this.carga.set(false); // Cambia el estado de carga a false después de obtener los productos
    });
  }
  private mostrarMensaje(
    titulo: string,
    mensaje: string,
    tipo: 'exito' | 'error' | 'confirmacion'
  ) {}
  //consumo de endpoint de usuarios
  constructor() {
    effect(() => {
      const pagina = this.numeroPagina();
      console.log('Pagina actual:', pagina);
      this.obtenerProductos(pagina);
    })
  }

  //metodo para pasar a la siguiente pagina
  public siguientePagina() {
    this.numeroPagina.update((estadoPagina) => estadoPagina + 1);
  }
  //metodo para pasar a la anterior pagina
  public paginaAnterior() {
    this.numeroPagina.update((estadoPagina) => estadoPagina - 1);
  }
}
