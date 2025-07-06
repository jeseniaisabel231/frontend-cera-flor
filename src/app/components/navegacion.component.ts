import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
//import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'navegacion',
  imports: [NgClass, RouterLink],
  template: `
    <aside
      class="flex h-full w-full flex-col bg-[#e0daff] px-10 md:w-[360px]"
      [class]="mostrar() ? 'animate-activa' : 'animate-inactiva'"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center gap-2 py-6">
          <img
            src="logo.png"
            alt="Logo de Flor y Cera"
            class="w-[43px] object-cover"
          />
          <h1 class="font-playfair hidden text-[17px] font-extrabold lg:block">
            Flor & Cera
          </h1>
        </div>
        <div (click)="mostrar.set(!mostrar())" class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#3C3C3B"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18m5-12l3 3l-3 3" />
            </g>
          </svg>
        </div>
      </div>
      <div class="mb-6 flex flex-col items-center gap-4 text-center">
        <img
          src="/administrador/fotoadmin.jpg"
          class="h-[80px] w-[80px] rounded-full"
        />
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <p class="text-[18px] font-bold">admin123&#64;yopmail.com</p>
            <span class="text-gris-300 text-[14px]">Admin</span>
          </div>
        </div>
      </div>

      <nav class="">
        <ul class="flex flex-col gap-2">
          <li class="flex">
            <a
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
              routerLink="/admin/dashboard"
              [ngClass]="{
                'bg-[#806BFF] fill-white text-white':
                  rutaActiva() === 'dashboard',
                'text-[#3C3C3B]': rutaActiva() !== 'dashboard',
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
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
              routerLink="/admin/usuarios"
              [ngClass]="{
                'bg-[#806BFF] fill-white text-white':
                  rutaActiva() === 'usuarios',
                'text-[#3C3C3B]': rutaActiva() !== 'usuarios',
              }"
            >
              <svg
                class="transition-colors duration-[50]"
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
              Clientes
            </a>
          </li>
          <li class="flex">
            <a
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
              routerLink="/admin/productos"
              [ngClass]="{
                'bg-[#806BFF] fill-white text-white':
                  rutaActiva() === 'productos',
                'text-[#3C3C3B]': rutaActiva() !== 'productos',
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 8q-1.2 0-2-.837t-.75-2.038q.05-1.3.913-2.287T12 1q.975.85 1.838 1.838t.912 2.287q.05 1.2-.75 2.038T12 8m8.25 9q.325 0 .538-.213T21 16.25t-.213-.537-.537-.213-.537.213-.213.537.213.538.537.212M18 22H6q-1.25 0-2.125-.875T3 19v-2h6V9h6v8h2.6q-.05-.2-.075-.375t-.025-.375q0-1.15.8-1.95t1.95-.8 1.95.8.8 1.95q0 .95-.562 1.675T21 18.9v.1q0 1.25-.875 2.125T18 22"
                />
              </svg>

              Productos
            </a>
          </li>
          <li class="flex">
            <a
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
              routerLink="/admin/ingredientes"
              [ngClass]="{
                'bg-[#806BFF] fill-white text-white':
                  rutaActiva() === 'ingredientes',
                'text-[#3C3C3B]': rutaActiva() !== 'ingredientes',
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#292929"
                  d="M4.088 3.25a.75.75 0 0 0-.75.643a9 9 0 0 0-.088 1.24c0 4.548 3.524 8.27 8 8.647V20a.75.75 0 0 0 1.5 0v-6.22c4.476-.377 8-4.1 8-8.648q0-.63-.089-1.24a.75.75 0 0 0-.75-.642A8.76 8.76 0 0 0 12 8.407A8.76 8.76 0 0 0 4.088 3.25"
                  fill="currentColor"
                />
              </svg>

              Ingredientes
            </a>
          </li>
          <li class="flex">
            <a
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
              routerLink="/admin/ventas"
              [ngClass]="{
                'bg-[#806BFF] fill-white text-white': rutaActiva() === 'ventas',
                'text-[#3C3C3B]': rutaActiva() !== 'ventas',
              }"
            >
              <svg
                class="transition-colors duration-[50]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"
                  fill="currentColor"
                />
              </svg>

              Ventas
            </a>
          </li>
          <li class="flex">
            <a
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
              routerLink="/admin/promociones"
              [ngClass]="{
                'bg-[#806BFF] fill-white text-white':
                  rutaActiva() === 'promociones',
                'text-[#3C3C3B]': rutaActiva() !== 'promociones',
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
              class="flex w-full items-center gap-6 rounded-3xl py-3 pl-6 font-normal transition-colors duration-initial hover:bg-[#C6BCFF] hover:text-[#3C3C3B]"
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
    @if (!mostrar()) {
      <div
        class="flex h-full flex-col items-center gap-4 bg-[#e0daff] px-4 pt-8"
      >
        <img
          src="logo.png"
          alt="Logo de Flor y Cera"
          class="w-[44px] object-cover"
        />

        <div (click)="mostrar.set(!mostrar())" class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#3C3C3B"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18m-5-6l-3-3l3-3" />
            </g>
          </svg>
        </div>
      </div>
    }
  `,
})
export class Navegacion {
  public mostrar = signal<boolean>(true);
  //para mantener el color de cada opcion del menu
  //servicio de ruta
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = computed(() => this.servicioRuta.snapshot.url[0].path);
  constructor(private router: Router) {}
  // Método para alternar el estado del menú
  public toggleMenu(): void {
    this.mostrar.set(!this.mostrar());
  }
  salir() {
    localStorage.removeItem('token'); //remuevo el token para salir de secion
    this.router.navigate(['/iniciar-sesion']); // Redirigir al login
  }
}
