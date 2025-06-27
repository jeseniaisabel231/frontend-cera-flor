import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [Headers, BarranavComponent, ReactiveFormsModule],

  template: `
    <headers></headers>
    <main class="min-h-screen bg-gray-50">
      <barranav rutaSeccionSeleccionada="perfil"></barranav>
      <div class="h-48 w-full bg-gris-200"></div>
      <section
        class="relative mx-auto -mt-24 flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row lg:px-8"
      >
        <section
          class="sticky top-8 h-1/2 w-full flex-shrink-0 rounded-lg bg-white p-4 shadow-sm md:w-64"
        >
          <header class="mb-6 flex flex-col items-center">
            <img
              [src]="perfil.value.imagen"
              [alt]="perfil.value.nombre + ' ' + perfil.value.apellido"
              class="mb-3 h-20 w-20 rounded-full border"
            />
            <h2 class="text-lg font-medium">
              {{ perfil.value.nombre }} {{ perfil.value.apellido }}
            </h2>
            <p class="text-sm text-gray-500">{{ perfil.value.email }}</p>
          </header>

          <nav>
            <ul class="space-y-2">
              <li>
                <a
                  href="/mi-perfil"
                  class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                >
                  <i class="mr-3"></i>
                  Mi perfil
                </a>
              </li>
              <li>
                <a
                  href="/mis-pedidos"
                  class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#9810fa]"
                >
                  <i class="mr-3"></i>
                  Mis pedidos
                </a>
              </li>

              <li
                class="border-t border-gray-200 pt-4"
                (click)="cerrarSesion()"
              >
                <a
                  class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <i class="mr-3"></i>
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </nav>
        </section>

        <article
          class="flex-grow overflow-hidden rounded-lg bg-white shadow-sm"
        >
          <header class=" px-6 py-4">
            <h2 class="text-xl font-semibold text-black">Mi perfil</h2>
          </header>

          <form class="p-6" [formGroup]="perfil">
            <fieldset class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  formControlName="nombre"                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  name="last-name"
                  formControlName="apellido"
                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="mb-1 block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  formControlName="email"
                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  formControlName="telefono"
                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Cedula
                </label>
                <input
                  type="number"
                  formControlName="cedula"
                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  formControlName="fecha_nacimiento"
                  name="fechaNacimiento"
                  required
                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  formControlName="direccion"
                  class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">
                  Género
                </label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked
                      class="focus:ring-morado-400 h-4 w-4 text-indigo-600"
                      formControlName="genero"
                    />
                    <span class="ml-2 text-gray-700">Masculino</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      class="focus:ring-morado-400 h-4 w-4 text-indigo-600"
                      formControlName="genero"
                    />
                    <span class="ml-2 text-gray-700">Femenino</span>
                  </label>
                </div>
              </div>
            </fieldset>

            <!-- <section>
              <h3 class="mb-4 text-lg font-medium text-gray-900">
                Cambiar contraseña
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="mb-1 block text-sm font-medium text-gray-700">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    name="current-password"
                    class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    for="new-password"
                    class="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label class="mb-1 block text-sm font-medium text-gray-700">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>
            </section> -->

            <div class="mt-8 flex justify-end">
              <button
                type="button"
                class="focus:ring-morado-400 mr-4 rounded-[15px] border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="focus:ring-morado-400 rounded-[15px] border border-transparent bg-[#806bff] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#806bff] focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  `,
})
export class ProfilePage {
  public router = inject(Router);
  public servicioPerfil = inject(AuthService);

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
  }
  cargarPerfil() {
    this.servicioPerfil.obtenerPerfil().subscribe({
      next: (respuesta) => {
        this.perfil.patchValue(respuesta.cliente)
      },
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
}
