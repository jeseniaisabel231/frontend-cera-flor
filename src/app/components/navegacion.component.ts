import { NgClass } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
//import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'navegacion',
  imports: [NgClass, RouterLink],
  template: `
    <aside
      
      class="w-full md:w-[360px]   flex px-10 flex-col "
    >
      <div class="flex items-center gap-2 py-6 justify-center">
        
        <img src="logo.png" alt="Logo de Flor y Cera" class="w-[43px] object-cover" />
        <h1 class="font-playfair font-extrabold text-[17px] hidden lg:block ">
          Flor & Cera
        </h1>
      </div>
      <div class="flex flex-col items-center gap-4 text-center mb-6">
        <img src="/administrador/fotoadmin.jpg" class="h-[80px] w-[80px] rounded-full" />
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <p class="font-bold text-[18px]">Estefanía Sánchez</p>
            <span class="text-gris-300 text-[14px]">Administradora</span>
          </div>
        </div>
      </div>

      <nav class="">
        <ul class="flex flex-col gap-2">
          <li class="flex ">
            <a
              class="flex items-center  pl-6 py-3 rounded-3xl gap-6 w-full hover:text-[#3C3C3B] font-normal transition-colors duration-initial  hover:bg-[#C6BCFF]"
              routerLink="/admin/dashboard"
              [ngClass]="{
                'bg-[#806BFF] text-white fill-white':
                  rutaActiva() === 'dashboard',
                'text-[#3C3C3B]': rutaActiva() !== 'dashboard'
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.111 7.35c-.56 0-1.097-.221-1.493-.615A2.1 2.1 0 0 1 0 5.25V2.1C0 1.543.222 1.009.618.615A2.12 2.12 0 0 1 2.111 0h4.222c.56 0 1.097.221 1.493.615s.618.928.618 1.485v3.15c0 .557-.222 1.091-.618 1.485a2.12 2.12 0 0 1-1.493.615zm0 13.65c-.56 0-1.097-.221-1.493-.615A2.1 2.1 0 0 1 0 18.9v-8.4c0-.557.222-1.091.618-1.485A2.12 2.12 0 0 1 2.111 8.4h4.222c.56 0 1.097.221 1.493.615s.618.928.618 1.485v8.4c0 .557-.222 1.091-.618 1.485A2.12 2.12 0 0 1 6.333 21zm10.556 0c-.56 0-1.097-.221-1.493-.615a2.1 2.1 0 0 1-.618-1.485v-2.1c0-.557.222-1.091.618-1.485a2.12 2.12 0 0 1 1.493-.615h4.222c.56 0 1.097.221 1.493.615S19 16.243 19 16.8v2.1c0 .557-.222 1.091-.618 1.485a2.12 2.12 0 0 1-1.493.615zm0-8.4c-.56 0-1.097-.221-1.493-.615a2.1 2.1 0 0 1-.618-1.485V2.1c0-.557.222-1.091.618-1.485A2.12 2.12 0 0 1 12.667 0h4.222c.56 0 1.097.221 1.493.615S19 1.543 19 2.1v8.4c0 .557-.222 1.091-.618 1.485a2.12 2.12 0 0 1-1.493.615z"
                  fill="currentColor"
                />
              </svg>
              Dashboard
            </a>
          </li>
          <li class="flex">
            <a
              class="flex items-center  pl-6 py-3 rounded-3xl gap-6 w-full hover:text-[#3C3C3B] font-normal transition-colors duration-initial  hover:bg-[#C6BCFF]"
              routerLink="/admin/usuarios"
              [ngClass]="{
                'bg-[#806BFF] text-white fill-white':
                  rutaActiva() === 'usuarios',
                'text-[#3C3C3B]': rutaActiva() !== 'usuarios'
              }"
            >
              <svg
                class="transition-colors duration-[50] "
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M14.714 15.933v-1.08c1.338-.811 2.429-2.834 2.429-4.859 0-3.25 0-5.884-3.643-5.884S9.857 6.745 9.857 9.994c0 2.025 1.09 4.048 2.429 4.86v1.079C8.166 16.295 5 18.475 5 21.11h17c0-2.635-3.167-4.815-7.286-5.177"
                  fill="currentColor"
                />
                <path
                  d="M6.234 16.36c1.053-.74 2.364-1.3 3.806-1.643a7.88 7.88 0 0 1-1.657-4.8c0-1.757 0-3.418.583-4.776C9.532 3.822 10.55 3.005 12 2.699 11.678 1.136 10.82.11 8.536.11c-3.658 0-3.658 2.636-3.658 5.885 0 2.025 1.095 4.048 2.438 4.86v1.079C3.18 12.295 0 14.475 0 17.11h5.315q.415-.396.919-.75"
                  fill="currentColor"
                />
              </svg>
              Usuarios
            </a>
          </li>
          <li class="flex">
            <a
              class="flex items-center  pl-6 py-3 rounded-3xl gap-6 w-full hover:text-[#3C3C3B] font-normal transition-colors duration-initial  hover:bg-[#C6BCFF]"
              routerLink="/admin/productos"
              [ngClass]="{
                'bg-[#806BFF] text-white fill-white':
                  rutaActiva() === 'productos',
                'text-[#3C3C3B]': rutaActiva() !== 'productos'
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
                fill="none"
              >
                <path
                  d="M5.5 0H1.1C.808 0 .528.11.322.308A1.03 1.03 0 0 0 0 1.05v18.9c0 .279.116.546.322.742.206.197.486.308.778.308h4.4c.292 0 .572-.11.778-.308.206-.197.322-.463.322-.742V1.05c0-.278-.116-.546-.322-.742A1.13 1.13 0 0 0 5.5 0M3.3 19.95c-.435 0-.86-.123-1.222-.354a2.1 2.1 0 0 1-.81-.942 2 2 0 0 1-.126-1.214 2.1 2.1 0 0 1 .602-1.075c.308-.294.7-.494 1.127-.575s.869-.04 1.27.12c.403.159.746.428.988.773s.371.752.371 1.167c0 .557-.232 1.091-.644 1.485a2.25 2.25 0 0 1-1.556.615m2.2-9.45H1.1V1.05h4.4zm-1.1 7.35c0 .208-.065.41-.185.583a1.1 1.1 0 0 1-.494.387c-.201.08-.422.1-.636.06a1.1 1.1 0 0 1-.563-.287 1.04 1.04 0 0 1-.3-.538 1 1 0 0 1 .062-.607c.083-.192.224-.356.405-.471a1.14 1.14 0 0 1 1.389.13c.206.197.322.465.322.743M13.2 0H8.8c-.292 0-.572.11-.778.308a1.03 1.03 0 0 0-.322.742v18.9c0 .279.116.546.322.742.206.197.486.308.778.308h4.4c.292 0 .572-.11.778-.308.206-.197.322-.463.322-.742V1.05c0-.278-.116-.546-.322-.742A1.13 1.13 0 0 0 13.2 0M11 19.95c-.435 0-.86-.123-1.222-.354a2.1 2.1 0 0 1-.81-.942 2 2 0 0 1-.126-1.214 2.1 2.1 0 0 1 .602-1.075c.308-.294.7-.494 1.127-.575s.869-.04 1.27.12c.403.159.747.428.988.773.242.346.371.752.371 1.167 0 .557-.232 1.091-.644 1.485A2.25 2.25 0 0 1 11 19.95m2.2-9.45H8.8V1.05h4.4zm-1.1 7.35c0 .208-.064.41-.185.583a1.1 1.1 0 0 1-.494.387c-.201.08-.422.1-.636.06a1.1 1.1 0 0 1-.563-.287 1.04 1.04 0 0 1-.3-.538 1 1 0 0 1 .062-.607c.083-.192.224-.356.405-.471a1.14 1.14 0 0 1 1.389.13c.206.197.322.465.322.743M20.9 0h-4.4c-.292 0-.572.11-.778.308a1.03 1.03 0 0 0-.322.742v18.9c0 .279.116.546.322.742.207.197.486.308.778.308h4.4c.292 0 .572-.11.778-.308.206-.197.322-.463.322-.742V1.05c0-.278-.116-.546-.322-.742A1.13 1.13 0 0 0 20.9 0m-2.2 19.95c-.435 0-.86-.123-1.222-.354a2.13 2.13 0 0 1-.81-.942 2 2 0 0 1-.126-1.214 2.1 2.1 0 0 1 .602-1.075c.308-.294.7-.494 1.127-.575s.869-.04 1.27.12c.403.159.747.428.988.773.242.346.371.752.371 1.167 0 .557-.232 1.091-.644 1.485a2.25 2.25 0 0 1-1.556.615m2.2-9.45h-4.4V1.05h4.4zm-1.1 7.35c0 .208-.065.41-.185.583a1.1 1.1 0 0 1-.494.387c-.201.08-.422.1-.636.06a1.1 1.1 0 0 1-.563-.287 1.04 1.04 0 0 1-.3-.538 1 1 0 0 1 .062-.607c.083-.192.224-.356.405-.471a1.14 1.14 0 0 1 1.389.13c.206.197.322.465.322.743"
                  fill="currentColor"
                />
              </svg>
              Productos
            </a>
          </li>
          <li class="flex">
            <a
              class="flex items-center  pl-6 py-3 rounded-3xl gap-6 w-full hover:text-[#3C3C3B] font-normal transition-colors duration-initial  hover:bg-[#C6BCFF]"
              routerLink="/admin/ventas"
              [ngClass]="{
                'bg-[#806BFF] text-white fill-white': rutaActiva() === 'ventas',
                'text-[#3C3C3B]': rutaActiva() !== 'ventas'
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
              >
                <mask
                  id="a"
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="22"
                  height="23"
                >
                  <path
                    d="M20 6.75 11 2 2 6.75v9.5L11 21l9-4.75z"
                    fill="#fff"
                    stroke="#fff"
                    stroke-width="2.167"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 10.55v3.8m4.235-5.7v5.7m-8.47-1.9v1.9"
                    stroke="#000"
                    stroke-width="2.167"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </mask>
                <g mask="url(#a)">
                  <path d="M-1.706.1h25.412v22.8H-1.706z" fill="currentColor" />
                </g>
              </svg>
              Ventas
            </a>
          </li>
          <li class="flex">
            <a
              class="flex items-center  pl-6 py-3 rounded-3xl gap-6 w-full hover:text-[#3C3C3B] font-normal transition-colors duration-initial  hover:bg-[#C6BCFF]"
              routerLink="/admin/promociones"
              [ngClass]="{
                'bg-[#806BFF] text-white fill-white':
                  rutaActiva() === 'promociones',
                'text-[#3C3C3B]': rutaActiva() !== 'promociones'
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M20.725 5.988a1 1 0 0 1-.686-1.237l.827-2.884a1 1 0 1 1 1.922.551l-.826 2.884a1 1 0 0 1-1.237.686m7.982-2.695a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0m-7.114 19.125l4.75-2.375a3 3 0 0 0 .779-4.804l-10.36-10.36a3 3 0 0 0-4.805.78l-8.64 17.279A3 3 0 0 0 3.88 26.4l1.72 1.72a3 3 0 0 0 3.463.562l2.717-1.359a5.5 5.5 0 0 0 9.813-4.906m-1.798.899a3.5 3.5 0 0 1-6.218 3.109zM27 10.002a1 1 0 0 0 0 2h3a1 1 0 1 0 0-2z"
                />
              </svg>

              Promociones
            </a>
          </li>
          <li class="flex cursor-pointer" (click)="salir()">
            <a
              class="flex items-center  pl-6 py-3 rounded-3xl gap-6 w-full hover:text-[#3C3C3B] font-normal transition-colors duration-initial  hover:bg-[#C6BCFF]"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
              >
                <path
                  d="M15.607 17.66v-6.206H8.163a.77.77 0 0 1-.58-.279 1.04 1.04 0 0 1-.241-.675c0-.253.086-.496.24-.675a.77.77 0 0 1 .581-.28h7.444V3.341c0-.886-.304-1.735-.843-2.361S13.494 0 12.732 0H2.875C2.113 0 1.382.353.843.98.304 1.606.001 2.455 0 3.34v14.32c0 .885.304 1.734.843 2.36.539.627 1.27.98 2.032.98h9.857c.763 0 1.493-.353 2.032-.98.54-.626.843-1.475.843-2.36m4.589-6.206-2.705 3.144c-.148.18-.229.42-.226.67.003.249.09.486.24.662a.77.77 0 0 0 .571.28.76.76 0 0 0 .576-.263l4.108-4.772c.153-.18.24-.422.24-.675s-.087-.496-.24-.675l-4.108-4.772a.76.76 0 0 0-.576-.263.77.77 0 0 0-.57.28 1.04 1.04 0 0 0-.24.662c-.003.25.078.49.225.67l2.705 3.143h-4.589v1.91z"
                  fill="currentColor"
                />
              </svg>
              Salir
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  `,
})
export class Navegacion {
  public mostrar = signal<boolean>(true);

  //para mantener el color de cada opcion del menu
  //servicio de ruta
  public servicioRuta = inject(ActivatedRoute);

  public rutaActiva = computed(() => this.servicioRuta.snapshot.url[0].path);
  constructor(private router: Router) {
    console.log(this.rutaActiva());
  }
  // Método para alternar el estado del menú
  public toggleMenu(): void {
    this.mostrar.set(!this.mostrar());
  }

  salir() {
    localStorage.removeItem('token'); //remuevo el token para salir de secion
    this.router.navigate(['/iniciar-sesion']); // Redirigir al login
  }
}
