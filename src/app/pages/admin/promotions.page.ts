import { Component, inject, linkedSignal, signal } from '@angular/core';
import { Navegacion } from '../../components/navegacion.component';
import { FormProducto } from '../../components/admin/formproduct.component';
import { Presentation } from '../../components/admin/presentation.component';
import { Loading } from '../../components/loading.component';
import { TablaComponent } from '../../components/admin/tabla.component';
import { promocion } from '../../interfaces/promocion.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PromocionesService } from '../../../services/admin/promociones.service';
import { FormProm } from "../../components/admin/formprom.component";
import { Actions } from '../../components/admin/modal.component';
import { producto } from '../../interfaces/producto.interface';
@Component({
  imports: [Navegacion, Presentation, Loading, TablaComponent, FormProm],
  template: `
    <div class="bg-[#efecff] w-full flex min-h-dvh">
      <navegacion></navegacion>
      <div
        class="grid grid-cols-5 grid-rows-4 gap-4 p-6 w-full border-l border-[#d0c9fe]"
      >
        <presentation titulo="Promociones" class="col-span-5"></presentation>

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
              Añadir promoción
            </button>
          </div>
          <formprom [(mostrarModal)]="mostrarModal" [acciones]="accionAsignada()" [servicioPromocion]="servicePromociones" [mostrarDatos]="enviarDatos()" [idRegistro]="idRegistro()"></formprom>
          @if (carga()){
          <loading></loading>
          } @else {

          <tabla
            [datosTabla]="promociones()"
            titulo="promocion"
            acciones="Visualizar"
          ></tabla>
          }
        </div>
      </div>
    </div>
  `,
})
export class PromotionsPage {
   //variable que almacena el id de productos
   public idRegistro = signal<string>('');
  public mostrarModal = signal<boolean>(false);
  //estado de carga
  public carga = signal<boolean>(true);

  public servicePromociones = inject(PromocionesService);

   //variable para setear los datos en el formulario
    public enviarDatos = signal<producto | null>(null);

  public accionAsignada = signal<Actions>('Registrar'); //valor inicial registrar

  public busqueda = signal<string>('');

  //variable que almacena datos filtrados de barra de busqueda
  public datosBuscados = linkedSignal<promocion[]>(() => {
    const datosPromociones = this.promociones();
    if (this.busqueda() !== '') {
      return datosPromociones.filter((registro) =>
        Object.values(registro).some((valor) =>
          valor.toString().toLowerCase().includes(this.busqueda().toLowerCase())
        )
      );
    }
    return datosPromociones;
  });

  //variable que almacena lo que traera del backend
  public promociones = signal<promocion[]>([]);

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
    this.servicePromociones
      .obtener()
      .subscribe({
        next: (respuesta: any) => {
          this.promociones.set(respuesta.promociones);
          this.datosBuscados.set(respuesta.promociones);
          console.log(respuesta.promociones);
        },
      })
      .add(() => {
        this.carga.set(false);
      }); //cambia estado de carga;
  }
}
