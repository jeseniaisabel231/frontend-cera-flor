import { TitleCasePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import type { producto } from '../interfaces/producto.interface';
import { decodificarToken } from '../utils/decodificarToken';

@Component({
  imports: [RouterLink, TitleCasePipe, FormsModule],
  selector: 'headers',
  template: `
    <header class="sticky top-0 z-50 flex flex-col shadow-md">
      <div
        class="bg-amarrillo-500 flex items-center justify-between px-10 py-2 lg:px-28"
      >
        <a class="flex cursor-pointer items-center gap-x-3">
          <img src="logo.png" alt="Flor & Cera" />
          <h1 class="font-playfair hidden text-[25px] font-bold lg:block">
            Flor & Cera
          </h1>
        </a>

        <div class="flex w-4/5 cursor-pointer justify-end gap-x-7">
          <div class="relative flex w-full justify-end">
            <input
              class="border-gris-500 h-10 w-full rounded-[15px] border bg-white p-2 pr-10 pl-4 outline-[#3C3C3B] sm:w-3/5"
              placeholder="Buscar productos...."
              id="search"
              name="search"
              [(ngModel)]="busqueda"
            />
            <svg
              class="absolute inset-y-0 right-2 my-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m19.6 21-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.887T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5a6.1 6.1 0 0 1-1.3 3.8l6.3 6.3zM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5t-1.312-3.187T9.5 5 6.313 6.313 5 9.5t1.313 3.188T9.5 14"
                fill="#3C3C3B"
              />
            </svg>
            @if (busqueda()) {
              <div
                class="absolute top-12 z-50 max-h-100 w-3/4 rounded-lg bg-white p-2 shadow-md shadow-black/20"
              >
                @if (productosBuscadosResource.isLoading()) {
                  <div class="flex items-center justify-center gap-x-2">
                    <svg
                      class="size-4 animate-spin text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.243A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.695z"
                      ></path>
                    </svg>
                    <span class="text-gray-500">Cargando...</span>
                  </div>
                }

                @let status = productosBuscadosResource.statusCode();
                @if (status === 404 || status === 500) {
                  <div class="text-center text-gray-500">
                    No se encontraron productos
                  </div>
                }

                @for (
                  producto of productosBuscadosResource.value().productos;
                  track $index
                ) {
                  <div
                    class="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
                    [routerLink]="['/detalle-producto', producto._id]"
                  >
                    <img
                      [src]="producto.imagen"
                      [alt]="producto.nombre"
                      class="h-10 w-10 rounded-lg"
                    />
                    <div class="flex flex-col">
                      <small class="text-gray-500">
                        {{ producto.id_categoria.nombre }}
                      </small>
                      <h2 class="font-bold">{{ producto.nombre }}</h2>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <div class="flex flex-row items-center">
            @if (usuarioAutenticado && menuVisible()) {
              <div
                class="absolute right-55 -bottom-22 z-50 w-60 rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-200"
              >
                <ul class="py-1 text-sm text-gray-700">
                  <li routerLink="/perfil">
                    <a
                      class="block px-4 py-2 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                    >
                      <div class="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Mi perfil
                      </div>
                    </a>
                  </li>

                  <li routerLink="/productos-personalizados">
                    <a
                      class="block px-4 py-2 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                    >
                      <div class="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-4"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="m16.408 2.421l1.85 3.15a3.048 3.048 0 0 1-1.78 4.55V11.5H20.5a2 2 0 0 1 1.937 1.5h.063v6.75a1.75 1.75 0 0 1-1.5 1.732v6.106A2.41 2.41 0 0 1 18.588 30h-6.176A2.41 2.41 0 0 1 10 27.589v-8.673A1.5 1.5 0 0 1 9 17.5V13h.063A2 2 0 0 1 11 11.5h3.866v-1.38c-1.245-.347-2.188-1.477-2.24-2.818A3.04 3.04 0 0 1 13 5.717l.01-.017l.07-.12l1.856-3.159a.854.854 0 0 1 1.472 0M19 15h-.5v1a1.5 1.5 0 0 1-3 0v-1H12v12.588c0 .228.184.412.412.412h6.176a.41.41 0 0 0 .412-.412zm-1.664-7.627a1.663 1.663 0 1 0-3.326 0a1.663 1.663 0 0 0 3.326 0"
                          />
                        </svg>
                        Mis productos personalizados
                      </div>
                    </a>
                  </li>

                  <li routerLink="/pedidos">
                    <a
                      href="/pedidos"
                      class="block px-4 py-2 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                    >
                      <div class="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Mis pedidos
                      </div>
                    </a>
                  </li>

                  <li class="my-1 border-t border-gray-100"></li>

                  <li>
                    <button
                      (click)="cerrarSesion()"
                      class="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            }
            <button
              class="group flex cursor-pointer flex-row items-center gap-2 pr-3"
              (click)="verMenu()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                class="stroke-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:stroke-[#7a0dc7]"
              >
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M19 20.75a1 1 0 0 0 1-1v-1.246c.004-2.806-3.974-5.004-8-5.004s-8 2.198-8 5.004v1.246a1 1 0 0 0 1 1zM15.604 6.854a3.604 3.604 0 1 1-7.208 0a3.604 3.604 0 0 1 7.208 0"
                />
              </svg>
              
              <span
                class="hidden whitespace-nowrap text-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:text-[#7a0dc7] sm:block"
              >
                @if (serviceAuth.clienteAutenticado()) {
                  <span>Hola,</span>
                  <span class="font-bold">
                    {{ serviceAuth.datosUsuario().nombre | titlecase }}
                  </span>
                } @else {
                  <div class="font-semibold">Iniciar sesión/Registrarse</div>
                }
              </span>
            </button>
            <div class="h-10 border-[1px] border-[#a0a0a0]"></div>

            <a
              class="group relative flex flex-row items-center gap-1 pl-3"
              routerLink="/carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                class="fill-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:fill-[#7a0dc7]"
              >
                <path
                  d="M19 20c0 1.11-.89 2-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2s-.89-2-2-2m.2-3.37l-.03.12c0 .14.11.25.25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2h3.27l.94 2H20c.55 0 1 .45 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1zM8.5 11H10V9H7.56zM11 9v2h3V9zm3-1V6h-3v2zm3.11 1H15v2h1zm1.67-3H15v2h2.67zM6.14 6l.94 2H10V6z"
                />
              </svg>
              <span
                class="hidden text-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:text-[#7a0dc7] sm:block"
              >
                Carrito
              </span>
              @if (serviceCarrito.cantidadProductos()) {
                <span
                  class="absolute -top-4 -right-6 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors duration-300 ease-in-out group-hover:bg-red-600"
                >
                  {{ this.serviceCarrito.cantidadProductos() }}
                </span>
              }
            </a>
          </div>
        </div>
      </div>
      <nav
        class="bg-morado-500 flex h-14 w-full items-center justify-center text-white"
      >
        <ul class="flex flex-row gap-14 font-semibold">
          <li class="relative">
            <a
              routerLink="/inicio"
              class="disney-link block px-4 py-2 text-white"
              [class.active]="rutaActiva === 'inicio'"
              [class.font-medium]="rutaActiva === 'inicio'"
              [class.text-opacity-80]="rutaActiva !== 'inicio'"
            >
              Inicio
            </a>
          </li>
          <li class="relative">
            <a
              routerLink="/catalogo"
              [queryParams]="{ categoria: 'jabones-artesanales' }"
              class="disney-link block px-4 py-2 text-white"
              [class.active]="rutaActiva === 'catalogo'"
              [class.font-medium]="rutaActiva === 'catalogo'"
              [class.text-opacity-80]="rutaActiva !== 'catalogo'"
            >
              Catálogo
            </a>
          </li>

          <li>
            <a
              routerLink="/personalizacion-producto"
              class="disney-link block px-4 py-2 text-white"
              [class.active]="rutaActiva === 'personalizacion-producto'"
              [class.font-medium]="rutaActiva === 'personalizacion-producto'"
              [class.text-opacity-80]="
                rutaActiva !== 'personalizacion-producto'
              "
            >
              Personalización
            </a>
          </li>
          <li>
            <a
              routerLink="/sobre-nosotros"
              class="disney-link block px-4 py-2 text-white"
              [class.active]="rutaActiva === 'sobre-nosotros'"
              [class.font-medium]="rutaActiva === 'sobre-nosotros'"
              [class.text-opacity-80]="rutaActiva !== 'sobre-nosotros'"
            >
              Sobre nosotros
            </a>
          </li>
        </ul>
      </nav>
    </header>
  `,
})
export class Headers {
  public serviceAuth = inject(AuthService);
  public serviceCarrito = inject(CarritoService);
  public usuarioAutenticado = decodificarToken();
  public menuVisible = signal(false);
  public router = inject(Router);
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = this.servicioRuta.snapshot.url[0].path;

  public busqueda = signal<string>('');
  public productosBuscadosResource = httpResource<{ productos: producto[] }>(
    () => `${environment.urlApi}/api/productos?nombre=${this.busqueda()}`,
    {
      defaultValue: { productos: [] },
    },
  );
  public loading = linkedSignal(() =>
    this.productosBuscadosResource.isLoading(),
  );

  verMenu() {
    if (this.usuarioAutenticado) {
      this.menuVisible.set(!this.menuVisible());
    } else {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.menuVisible.set(false);
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
}
