import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FacturaService } from '../../services/facturas.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { BarranavComponent } from '../components/barranav.component';
import { BillComponent } from '../components/bill.component';
import { Headers } from '../components/header.component';
import { usuario } from '../interfaces/usuario.interface';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    TitleCasePipe,
    ModalAvisosComponent,
    BillComponent,
  ],

  template: `
    <headers></headers>
    <main class="min-h-screen bg-gray-50">
      <barranav rutaSeccionSeleccionada="perfil"></barranav>
      <img class="h-48 w-full object-cover" src="fondoperfil.png" alt="" />

      <section
        class="relative mx-auto -mt-24 flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row lg:px-8"
      >
        <section
          class="sticky top-8 h-1/2 w-full flex-shrink-0 rounded-lg bg-white p-4 shadow-sm md:w-64"
        >
          <header class="mb-6 flex flex-col items-center">
            <label for="foto" class="relative mb-3">
              @if (perfilFormulario.value.genero) {
                <img
                  [src]="
                    imagePreview ||
                    (perfilFormulario.value.genero === 'masculino'
                      ? 'perfilHombre.jpg'
                      : 'perfilMujer.jpg')
                  "
                  [alt]="
                    perfilFormulario.value.nombre +
                    ' ' +
                    perfilFormulario.value.apellido
                  "
                  class="h-20 w-20 rounded-full border object-cover"
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
              <div
                class="absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#9810fa] text-white hover:bg-[#7a0dc7] focus:ring-2 focus:ring-[#9810fa] focus:ring-offset-2 focus:outline-none"
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
              </div>
              <input
                type="file"
                hidden
                accept="image/*"
                id="foto"
                (input)="onFileChange($event)"
              />
            </label>

            <h2 class="text-center font-medium">
              {{ perfilFormulario.value.nombre }}
              {{ perfilFormulario.value.apellido }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ perfilFormulario.value.email }}
            </p>
          </header>

          <nav>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/perfil"
                  class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
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
                  class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
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
                  class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
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
            data-testid="perfil-articulo"
          >
            <header class="px-6 py-4">
              <h2 class="text-xl font-semibold text-black">Mi perfil</h2>
            </header>

            <form
              class="p-6"
              [formGroup]="perfilFormulario"
              (ngSubmit)="onSubmit()"
              data-testid="formulario-perfil"
            >
              <fieldset class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Nombre
                  </label>
                  @let nombreInvalido =
                    (perfilFormulario.get('nombre')?.invalid &&
                      perfilFormulario.get('nombre')?.value) ||
                    errores().nombre;
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    formControlName="nombre"
                    placeholder="Ej.. John"
                    [class]="
                      nombreInvalido
                        ? 'border-red-600 text-red-600 outline-red-600'
                        : 'outline-gris-300 border-[#878787]'
                    "
                    class="placeholder-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 outline-[#3C3C3B]"
                    (input)="borrarError('nombre')"
                    data-testid="nombre-input"
                  />
                  <div>
                    @if (errores().nombre) {
                      <small class="text-red-600">{{ errores().nombre }}</small>
                    } @else if (nombreInvalido) {
                      <small class="wrap-break-word text-red-600">
                        El nombre debe tener entre 3 y 30 caracteres y solo
                        contener letras y espacios.
                      </small>
                    }
                  </div>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Apellido
                  </label>
                  @let apellidoInvalido =
                    (perfilFormulario.get('apellido')?.invalid &&
                      perfilFormulario.get('apellido')?.value) ||
                    errores().apellido;
                  <input
                    type="text"
                    name="last-name"
                    formControlName="apellido"
                    placeholder="Ej.. Mata"
                    [class]="
                      apellidoInvalido
                        ? 'border-red-600 text-red-600 outline-red-600'
                        : 'outline-gris-300 border-[#878787]'
                    "
                    class="placeholder-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 outline-[#3C3C3B]"
                    (input)="borrarError('apellido')"
                    data-testid="apellido-input"
                  />
                  <div>
                    @if (errores().apellido) {
                      <small class="text-red-600">
                        {{ errores().apellido }}
                      </small>
                    } @else if (apellidoInvalido) {
                      <small class="wrap-break-word text-red-600">
                        El apellido debe tener entre 3 y 20 caracteres y solo
                        contener letras y espacios.
                      </small>
                    }
                  </div>
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
                    placeholder="ejemplo@gmail.com"
                    [value]="perfilFormulario.value.email"
                    disabled
                    class="placeholder-gris-300 outline-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                    data-testid="email-input"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Teléfono
                  </label>
                  @let telefonoInvalido =
                    (perfilFormulario.get('telefono')?.invalid &&
                      perfilFormulario.get('telefono')?.value) ||
                    errores().telefono;
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    formControlName="telefono"
                    placeholder="Ej.. 0999999999"
                    [class]="
                      telefonoInvalido
                        ? 'border-red-600 text-red-600 outline-red-600'
                        : 'outline-gris-300 border-[#878787]'
                    "
                    class="placeholder-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 outline-[#3C3C3B]"
                    (input)="borrarError('telefono')"
                    data-testid="telefono-input"
                  />
                  <div>
                    @if (errores().telefono) {
                      <small class="text-red-600">
                        {{ errores().telefono }}
                      </small>
                    } @else if (telefonoInvalido) {
                      <small class="wrap-break word text-red-600">
                        El teléfono debe tener 10 dígitos numéricos.
                      </small>
                    }
                  </div>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Cédula
                  </label>
                  @let cedulaInvalida =
                    (perfilFormulario.get('cedula')?.invalid &&
                      perfilFormulario.get('cedula')?.value) ||
                    errores().cedula;
                  <input
                    type="text"
                    placeholder="Ej.. 1234567890"
                    formControlName="cedula"
                    class="placeholder-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 outline-[#3C3C3B]"
                    [class]="
                      cedulaInvalida
                        ? 'border-red-600 text-red-600 outline-red-600'
                        : 'outline-gris-300 border-[#878787]'
                    "
                    (input)="borrarError('cedula')"
                    data-testid="cedula-input"
                  />
                  <div>
                    @if (errores().cedula) {
                      <small class="text-red-600">{{ errores().cedula }}</small>
                    } @else if (cedulaInvalida) {
                      <small class="wrap-break-word text-red-600">
                        La cédula debe tener 10 dígitos numéricos.
                      </small>
                    }
                  </div>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Fecha de nacimiento
                  </label>
                  @let fechaInvalida =
                    (perfilFormulario.get('fecha_nacimiento')?.invalid &&
                      perfilFormulario.get('fecha_nacimiento')?.value) ||
                    errores().fecha_nacimiento;
                  <input
                    type="date"
                    formControlName="fecha_nacimiento"
                    name="fechaNacimiento"
                    required
                    class="placeholder-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 outline-[#3C3C3B]"
                    [class]="
                      fechaInvalida
                        ? 'border-red-600 outline-red-600'
                        : 'border-[#878787] outline-[#3C3C3B]'
                    "
                    (input)="borrarError('fecha_nacimiento')"
                    data-testid="fecha-nacimiento-input"
                  />
                  <div>
                    @if (errores().fecha_nacimiento) {
                      <small class="text-red-600">
                        {{ errores().fecha_nacimiento }}
                      </small>
                    } @else if (fechaInvalida) {
                      <small class="wrap-break-word text-red-600">
                        La fecha de nacimiento es obligatoria y debe ser válida.
                      </small>
                    }
                  </div>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Dirección
                  </label>
                  @let direccionInvalida =
                    (perfilFormulario.get('direccion')?.invalid &&
                      perfilFormulario.get('direccion')?.value) ||
                    errores().direccion;
                  <input
                    type="text"
                    name="address"
                    placeholder="Ej.. Calle Falsa 123"
                    formControlName="direccion"
                    class="placeholder-gris-300 w-full rounded-lg border border-gray-300 px-3 py-2 outline-[#3C3C3B]"
                    [class]="
                      direccionInvalida
                        ? 'border-red-600 text-red-600 outline-red-600'
                        : 'outline-gris-300 border-[#878787]'
                    "
                    (input)="borrarError('direccion')"
                    data-testid="direccion-input"
                  />
                  <div>
                    @if (errores().direccion) {
                      <small class="text-red-600">
                        {{ errores().direccion }}
                      </small>
                    } @else if (direccionInvalida) {
                      <small class="wrap-break-word text-red-600">
                        La dirección debe tener entre 5 y 30 caracteres.
                      </small>
                    }
                  </div>
                </div>
                <div>
                  <label class="mb-1 block text-sm font-bold text-gray-700">
                    Género
                  </label>
                  <div class="flex space-x-4">
                    @let generoInvalido =
                      (perfilFormulario.get('genero')?.invalid &&
                        perfilFormulario.get('genero')?.value) ||
                      errores().genero;
                    <label class="inline-flex items-center">
                      <input
                        formControlName="genero"
                        type="radio"
                        value="masculino"
                        class="focus:ring-morado-400 h-4 w-4 text-indigo-600"
                        [class]="
                          generoInvalido
                            ? 'border-red-600 outline-red-600'
                            : 'border-[#878787] outline-[#3C3C3B]'
                        "
                        (input)="borrarError('genero')"
                        data-testid="genero-input"
                      />
                      <span class="ml-2 text-gray-700">Masculino</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        formControlName="genero"
                        type="radio"
                        [class]="
                          generoInvalido
                            ? 'border-red-600 outline-red-600'
                            : 'border-[#878787] outline-[#3C3C3B]'
                        "
                        value="femenino"
                        class="h-4 w-4 text-indigo-600"
                        (input)="borrarError('genero')"
                        data-testid="genero-input"
                      />
                      <span class="ml-2 text-gray-700">Femenino</span>
                    </label>
                  </div>
                  @if (errores().genero) {
                    <small class="text-red-600">
                      Este campo es obligatorio.
                    </small>
                  } @else if (generoInvalido) {
                    <small class="text-red-600">Selecciona un género</small>
                  }
                </div>
              </fieldset>

              <div class="mt-8 flex justify-end">
                <button
                  type="button"
                  class="focus:ring-morado-400 mr-4 cursor-pointer rounded-[15px] border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="focus:ring-morado-400 cursor-pointer rounded-[15px] border border-transparent bg-[#806bff] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#806bff] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  data-testid="boton-actualizar-perfil"
                >
                  @if (carga()) {
                    <svg
                      class="m-auto animate-spin fill-[#ffffff]"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
                      />
                    </svg>
                  } @else {
                    Guardar cambios
                  }
                </button>
              </div>
            </form>
          </article>
        } @else if (rutaActiva() === 'pedidos') {
          <article
            class="flex-grow overflow-hidden rounded-lg bg-white shadow-sm"
          >
            <header class="px-6 py-4">
              <h2 class="text-xl font-semibold text-black">Mis pedidos</h2>
            </header>
            <section class="px-6">
              @if (servicioFacturas.carga()) {
                <div class="flex justify-center p-8">
                  <svg
                    class="h-8 w-8 animate-spin"
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
                  <span class="ml-2">Cargando pedidos...</span>
                </div>
              } @else {
                <h2 class="mt-2 text-black">Listado de pedidos recientes</h2>

                <!-- Iterar sobre cada venta/pedido -->
                @for (venta of servicioFacturas.facturas(); track $index) {
                  <details
                    class="group mb-6 overflow-hidden rounded-lg bg-white shadow-sm"
                    data-testid="detalle-pedido"
                  >
                    <summary
                      class="group-open:bg-morado-400 flex cursor-pointer items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4"
                    >
                      <div>
                        <span
                          class="text-sm font-medium text-gray-500 group-open:text-white"
                        >
                          Pedido {{ venta._id.slice(-8) }}
                        </span>
                        <span class="mx-2 text-gray-300">•</span>
                        <span
                          class="text-sm font-medium group-open:text-white"
                          [class]="venta.estado === 'finalizado' ? 'text-green-600' : 'text-gray-500'"
                        >
                          Estado de entrega: {{ venta.estado | titlecase }}
                        </span>
                        <span class="mx-2 text-gray-300">•</span>
                        <time
                          class="text-sm text-gray-500 group-open:text-white"
                        >
                          {{ venta.fecha_venta | date: 'dd/MM/yyyy' }}
                        </time>
                      </div>
                      <div class="flex gap-x-4">
                        <span
                          class="text-lg font-bold text-gray-800 group-open:text-white"
                          data-testid="total-pedido"
                        >
                          {{ venta.total | currency: 'USD' : 'symbol' }}
                        </span>
                        <button
                          class="bg-morado-600 hover:bg-morado-700 mr-[3px] flex h-6 w-[36px] cursor-pointer items-center justify-center rounded-[9px] px-2 text-white"
                          (click)="verPDF(venta)"
                          title="Visualizar información"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-6"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                            />
                          </svg>
                        </button>
                      </div>
                    </summary>

                    <div class="p-6">
                      <section>
                        <div class="space-y-4">
                          <!-- Iterar sobre cada producto de la venta -->
                          @for (item of venta.productos; track item._id) {
                            @if (item.producto_id) {
                              <section
                                class="flex items-start border-b border-gray-100 pb-4"
                                data-testid="producto-pedido"
                              >
                                <img
                                  [src]="item.imagen ?? 'logo.png'"
                                  class="mr-4 h-16 w-16 rounded-md object-cover"
                                  loading="lazy"
                                  [alt]="item.nombre"
                                  data-testid="imagen-producto"
                                />
                                <div class="flex-grow">
                                  <h4 class="text-sm font-medium">
                                    {{
                                      item.tipo === 'normal'
                                        ? item.nombre
                                        : item.tipo === 'ia'
                                          ? 'Producto personalizado por IA'
                                          : 'Producto personalizado'
                                    }}
                                  </h4>
                                  <p
                                    class="mt-1 line-clamp-2 text-xs text-gray-500"
                                  >
                                    {{
                                      item.descripcion ??
                                        obtenerDescripcionProductoPersonalizado(
                                          item.ingredientes
                                        )
                                    }}
                                  </p>
                                  <div
                                    class="mt-2 flex items-center gap-4 text-sm"
                                  >
                                    <span
                                      class="text-gray-600"
                                      data-testid="cantidad-producto"
                                    >
                                      Cantidad: {{ item.cantidad }}
                                    </span>
                                    <span
                                      class="text-gray-600"
                                      data-testid="precio-producto"
                                    >
                                      Precio unit.:
                                      {{
                                        item.precio | currency: 'USD' : 'symbol'
                                      }}
                                    </span>
                                    <span class="font-medium">
                                      Subtotal:
                                      {{
                                        item.subtotal
                                          | currency: 'USD' : 'symbol'
                                      }}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            } @else {
                              <section
                                class="flex items-start border-b border-gray-100 pb-4 last:border-b-0"
                              >
                                <div
                                  class="mr-4 flex h-16 w-16 items-center justify-center rounded-md bg-gray-200"
                                >
                                  <span class="text-xs text-gray-400">N/A</span>
                                </div>
                                <div class="flex-grow">
                                  <h4 class="text-sm font-medium text-red-600">
                                    Producto no disponible
                                  </h4>
                                  <p class="mt-1 text-xs text-gray-500">
                                    Este producto ya no está disponible en
                                    nuestro catálogo
                                  </p>
                                  <div
                                    class="mt-2 flex items-center gap-4 text-sm"
                                  >
                                    <span class="text-gray-600">
                                      Cantidad: {{ item.cantidad }}
                                    </span>
                                    <span class="font-medium">
                                      Subtotal:
                                      {{
                                        item.subtotal
                                          | currency: 'USD' : 'symbol'
                                      }}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            }
                          }
                        </div>
                      </section>
                    </div>
                  </details>
                } @empty {
                  <div class="p-8 text-center">
                    <p class="text-gray-500">No tienes pedidos aún</p>
                  </div>
                }
              }
            </section>
          </article>
          <app-bill
            [(mostrarModal)]="mostrarPDF"
            [verVenta]="ventaAsignada()"
            [datosCliente]="datosCliente()"
          />
        }
      </section>
      <app-modal
        [(mostrarModal)]="mostrarModalPerfil"
        [mensaje]="mensajePerfil()"
        [tipo]="tipoModalPerfil()"
      />
    </main>
  `,
})
export class ProfilePage {
  public servicioRuta = inject(ActivatedRoute);
  public rutaActiva = signal(this.servicioRuta.snapshot.url[0].path);
  public router = inject(Router);
  public servicioPerfil = inject(AuthService);
  public servicioFacturas = inject(FacturaService);
  public imagenPersonalizada = signal<string>('');
  public carga = signal<boolean>(false);
  public ventaAsignada = signal<any>(null);
  public datosCliente = signal<any>(null);
  public mostrarPDF = signal<boolean>(false);

