import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [Footeer, Headers, ReactiveFormsModule],

  template: `
    <headers></headers>
    <main class="flex flex-col text-[#3C3C3B] md:h-[81dvh]">
      <section class="flex h-full">
        <form
          class="flex w-full flex-col items-center bg-[#eff9ff] pt-9 "
          (ngSubmit)="onSubmit()"
          [formGroup]="formRegistro"
        >
          <h2 class="font-playfair mb-8 text-[25px] font-bold">
            Regístrate en Flor & Cera
          </h2>
          <div class="container px-6 2xl:px-90 lg:px-40">
            <div class="grid grid-cols-1 grid-rows-3 gap-x-4 sm:grid-cols-2">
              <div class="relative flex flex-col mb-4">
                <span class="pl-2 font-medium mb-2">
                  Nombre
                  <span class="text-red-500">*</span>
                </span>
                @let nombreInvalido =
                  (formRegistro.get('nombre')?.invalid &&
                    formRegistro.get('nombre')?.value) ||
                  errores().nombre;

                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    [class]="
                      nombreInvalido ? 'stroke-red-500' : 'stroke-[#3C3C3B]'
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M19 20.75a1 1 0 0 0 1-1v-1.246c.004-2.806-3.974-5.004-8-5.004s-8 2.198-8 5.004v1.246a1 1 0 0 0 1 1zM15.604 6.854a3.604 3.604 0 1 1-7.208 0a3.604 3.604 0 0 1 7.208 0"
                  />
                </svg>
                <input
                  class="placeholder-gris-300 h-[46px] w-full rounded-[15px] border border-[#878787] bg-white p-1.5 pl-12 outline-[#3C3C3B]"
                  [class]="
                    nombreInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                  type="text"
                  placeholder="Ejm. John"
                  id="nombre"
                  formControlName="nombre"
                  (input)="borrarError('nombre')"
                />

                @if (errores().nombre) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (nombreInvalido) {
                  <small class="text-red-600">
                    El nombre no es válido (Ej: John)
                  </small>
                }
              </div>

              <div class="relative flex w-full flex-col ">
                <span class="pl-2 font-medium mb-2">
                  Apellido
                  <span class="text-red-500">*</span>
                </span>
                @let apellidoInvalido =
                  (formRegistro.get('apellido')?.invalid &&
                    formRegistro.get('apellido')?.value) ||
                  errores().apellido;
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    [class]="
                      apellidoInvalido ? 'stroke-red-500' : 'stroke-[#3C3C3B]'
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M19 20.75a1 1 0 0 0 1-1v-1.246c.004-2.806-3.974-5.004-8-5.004s-8 2.198-8 5.004v1.246a1 1 0 0 0 1 1zM15.604 6.854a3.604 3.604 0 1 1-7.208 0a3.604 3.604 0 0 1 7.208 0"
                  />
                </svg>
                <input
                  class="placeholder-gris-300 h-[46px] w-full rounded-[15px] border border-[#878787] bg-white p-1.5 pl-12 outline-[#3C3C3B]"
                  [class]="
                    apellidoInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                  type="text"
                  placeholder="Ejm. Mata"
                  id="apellido"
                  formControlName="apellido"
                  (input)="borrarError('apellido')"
                />
                @if (errores().apellido) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (apellidoInvalido) {
                  <small class="text-red-600">
                    El apellido no es válido (Ej: Mata)
                  </small>
                }
              </div>

              <div class="relative  flex w-full flex-col ">
                <span class="pl-2 font-medium mb-2">
                  Correo electrónico
                  <span class="text-red-500">*</span>
                </span>
                @let emailInvalido =
                  (formRegistro.get('email')?.invalid &&
                    formRegistro.get('email')?.value) ||
                  errores().email;
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    [class]="
                      emailInvalido ? 'stroke-red-500' : 'stroke-[#3C3C3B]'
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <rect width="18.5" height="15.5" x="2.75" y="4.25" rx="3" />
                    <path d="m2.75 8l8.415 3.866a2 2 0 0 0 1.67 0L21.25 8" />
                  </g>
                </svg>
                <input
                  class="placeholder-gris-300 h-[46px] w-full rounded-[15px] border border-[#878787] bg-white p-1.5 pl-12 outline-[#3C3C3B]"
                  [class]="
                    emailInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  id="email"
                  formControlName="email"
                  (input)="borrarError('email')"
                />
                @if (errores().email) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (emailInvalido) {
                  <small class="text-red-600">
                    El correo electrónico no es válido
                    (Ej:ejemplo&#64;gmail.com)
                  </small>
                }
              </div>
              <div class=" mb-2 flex w-full flex-col">
                <span class="pl-2 font-medium mb-2">
                  Género
                  <span class="text-red-500">*</span>
                </span>
                @let generoInvalido =
                  (formRegistro.get('genero')?.invalid &&
                    formRegistro.get('genero')?.value) ||
                  errores().genero;

                <div class="flex h-[46px] items-center">
                  <input
                    [class]="
                      generoInvalido
                        ? 'border-red-600 outline-red-600'
                        : 'border-[#878787] outline-[#3C3C3B]'
                    "
                    type="radio"
                    id="femenino"
                    value="Femenino"
                    formControlName="genero"
                    class="mr-2"
                    (input)="borrarError('genero')"
                  />
                  <label for="femenino" class="mr-4">Femenino</label>

                  <input
                    type="radio"
                    [class]="
                      generoInvalido
                        ? 'border-red-600 outline-red-600'
                        : 'border-[#878787] outline-[#3C3C3B]'
                    "
                    id="masculino"
                    value="Masculino"
                    formControlName="genero"
                    class="mr-2"
                    (input)="borrarError('genero')"
                  />
                  <label for="masculino">Masculino</label>
                </div>
                @if (errores().genero) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (generoInvalido) {
                  <small class="text-red-600">Selecciona un genero</small>
                }
              </div>

              <div class="relative  flex w-full flex-col gap-2">
                <span class="pl-2 font-medium">
                  Contraseña
                  <span class="text-red-500">*</span>
                </span>
                @let passwordInvalido =
                  (formRegistro.get('password')?.invalid &&
                    formRegistro.get('password')?.value) ||
                  errores().password;
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    [class]="
                      passwordInvalido ? 'stroke-red-500' : 'stroke-[#3C3C3B]'
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="10" height="8" x="2" y="5.5" rx="1" />
                    <path d="M10.5 5.5V4a3.5 3.5 0 0 0-7 0v1.5" />
                    <circle cx="7" cy="9.5" r=".5" />
                  </g>
                </svg>
                <input
                  class="placeholder-gris-300 h-[46px] w-full rounded-[15px] border border-[#878787] bg-white p-1.5 pl-12 outline-[#3C3C3B]"
                  [class]="
                    passwordInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                  [type]="passwordVisible() ? 'text' : 'password'"
                  type="password"
                  placeholder="T4!s9vL@qZ#8pR"
                  id="password"
                  formControlName="password"
                  (input)="borrarError('password')"
                />
                @if (errores().password) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (passwordInvalido) {
                  <small class="text-red-600">
                    Debe contener al menos una mayúscula, una minúscula, un
                    número y un carácter especial (&#64;$!%*?&).
                  </small>
                }

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

              <div class="relative flex w-full flex-col gap-2">
                <span class="pl-2 font-medium">
                  Confirmar contraseña
                  <span class="text-red-500">*</span>
                </span>
                @let confirmarPasswordInvalido =
                  (formRegistro.get('confirmarPassword')?.invalid &&
                    formRegistro.get('confirmarPassword')?.value) ||
                  errores().confirmarPassword;
                <svg
                  class="absolute inset-y-0 left-4 my-10"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    [class]="
                      confirmarPasswordInvalido
                        ? 'stroke-red-500'
                        : 'stroke-[#3C3C3B]'
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="10" height="8" x="2" y="5.5" rx="1" />
                    <path d="M10.5 5.5V4a3.5 3.5 0 0 0-7 0v1.5" />
                    <circle cx="7" cy="9.5" r=".5" />
                  </g>
                </svg>
                <input
                  class="placeholder-gris-300 h-[46px] w-full rounded-[15px] border border-[#878787] bg-white p-1.5 pl-12 outline-[#3C3C3B]"
                  [type]="passwordVisible() ? 'text' : 'password'"
                  [class]="
                    confirmarPasswordInvalido
                      ? 'border-red-600 text-red-600 outline-red-600'
                      : 'outline-gris-300 border-[#878787]'
                  "
                  formControlName="confirmarPassword"
                  type="confirmarPassword"
                  placeholder="T4!s9vL@qZ#8pR"
                  id="confirmarPassword"
                  (input)="borrarError('confirmarPassword')"
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
                @if (errores().confirmarPassword) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (confirmarPasswordInvalido) {
                  <small class="text-red-600">
                    Debe contener al menos una mayúscula, una minúscula, un
                    número y un carácter especial (&#64;$!%*?&).
                  </small>
                }
              </div>

              @if (formRegistro.hasError('mismatch')) {
                <small class="text-red-500">Las contraseñas no coinciden</small>
              }
              @if (validacion()) {
                <small class="mt-2 block text-red-500">
                  {{ validacion() }}
                </small>
              }
            </div>
          </div>
          <button
            class="relative mt-4 inline-flex h-12  overflow-hidden rounded-[15px] p-[1px] focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none w-[300px] md:w-1/3"
          >
            <span
              class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
            ></span>

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
              <span
                class="hover:bg-morado-600 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[15px] bg-[#9F93E7] px-3 py-1 font-medium text-white backdrop-blur-3xl transition-colors duration-500"
              >
                Registrarse
              </span>
            }
          </button>

          <p class="mt-4 text-[14px]">
            Si ya tienes una cuenta,
            <a
              class="font-semibold text-purple-600 underline hover:text-purple-800"
              href="/iniciar-sesion"
            >
              inicia sesión
            </a>
            .
          </p>
        </form>
        <!-- Modal -->
      </section>
    </main>
    <footeer></footeer>
  `,
})
export class RegisterPage {
  private serviceAuth = inject(AuthService);
  //variable del ojito
  public passwordVisible = signal<boolean>(false);

