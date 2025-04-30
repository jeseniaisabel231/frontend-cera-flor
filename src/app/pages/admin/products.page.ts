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
@Component({
  imports: [Navegacion, FormProducto, Presentation, Loading],
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
              (click)="mostrarModal.set(true)"
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
          <formulario [(mostrarModal)]="mostrarModal"></formulario>

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
                [src]="item.imagen"
                alt=""
                class="w-full h-48 object-cover rounded-t-xl"
              />
              <div
                class="p-4 flex flex-col flex-grow border border-gray-300 rounded-b-xl"
              >
                <p class="text-sm text-gray-400" >{{item.id_categoria.nombre}}</p>
                <h3 class="text-lg font-semibold ">{{item.nombre}}</h3>
                <p class="text-md font-bold mt-2">$ {{item.precio}}</p>
                <p class="text-sm text-green-600 flex items-center mt-1">
                  <span class="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  {{item.stock}} ejemplares disponibles
                </p>
                <div class="flex justify-between items-center pt-4">
                  <button
                    class="bg-indigo-400 text-white px-12 h-10 rounded-full hover:bg-indigo-500 w-auto"
                  >
                    Editar
                  </button>
                  <button
                    class="bg-red-400 text-white px-6  rounded-full hover:bg-red-500 h-10 "
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
  public mostrarModal = signal<boolean>(false);
  //estado de carga
  public carga = signal<boolean>(true);
  public serviceProductos = inject(ProductosService);
  public busqueda = signal<string>('');

  //variable que almacena datos filtrados de barra de busqueda
  public datosBuscados = linkedSignal<producto[]>(() => {
    const datosProductos = this.productos();
    if (this.busqueda() !== '') {
      return datosProductos.filter((registro) =>
        Object.values(registro).some((valor) =>
          valor.toString().toLowerCase().includes(this.busqueda().toLowerCase())
        )
      );
    }
    return datosProductos;
  });
  //variable que almacena lo que traera del backend
  public productos = signal<producto[]>([]);
  public datosPromociones = new FormGroup({
    //id : number,
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

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
