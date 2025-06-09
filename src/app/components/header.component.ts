import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { decodificarToken } from '../utils/decodificarToken';

@Component({
  imports: [RouterLink],
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
          </div>

          <div class="flex flex-row items-center">
            @if (usuarioAutenticado && menuVisible()) {
              <div
                class="absolute right-55 -bottom-14 z-50 w-48 rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-200"
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
                      class="flex w-full items-center gap-2 px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
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
              class="group flex flex-row items-center gap-2 pr-3"
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
                  stroke-width="1.5"
                  d="M19 20.75a1 1 0 0 0 1-1v-1.246c.004-2.806-3.974-5.004-8-5.004s-8 2.198-8 5.004v1.246a1 1 0 0 0 1 1zM15.604 6.854a3.604 3.604 0 1 1-7.208 0a3.604 3.604 0 0 1 7.208 0"
                />
              </svg>
              <span
                class="hidden whitespace-nowrap text-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:text-[#7a0dc7] sm:block"
              >
                Mi cuenta
              </span>
            </button>
            <div class="h-10 border-[1px] border-[#a0a0a0]"></div>

            <div class="group relative flex flex-row items-center gap-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 1024 1024"
                class="fill-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:fill-[#7a0dc7]"
              >
                <path
                  d="M864 158.704H672.815V97.328c0-52.944-43.056-96-96-96H449.183c-52.944 0-96 43.056-96 96v61.376H159.999c-35.344 0-64 28.656-64 64v735.968c0 35.344 28.656 64 64 64h704c35.344 0 64-28.656 64-64V222.704c0-35.344-28.656-64-64-64zM417.184 97.328c0-17.664 14.336-32 32-32h127.632c17.664 0 32 14.336 32 32v61.376H417.184zM864 958.672H160V222.704h193.184v65.84s-.848 31.967 31.809 31.967c36 0 32.192-31.967 32.192-31.967v-65.84h191.632v65.84s-2.128 32.128 31.872 32.128c32 0 32.128-32.128 32.128-32.128v-65.84h191.184z"
                />
              </svg>
              <a
                class="hidden text-[#3C3C3B] transition-colors duration-300 ease-in-out group-hover:text-[#7a0dc7] sm:block"
                routerLink="/carrito"
              >
                Compras
              </a>
              <span
                id="cart-counter"
                class="absolute -top-4 -right-6 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors duration-300 ease-in-out group-hover:bg-red-600"
              >
                {{ cantidadProducto }}
              </span>
            </div>
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
              class="disney-link block px-4 py-2 text-white transition-colors duration-300"
              [class.active]="rutaActiva() === 'inicio'"
              [class.font-medium]="rutaActiva() === 'inicio'"
              [class.text-opacity-80]="rutaActiva() !== 'inicio'"
            >
              Inicio
            </a>
          </li>
          <li class="relative">
            <a
              routerLink="/catalogo"
              [queryParams]="{ categoria: 'jabones-artesanales' }"
              class="disney-link block px-4 py-2 text-white transition-colors duration-300"
              [class.active]="rutaActiva() === 'catalogo'"
              [class.font-medium]="rutaActiva() === 'catalogo'"
              [class.text-opacity-80]="rutaActiva() !== 'catalogo'"
            >
              Catalogo
            </a>
          </li>

          <li>
            <a
              routerLink="/personalizacion-producto"
              class="disney-link block px-4 py-2 text-white transition-colors duration-300"
              [class.active]="rutaActiva() === 'personalizacion-producto'"
              [class.font-medium]="rutaActiva() === 'personalizacion-producto'"
              [class.text-opacity-80]="
                rutaActiva() !== 'personalizacion-producto'
              "
            >
              Personalización
            </a>
          </li>
          <li>
            <a
              routerLink="/sobre-nosotros"
              class="disney-link block px-4 py-2 text-white transition-colors duration-300"
              [class.active]="rutaActiva() === 'sobre-nosotros'"
              [class.font-medium]="rutaActiva() === 'sobre-nosotros'"
              [class.text-opacity-80]="rutaActiva() !== 'sobre-nosotros'"
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
  public usuarioAutenticado = decodificarToken();
  public menuVisible = signal(false);
  public router = inject(Router);
  public serviceCarrito = inject(CarritoService);
  public cantidadProducto = 0;
  public nuevaCantidad = model<number>(0);
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = computed(() => this.servicioRuta.snapshot.url[0].path);

  constructor() {
    // Verificar si el usuario está autenticado al cargar el componente
    this.serviceCarrito.obtenerCarrito().subscribe({
      next: (respuesta) => {
        this.cantidadProducto = this.serviceCarrito.cantidadProductos();
        console.log('Carrito obtenido:', this.serviceCarrito.cantidadProductos);
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      },
    });
    effect(() => {
      if (this.nuevaCantidad() > 0) {
        console.log('Cantidad nueva:', this.nuevaCantidad());
        this.cantidadProducto += this.nuevaCantidad();
        this.nuevaCantidad.set(0); // Resetea la cantidad después de actualizar
      }
    });
  }

  //metodo para ver modal
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