  //variable de carga
  public carga = signal<boolean>(false);
  //para la contrasena o email
  public validacion = signal<string>('');

  // Señales para el modal
  public showModal = signal<boolean>(false);
  public modalMessage = signal('');

  //variable para los errores de los campos
  public errores = signal<any>({
    nombre: '',
    apellido: '',
    email: '',
    genero: '',
    password: '',
    confirmarPassword: '',
  }); //para los errores de los campos

  // Validador personalizado para comparar contraseñas
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmarPassword')?.value;

    // No mostrar error si alguno de los campos está vacío
    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { mismatch: true };
  };

  public formRegistro = new FormGroup(
    {
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$'),
      ]), //validacion de nombre y que no sea vacio: required
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$'),
      ]), //validacion de apellido y que no sea vacio: required
      genero: new FormControl<string | null>(null, [Validators.required]),

      email: new FormControl('', [Validators.email, Validators.required]), //valodacion de correo y que no sea vacio: required
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        ),
      ]),
      confirmarPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );
  //metodo para borrar errores del cuando se escribe un nuevo valor
  borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' })); //setea los errores
  }

  //crear un metodo para utilizar cada vez que se presiona un boton
  onSubmit() {
    if (this.formRegistro.valid) {
      this.carga.set(true);

      //metodo creado en el authservice(login)
      this.serviceAuth
        .register(
          this.formRegistro.value.nombre!,
          this.formRegistro.value.apellido!,
          this.formRegistro.value.genero!,
          this.formRegistro.value.email!,
          this.formRegistro.value.password!,
        )
        .subscribe({
          next: (response: any) => {
            //this.serviceRouter.navigate(['/inicio']); //me redireccion a la pantalla de materias, si la peticion fue exitosa
            this.carga.set(false);
            this.modalMessage.set(response.msg); //mensaje de respuesta del backend

            //this.showModal.set(true);
          },
          error: ({ error }: { error: any }) => {
            const { details = [] } = error;
            details.forEach((detail: any) => {
              const { path, msg } = detail;
              this.errores.update((prev) => ({ ...prev, [path]: msg })); //setea los errores
            });
            this.validacion.set(error.msg); //error.response y este contiene el mensaje
            this.carga.set(false);
          },
        });
    } else {
      this.errores.set({
        nombre: this.formRegistro.get('nombre')?.hasError('required'),
        apellido: this.formRegistro.get('apellido')?.hasError('required'),
        email: this.formRegistro.get('email')?.hasError('required'),
        genero: this.formRegistro.get('genero')?.hasError('required'),
        password: this.formRegistro.get('password')?.hasError('required'),
        confirmarPassword: this.formRegistro
          .get('confirmarPassword')
          ?.hasError('required'),
      });
      this.carga.set(false);
    }
    setTimeout(() => {
      this.validacion.set('');
    }, 3000);
  }
}
