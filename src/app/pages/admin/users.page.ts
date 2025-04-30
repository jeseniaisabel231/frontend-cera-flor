import { Component, inject, linkedSignal, signal } from '@angular/core';
import { Navegacion } from '../../components/navegacion.component';
import { Presentation } from '../../components/admin/presentation.component';
import { TablaComponent } from '../../components/admin/tabla.component';
import { UsuariosService } from '../../../services/admin/usuarios.service';
import { usuario } from '../../../../interfaces/usuario.interface';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Loading } from '../../components/loading.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  imports: [Navegacion, Presentation, TablaComponent, Loading, FormsModule],
  template: `
    <div class="bg-[#efecff] w-full flex min-h-dvh">
      <navegacion></navegacion>
      <!-- Contenido principal -->

      <div
        class="grid grid-cols-5 grid-rows-4 gap-4 p-6 w-full border-l border-[#d0c9fe]"
      >
        <presentation titulo="Usuarios" class="col-span-5"></presentation>

        <!-- <div
        class="col-span-7 row-span-3 col-start-1 row-start-2 bg-white rounded-[18px]  py-6 px-10 shadow-md"
      >
        
      </div> -->
        <div
          class="overflow-auto w-full col-span-5 row-span-3 col-start-1 row-start-2 bg-white rounded-[18px]  py-6 px-10 shadow-md "
        >
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
              [(ngModel)]="busqueda"
              class="flex-1 bg-transparent text-[14px] font-normal text-[#3B3D3E] outline-none pl-2"
              type="search"
              placeholder="Buscar"
              id="search"
              name="search"
            />
          </div>
          <div class="overflow-auto w-full mt-4">

            @if (carga()){
            <loading></loading>
            } @else {
              
            <tabla 
            [datosTabla]="usuarios()" 
            titulo="usuario" 
            acciones="Visualizar"
            ></tabla>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UsersPage {
  //estado de carga
  public carga = signal<boolean>(true);

  public serviceUsuarios = inject(UsuariosService);

  public busqueda = signal<string>('');

  //variable que almacena datos filtrados de barra de busqueda
  public datosBuscados = linkedSignal<usuario[]>(() => {
    const datosUsuarios = this.usuarios();
    if (this.busqueda() !== '') {
      return datosUsuarios.filter((registro) =>
        Object.values(registro).some((valor) =>
          valor.toString().toLowerCase().includes(this.busqueda().toLowerCase())
        )
      );
    }
    return datosUsuarios;
  });

  //variable que almacena lo que traera del backend
  public usuarios = signal<usuario[]>([]);

  public datosUsuarios = new FormGroup({
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
    this.serviceUsuarios
      .obtener()
      .subscribe({
        next: (respuesta: any) => {
          this.usuarios.set(respuesta.clientes);
          this.datosBuscados.set(respuesta.clientes);
          console.log(respuesta.clientes);
        },
      })
      .add(() => {
        this.carga.set(false);
      }); //cambia estado de carga;
  }
}
