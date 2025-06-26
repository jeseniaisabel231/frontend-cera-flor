import { Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';

@Component({
  imports: [RouterLink, ReactiveFormsModule, ModalAvisosComponent],
  template: `
    <div
      class="flex min-h-screen items-center justify-center bg-[#bebebe] px-4"
    >
      @if (tipoRespuesta() === 'exito') {
        <div class="w-full max-w-md">
          <form
            (ngSubmit)="onSubmitPassword()"
            [formGroup]="formPassword"
            class="rounded-2xl bg-[#3C3C3B] p-8 shadow-md"
          >
            <h2
              class="mb-4 text-center text-2xl text-[25px] font-medium text-white"
            >
              Restablecer contraseña
            </h2>
            <div class="mb-6 flex flex-col gap-2">
              <div class="relative flex flex-col gap-1">
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    stroke="#3C3C3B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="10" height="8" x="2" y="5.5" rx="1" />
                    <path d="M10.5 5.5V4a3.5 3.5 0 0 0-7 0v1.5" />
                    <circle cx="7" cy="9.5" r=".5" />
                  </g>
                </svg>
                <label class="font-medium text-white">
                  Contraseña
                  <span class="text-red-400">*</span>
                </label>
                <input
                  [type]="passwordVisible() ? 'text' : 'password'"
                  formControlName="nuevaPassword"
                  placeholder="Contraseña"
                  class="h-[46px] w-full rounded-[15px] border bg-white p-1.5 px-4 py-3 pl-12 placeholder-gray-400"
                />
                <svg
                  class="absolute inset-y-0 right-4 my-10 cursor-pointer"
                  (click)="passwordVisible.set(!passwordVisible())"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#3B3D3E"
                >
                  @if (!passwordVisible()) {
                    <path
                      d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"
                    />
                  } @else {
                    <path
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                    />
                  }
                </svg>
              </div>
              <div class="relative flex flex-col gap-1">
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    stroke="#3C3C3B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="10" height="8" x="2" y="5.5" rx="1" />
                    <path d="M10.5 5.5V4a3.5 3.5 0 0 0-7 0v1.5" />
                    <circle cx="7" cy="9.5" r=".5" />
                  </g>
                </svg>
                <label class="font-medium text-white">
                  Confirmar contraseña
                </label>
                <input
                  [type]="passwordVisible() ? 'text' : 'password'"
                  placeholder="Confirmar contraseña"
                  formControlName="confirmarPassword"
                  class="h-[46px] w-full rounded-[15px] border bg-white p-1.5 px-4 py-3 pl-12 placeholder-gray-400"
                />
                <svg
                  class="absolute inset-y-0 right-4 my-10 cursor-pointer"
                  (click)="passwordVisible.set(!passwordVisible())"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#3B3D3E"
                >
                  @if (!passwordVisible()) {
                    <path
                      d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"
                    />
                  } @else {
                    <path
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                    />
                  }
                </svg>
              </div>
              <div class="relative flex flex-col gap-1">
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#292929"
                    d="M7 14q-.825 0-1.412-.587T5 12t.588-1.412T7 10t1.413.588T9 12t-.587 1.413T7 14m0 4q-2.5 0-4.25-1.75T1 12t1.75-4.25T7 6q1.675 0 3.038.825T12.2 9H21l3 3l-4.5 4.5l-2-1.5l-2 1.5l-2.125-1.5H12.2q-.8 1.35-2.162 2.175T7 18m0-2q1.4 0 2.463-.85T10.875 13H14l1.45 1.025L17.5 12.5l1.775 1.375L21.15 12l-1-1h-9.275q-.35-1.3-1.412-2.15T7 8Q5.35 8 4.175 9.175T3 12t1.175 2.825T7 16"
                  />
                </svg>
                <label for="" class="font-medium text-white">
                  Código de confirmación
                  <span class="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Código de confirmación"
                  formControlName="codigoRecuperacion"
                  class="h-[46px] w-full rounded-[15px] border bg-white p-1.5 px-4 py-3 pl-12 placeholder-gray-400"
                />
              </div>
            </div>
            
            <button
              type="submit"
              class="hover:bg-morado-600 relative inline-flex h-[46px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[15px] bg-[#9F93E7] p-[1px] px-3 py-1 font-medium text-white backdrop-blur-3xl transition-colors duration-500"
            >
            @if(carga()){
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
            }@else {

              Recuperar
            }
            </button>
          </form>
        </div>
      } @else {
        <div class="w-full max-w-md">
          <form
            class="rounded-2xl bg-[#3C3C3B] p-8 shadow-md"
            [formGroup]="formulario"
            (ngSubmit)="onSubmit()"
          >
            <h2
              class="mb-4 text-center text-2xl text-[25px] font-medium text-white"
            >
              Recuperar contraseña
            </h2>
            <label class="font-medium text-white">
              Correo electrónico
              <span class="text-red-400">*</span>
            </label>

            <div class="relative mt-1 mb-6">
              @let emailInvalido =
                formulario.get('email')?.invalid &&
                formulario.get('email')?.value;

              <input
                type="email"
                placeholder="Ingresa tu correo"
                class="h-[46px] w-full rounded-[15px] border bg-white p-1.5 px-4 py-3 pl-12 placeholder-gray-400"
                formControlName="email"
                (input)="borrarError()"
                [class]="
                  emailInvalido
                    ? 'border-red-400 text-red-400 outline-red-400'
                    : 'border-[#878787] text-[#3C3C3B] outline-[#3C3C3B]'
                "
              />

              <div class="absolute top-3 left-3 cursor-pointer text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    [class]="
                      emailInvalido ? 'stroke-red-400' : 'stroke-[#3C3C3B]'
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <rect width="18.5" height="15.5" x="2.75" y="4.25" rx="3" />
                    <path d="m2.75 8l8.415 3.866a2 2 0 0 0 1.67 0L21.25 8" />
                  </g>
                </svg>
              </div>
              @if (error()) {
                <small class="text-red-400">{{ error() }}</small>
              } @else if (emailInvalido) {
                <small class="text-red-400">
                  Por favor, ingresa un correo electrónico válido.
                </small>
              }
            </div>

            <button
              type="submit"
              class="hover:bg-morado-600 relative inline-flex h-[46px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[15px] bg-[#9F93E7] p-[1px] px-3 py-1 font-medium text-white backdrop-blur-3xl transition-colors duration-500"
            >
              @if (loading()) {
                <svg
                  class="h-5 w-5 animate-spin text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              } @else {
                Recuperar Contraseña
              }
            </button>

            <div class="mt-6 text-center text-sm text-gray-300">
              ¿No tienes cuenta en Flor & Cera?
              <a
                routerLink="/registrarse"
                class="text-morado-500 hover:underline"
              >
                Registrarse
              </a>
              <br />
              También puedes
              <a
                routerLink="/iniciar-sesion"
                class="text-morado-500 hover:underline"
              >
                iniciar sesión
              </a>
            </div>
          </form>
        </div>
      }
    </div>
    <app-modal
      [(mostrarModal)]="mostrarModal"
      [titulo]="titulo()"
      [mensaje]="mensaje()"
      [tipo]="tipoRespuesta()"
    ></app-modal>
    <app-modal
      [(mostrarModal)]="mostrarModalPassword"
      [titulo]="titulo()"
      [mensaje]="mensaje()"
      [tipo]="tipoRespuestaPassword()"
    ></app-modal>
  `,
})
export class RecuperarContrasenia {
  public authService = inject(AuthService);
  public mostrarModal = signal<boolean>(false);
  public titulo = signal('');
  public mensaje = signal('');
  public mostrarModalPassword = signal<boolean>(false);
  public tipoRespuestaPassword = signal<'exito' | 'error'>('error');
  public passwordVisible = signal<boolean>(false);
  public carga = signal<boolean>(false);
  //variable para el formulario de recuperar contrasena cuando este sea exitoso
  public tipoRespuesta = signal<'exito' | 'error'>('error');

  public formPassword = new FormGroup({
    nuevaPassword: new FormControl('', [Validators.required]),
    confirmarPassword: new FormControl('', [Validators.required]),
    codigoRecuperacion: new FormControl('', [Validators.required]),
  });

  public router = inject(Router);

  public loading = signal(false);

  public formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public error = signal('');
  constructor() {
    effect(() => {
      if (
        !this.mostrarModalPassword() &&
        this.tipoRespuestaPassword() === 'exito'
      ) {
        this.router.navigate(['/iniciar-sesion']);
      }
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.loading.set(true);
      this.authService
        .recuperarContrasenia(this.formulario.value.email!)
        .subscribe({
          next: (res) => {
            //momentaneamente
            //this.error.set(res.msg);
            this.titulo.set('Éxito');
            this.mensaje.set(res.msg);

            this.tipoRespuesta.set('exito');
            this.mostrarModal.set(true);
          },
          error: (err) => {
            //this.error.set(err.error.msg);
            this.titulo.set('Error');
            this.mensaje.set(err.error.msg);
            this.tipoRespuesta.set('error');
            this.mostrarModal.set(true);
          },
        })
        .add(() => {
          this.loading.set(false);
        });
    } else {
      this.error.set('Por favor, ingresa un correo electrónico válido.');
    }
  }
  //metodo para borrar errores del cuando se escribe un nuevo valor
  borrarError() {
    this.error.set('');
  }

  //metodo para el formulario de reestablecer contrasnia
  onSubmitPassword() {
    // Verificar si las contraseñas coinciden
    if (
      this.formPassword.value.nuevaPassword !==
      this.formPassword.value.confirmarPassword
    ) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }
    if (this.formPassword.valid) {
      this.carga.set(true);
      this.authService
        .restablecerContrasenia(
          this.formulario.value.email!,
          this.formPassword.value.nuevaPassword!,
          this.formPassword.value.codigoRecuperacion!,
        )
        .subscribe({
          next: (res) => {
            this.titulo.set('Éxito');
            this.mensaje.set(res.msg);
            this.tipoRespuestaPassword.set('exito');

            this.mostrarModalPassword.set(true);
            console.log(res);
            
          },
          error: (err) => {
            this.titulo.set('Error');
            this.mensaje.set(err.error.msg);
            this.tipoRespuesta.set('error');
            this.mostrarModal.set(true);
          },
        })
        .add(() => {
          this.carga.set(false);
        });
    } else {
      // Manejo de errores para el formulario de reestablecer contraseña
      this.error.set('Por favor, completa todos los campos correctamente.');
    }
  }
}
