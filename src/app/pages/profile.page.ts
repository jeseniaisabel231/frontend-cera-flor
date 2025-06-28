import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VentasService } from '../../services/admin/ventas.service';
import { AuthService } from '../../services/auth.service';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],

  template: `
    <headers></headers>
    <main class="min-h-screen bg-gray-50">
      <barranav rutaSeccionSeleccionada="perfil"></barranav>
      <div class="bg-gris-200 h-48 w-full"></div>
      <section
        class="relative mx-auto -mt-24 flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row lg:px-8"
      >
        <section
          class="sticky top-8 h-1/2 w-full flex-shrink-0 rounded-lg bg-white p-4 shadow-sm md:w-64"
        >
          <header class="mb-6 flex flex-col items-center">
            <div class="relative mb-3">
              @if (perfil.value.genero === 'Femenino') {
                <img
                  src="perfilMujer.jpg"
                  [alt]="perfil.value.nombre + ' ' + perfil.value.apellido"
                  class="h-20 w-20 rounded-full border"
                />
              } @else if (perfil.value.genero === 'Masculino') {
                <img
                  src="perfilHombre.jpg"
                  [alt]="perfil.value.nombre + ' ' + perfil.value.apellido"
                  class="h-20 w-20 rounded-full border"
                />
              } @else {
                <div
                  class="flex h-20 w-20 items-center justify-center rounded-full border"
                >
                  <svg
                    class="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="#434343"
                  >
                    <path
                      d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
                    />
                  </svg>
                </div>
              }
              <button
                type="button"
                class="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#9810fa] text-white hover:bg-[#7a0dc7] focus:ring-2 focus:ring-[#9810fa] focus:ring-offset-2 focus:outline-none"
                title="Cambiar foto"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </button>
              <input #fileInput type="file" accept="image/*" class="hidden" />
            </div>

            <h2 class="text-center font-medium">
              {{ perfil.value.nombre }} {{ perfil.value.apellido }}
            </h2>
            <p class="text-sm text-gray-500">{{ perfil.value.email }}</p>
          </header>

          <nav>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/perfil"
                  class="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                  [ngClass]="{
                    'bg-gray-100 text-[#9810fa]': rutaActiva() === 'perfil',
                    'text-gray-600': rutaActiva() !== 'perfil',
                  }"
                >
                  Mi perfil
                </a>
              </li>
              <li>
                <a
                  routerLink="/pedidos"
                  class="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                  [ngClass]="{
                    'bg-gray-100 text-[#9810fa]': rutaActiva() === 'pedidos',
                    'text-gray-600': rutaActiva() !== 'pedidos',
                  }"
                >
                  Mis pedidos
                </a>
              </li>

              <li
                class="border-t border-gray-200 pt-4"
                (click)="cerrarSesion()"
              >
                <a
                  class="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </nav>
        </section>
        @if (rutaActiva() === 'perfil') {
          <article
            class="flex-grow overflow-hidden rounded-lg bg-white shadow-sm"
          >
            <header class="px-6 py-4">
              <h2 class="text-xl font-semibold text-black">Mi perfil</h2>
            </header>

            <form class="p-6" [formGroup]="perfil">
              <fieldset class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    formControlName="nombre"
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    formControlName="apellido"
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="mb-1 block text-sm font-bold text-gray-700"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    formControlName="email"
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    formControlName="telefono"
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Cédula
                  </label>
                  <input
                    type="number"
                    formControlName="cedula"
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    formControlName="fecha_nacimiento"
                    name="fechaNacimiento"
                    required
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    formControlName="direccion"
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Género
                  </label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        [value]="'Masculino'"
                        class="focus:ring-morado-400 h-4 w-4 text-indigo-600"
                        formControlName="genero"
                      />
                      <span class="ml-2 text-gray-700">Masculino</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        [value]="'Femenino'"
                        class="focus:ring-morado-400 h-4 w-4 text-indigo-600"
                        formControlName="genero"
                      />
                      <span class="ml-2 text-gray-700">Femenino</span>
                    </label>
                  </div>
                </div>
              </fieldset>

              <section>
                <h3 class="mb-4 text-lg font-bold text-gray-900">
                  Cambiar contraseña
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-sm font-bold text-gray-700">
                      Contraseña actual
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      for="new-password"
                      class="mb-1 block text-sm font-bold text-gray-700"
                    >
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-bold text-gray-700">
                      Confirmar nueva contraseña
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <div class="mt-8 flex justify-end">
                <button
                  type="button"
                  class="focus:ring-morado-400 mr-4 rounded-[15px] border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="focus:ring-morado-400 rounded-[15px] border border-transparent bg-[#806bff] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#806bff] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </article>
        } @else if (rutaActiva() === 'pedidos') {
          <article
            class="flex-grow overflow-hidden rounded-lg bg-white shadow-sm"
          >
            <!-- ... resto del contenido ... -->
            <header class="px-6 py-4">
              <h2 class="text-xl font-semibold text-black">Mis pedidos</h2>
            </header>
            <!-- Lista de pedidos -->
            <section class="px-6">
              <h2 class="mt-2 text-black">Listado de pedidos recientes</h2>

              <!-- Pedido individual -->
              <article
                class="mb-6 overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <header
                  class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4"
                >
                  <div>
                    <span class="text-sm font-medium text-gray-500"></span>
                    <span class="mx-2 text-gray-300">•</span>
                    <span class="text-morado-200 text-sm font-medium">
                      <span>Estado:</span>
                      Enviado
                    </span>
                    <span class="mx-2 text-gray-300">•</span>
                    <time datetime="2023-05-15" class="text-sm text-gray-500">
                      15 de Mayo, 2023
                    </time>
                  </div>
                  <span class="text-lg font-semibold">
                    $1,250.00
                    <abbr title="Pesos Mexicanos"></abbr>
                  </span>
                </header>

                <div class="p-6">
                  <section>
                    <h3 class="sr-only">Productos del pedido</h3>
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <!-- Producto 1 -->
                      <section class="flex items-start">
                        <img
                          src="https://via.placeholder.com/80x80?text=Jarrón+Barro"
                          class="mr-4 h-16 w-16 rounded-md object-cover"
                          loading="lazy"
                        />
                        <div>
                          <h4 class="text-sm font-medium">Jabon de arroz</h4>
                          <p class="mt-1 text-xs text-gray-500"></p>
                          <p class="mt-1 text-sm font-medium">$</p>
                          <p class="mt-1 text-xs text-gray-500">Cantidad: 1</p>
                          <p class="mt-1 text-xs">Precio:</p>
                        </div>
                      </section>
                    </div>
                  </section>
                </div>
              </article>
              <div class="ml-auto flex items-center">
                <span>Subtotal</span>
                <span>Impuestos</span>
              </div>
            </section>
          </article>
        }
      </section>
    </main>
  `,
})
export class ProfilePage {
  //variables para la navegacion perfil
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = computed(() => this.servicioRuta.snapshot.url[0].path);

  public router = inject(Router);
  public servicioPerfil = inject(AuthService);
  public imagenPersonalizada = signal<string>('');
  public carga = signal<boolean>(true);

  public serviceVentas = inject(VentasService);

  public perfil = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    direccion: new FormControl(''),
    cedula: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    imagen: new FormControl(''),
  });
  constructor() {
    this.cargarPerfil();
    // Cargar imagen personalizada del localStorage si existe
    const imagenGuardada = localStorage.getItem('imagenPerfil');
    if (imagenGuardada) {
      this.imagenPersonalizada.set(imagenGuardada);
    }
    this.serviceVentas.obtener().subscribe({
      next: (respuesta) => {
        console.log('Ventas recibidas:', respuesta);
      },
      error: (error) => {
        console.error('Error al obtener ventas:', error);
      },
    });
  }

  cargarPerfil() {
    this.servicioPerfil.obtenerPerfil().subscribe({
      next: (respuesta) => {
        this.perfil.patchValue(respuesta.cliente);
        console.log('Cliente recibido:', respuesta.cliente);
      },
    });
  }

  obtenerImagenPerfil() {}

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
}