  public mostrarModalPerfil = signal<boolean>(false);
  public mensajePerfil = signal<string>('');
  public tipoModalPerfil = signal<'error' | 'exito'>('error');

  public perfilFormulario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,30}$/),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,20}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    genero: new FormControl('', Validators.required),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.pattern(/^.{5,30}$/),
    ]),
    cedula: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    fecha_nacimiento: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });

  public errores = signal<any>({
    imagen: '',
    nombre: '',
    apellido: '',
    email: '',
    genero: '',
    telefono: '',
    direccion: '',
    cedula: '',
    fecha_nacimiento: '',
  });

  public borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' }));
  }

  constructor() {
    effect(() => {
      const datosUsuario = this.servicioPerfil.datosUsuario();
      datosUsuario.genero = datosUsuario.genero?.toLowerCase() ?? '';
      datosUsuario.fecha_nacimiento =
        datosUsuario.fecha_nacimiento?.split('T')[0] ?? '';
      this.perfilFormulario.patchValue(datosUsuario);
      this.imagePreview = datosUsuario?.imagen ?? '';
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  onSubmit() {
    const datosUsuario = this.servicioPerfil.datosUsuario();
    Object.entries(this.perfilFormulario.value).forEach(([key, value]) => {
      if (datosUsuario[key as keyof usuario] !== value && !value) {
        this.errores.update((prev) => ({
          ...prev,
          [key]: 'Este campo no debería estar vacío',
        }));
      }
    });
    const existeErrores = Object.values(this.errores()).some((error) => {
      return error !== '';
    });
    if (existeErrores) {
      this.mostrarModalPerfil.set(true);
      this.tipoModalPerfil.set('error');
      this.mensajePerfil.set('Por favor, corrige los errores del formulario.');
      return;
    }

    this.carga.set(true);
    const formData = this.toFormData();
    this.servicioPerfil
      .actualizarPerfil(formData)
      .subscribe({
        next: ({ msg }) => {
          this.mensajePerfil.set(msg);
          this.tipoModalPerfil.set('exito');
        },
        error: ({ error }) => {
          this.mensajePerfil.set(error.msg);
          this.tipoModalPerfil.set('error');
        },
      })
      .add(() => {
        this.carga.set(false);
        this.mostrarModalPerfil.set(true);
      });
  }

  public toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.perfilFormulario.value).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as any);
      }
    });
    return formData;
  }

  public imagePreview: string | ArrayBuffer | null = null;
  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => (this.imagePreview = reader.result);
      this.perfilFormulario.patchValue({
        imagen: file,
      });
    }
  }

  public obtenerDescripcionProductoPersonalizado(ingredientes: any[]) {
    return `Ingredientes utilizados: ${ingredientes
      .map((ing) => ing.nombre)
      .join(', ')}`;
  }

  public verPDF(fila: any) {
    const { cliente, ...venta } = fila;
    this.ventaAsignada.set(venta);
    this.datosCliente.set(cliente);
    this.mostrarPDF.set(true);
  }
}
