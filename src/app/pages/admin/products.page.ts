import { Component, inject, linkedSignal, signal } from '@angular/core';
import { Navegacion } from '../../components/navegacion.component';
import { FormProducto } from '../../components/admin/formproduct.component';
import { Presentation } from '../../components/admin/presentation.component';
import { Loading } from '../../components/loading.component';
import { ProductosService } from '../../../services/admin/productos.service';
import { producto } from '../../interfaces/producto.interface';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Actions } from '../../components/admin/modal.component';
import { ToastComponent } from "../../components/toast.component";
@Component({
  imports: [Navegacion, FormProducto, Presentation, Loading, ToastComponent],
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
                placeholder="Buscar"
                id="search"
                name="search"
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

          <!--Lista de productos en cartas -->

          @if(carga()){
          <loading></loading>
          }@else {
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6"
          >
            @for( item of datosBuscados(); track $index) {

            <div class="bg-white   flex flex-col w-[240px]">
              <img
                [src]="item?.imagen"
                alt=""
                class="w-full h-48 object-cover rounded-t-xl"
              />
              <div
                class="p-4 flex flex-col flex-grow border border-gray-300 rounded-b-xl"
              >
                <p class="text-sm text-gray-400">
                  {{ item?.id_categoria?.nombre }}
                </p>
                <h3 class="text-lg font-semibold ">{{ item?.nombre }}</h3>
                <p class="text-md font-bold mt-2">$ {{ item?.precio }}</p>
                <p class="text-sm text-green-600 flex items-center mt-1">
                  <span class="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  {{ item?.stock }} ejemplares disponibles
                </p>
                <div class="flex justify-between items-center pt-4">
                  <button
                    class="bg-green-400 text-white px-6 h-10 rounded-full hover:bg-green-500 w-auto"
                    (click)="abrirFormulario(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#3C3C3B"
                        fill-rule="evenodd"
                        d="M256 42.667c117.822 0 213.334 95.512 213.334 213.333c0 117.82-95.512 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334S138.18 42.667 256 42.667m21.38 192h-42.666v128h42.666zM256.217 144c-15.554 0-26.837 11.22-26.837 26.371c0 15.764 10.986 26.963 26.837 26.963c15.235 0 26.497-11.2 26.497-26.667c0-15.446-11.262-26.667-26.497-26.667"
                      />
                    </svg>
                  </button>
                  <button
                    class="bg-indigo-400 text-white px-6 h-10 rounded-full hover:bg-indigo-500 w-auto" (click)="editarProducto(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#3C3C3B"
                        d="M10 15q-.425 0-.712-.288T9 14v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162zm9.6-9.2 1.425-1.4-1.4-1.4L18.2 4.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.5q.35 0 .575.175t.35.45.087.55-.287.525l-4.65 4.65q-.275.275-.425.638T7 10.75V15q0 .825.588 1.412T9 17h4.225q.4 0 .763-.15t.637-.425L19.3 11.75q.25-.25.525-.288t.55.088.45.35.175.575V19q0 .825-.587 1.413T19 21z"
                      />
                    </svg>
                  </button>
                  <button
                    class="bg-red-400 text-white px-6  rounded-full hover:bg-red-500 h-10 "
                    (click)="eliminarProducto(item._id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                    >
                      <path
                        d="M12.958 2.571h-3.25v-.964c0-.426-.142-.835-.396-1.136C9.058.169 8.713 0 8.354 0H5.646c-.36 0-.704.17-.958.47-.254.302-.396.71-.396 1.137v.964h-3.25a.5.5 0 0 0-.383.189.7.7 0 0 0-.159.454c0 .17.057.334.159.455.101.12.239.188.383.188h.575l.643 12.251C2.308 17.188 3.005 18 3.885 18h6.23c.884 0 1.567-.795 1.625-1.888l.643-12.255h.575a.5.5 0 0 0 .383-.188.7.7 0 0 0 .159-.455.7.7 0 0 0-.159-.454.5.5 0 0 0-.383-.189M4.853 15.43h-.02a.5.5 0 0 1-.376-.18.7.7 0 0 1-.165-.44l-.271-9a.72.72 0 0 1 .145-.462.51.51 0 0 1 .377-.204.5.5 0 0 1 .389.172.7.7 0 0 1 .172.448l.271 9a.8.8 0 0 1-.034.248.7.7 0 0 1-.11.213.6.6 0 0 1-.172.147.5.5 0 0 1-.206.058m2.689-.643c0 .17-.057.334-.159.454A.5.5 0 0 1 7 15.43a.5.5 0 0 1-.383-.189.7.7 0 0 1-.159-.454v-9a.7.7 0 0 1 .159-.455A.5.5 0 0 1 7 5.143c.144 0 .281.068.383.188s.159.284.159.455zM8.625 2.57h-3.25v-.964a.4.4 0 0 1 .02-.123.3.3 0 0 1 .058-.105.3.3 0 0 1 .089-.07.2.2 0 0 1 .104-.023h2.708q.054 0 .104.023a.3.3 0 0 1 .089.07q.038.045.058.105a.4.4 0 0 1 .02.123zm1.083 12.24a.7.7 0 0 1-.165.44.5.5 0 0 1-.376.18h-.02a.5.5 0 0 1-.206-.058.6.6 0 0 1-.171-.147.7.7 0 0 1-.111-.213.8.8 0 0 1-.034-.248l.27-9a.7.7 0 0 1 .05-.244.7.7 0 0 1 .123-.204.5.5 0 0 1 .18-.132.47.47 0 0 1 .415.018.6.6 0 0 1 .171.146.7.7 0 0 1 .111.214q.038.12.034.248z"
                        fill="#fff"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            }
          </div>

          }
        </div>
        
      </div>
    </div>
  `,
})
export class ProductsPage {

  //variable que almacena el id de productos
  public idRegistro = signal<string>('');

  public mostrarModal = signal<boolean>(false);
  //estado de carga
  public carga = signal<boolean>(true);
  public serviceProductos = inject(ProductosService);
  public busqueda = signal<string>('');

  //variable para setear los datos en el formulario
  public enviarDatos = signal<producto | null>(null);

  //creacion de variable que almacenara la accion del formulario
  public accionAsignada = signal<Actions>('Registrar'); //valor inicial registrar

  //variable que almacena datos filtrados de barra de busqueda
  public datosBuscados = linkedSignal<producto[]>(() => {
    const datosProductos = this.productos();
    if (this.busqueda() !== '') {
      const imprimir = datosProductos.filter((registro) =>
        Object.values(registro).some((valor) =>
          valor.toString().toLowerCase().includes(this.busqueda().toLowerCase())
        )
      );
      console.log(imprimir);
      return imprimir;
    }

    return datosProductos;
  });
  //variable que almacena lo que traera del backend
  public productos = signal<producto[]>([]);
  public datosProductos = new FormGroup({
    //id : number,

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
    this.enviarDatos.set(null)
    this.mostrarModal.set(true);
    this.accionAsignada.set('Registrar'); //cambia el valor de la accion asignada al formulario
  }

  //metodo para eliminar un producto cuando doy click al boton
  public eliminarProducto(id: string) {
    this.serviceProductos.eliminar(id).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        this.productos.set(
          this.productos().filter((producto) => producto._id !== id)
        );
      },
    });
  }
  //consumo de endpoint de usuarios
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.serviceProductos
      .obtener()
      .subscribe({
        next: (respuesta: any) => {
          this.productos.set(respuesta.productos);
          this.datosBuscados.set(respuesta.productos);
          console.log(respuesta.productos);
        },
      })
      .add(() => {
        this.carga.set(false);
      }); //cambia estado de carga;
  }


}
