import { Component, inject, signal } from '@angular/core';
import { Headers } from '../components/header.component';
import { Footeer } from '../components/footer.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [Headers, Footeer, RouterLink, ReactiveFormsModule],

  template: `
    <headers></headers>
    <main class="flex md:h-[83dvh] flex-col text-[#3C3C3B]">
      <section class="flex flex-col md:flex-row h-full">
        <form
          class="md:w-1/2 bg-[#eff9ff] flex flex-col gap-4 items-center w-full pt-20 pb-[30px]"
          (ngSubmit)="onSubmit()"
          [formGroup]="formulario"
        >
          <h1 class=" font-playfair font-bold text-[25px]">
            Ingresar a tu cuenta
          </h1>

          <div class="w-2/3 mt-6">
            <span class="font-medium">Correo electronico</span>
            <div class="relative mt-2">
              <svg
                class="absolute left-3 inset-y-0 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#3C3C3B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19 20.75a1 1 0 0 0 1-1v-1.246c.004-2.806-3.974-5.004-8-5.004s-8 2.198-8 5.004v1.246a1 1 0 0 0 1 1zM15.604 6.854a3.604 3.604 0 1 1-7.208 0a3.604 3.604 0 0 1 7.208 0"
                />
              </svg>
              <input
                class="border-[#878787] bg-white border p-1.5 pl-12 w-full h-[46px] rounded-[15px] outline-[#3C3C3B]"
                type="email"
                placeholder="ejemplo@gmail.com"
                id="email"
                name="email"
                formControlName="email"
              />
            </div>
          </div>

          <div class="w-2/3 ">
            <span class="font-medium">Contraseña</span>
            <div class="relative mt-2">
              <svg
                class="absolute left-3 inset-y-0 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
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
              <input
                class="border-[#878787] bg-white pl-12 border p-1.5 w-full h-[46px] rounded-[15px] outline-[#3C3C3B] "
                [type]="passwordVisible() ? 'text' : 'password'"
                placeholder="Contraseña"
                id="password"
                name="password"
                formControlName="password"
              />
              <div
                class="flex items-center justify-center absolute right-3 inset-y-0"
              >
                @if (!passwordVisible()) {
                <svg
                  class="cursor-pointer"
                  (click)="passwordVisible.set(!passwordVisible())"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#3B3D3E"
                >
                  <path
                    d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"
                  />
                </svg>
                }@else{
                <svg
                  class="cursor-pointer "
                  (click)="passwordVisible.set(!passwordVisible())"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#3B3D3E"
                >
                  <path
                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                  />
                </svg>

                }
              </div>
            </div>
            <div class="text-end mt-2">
              <a class="hover:underline" routerLink="/recuperar-contrasena">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <p class="mx-auto text-[14px] text-red-700 mt-4">
            {{ validacion() }}
          </p>

          <button
            class="mt-8 relative inline-flex h-[46px] overflow-hidden rounded-[15px] p-[1px] w-2/3 "
          >
            <span
              class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
            ></span>

            @if (carga()){
            <svg
              class="animate-spin fill-[#ffffff] m-auto"
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
            <span
              class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[15px] bg-[#9F93E7] px-3 py-1 font-medium text-white backdrop-blur-3xl hover:bg-morado-600 transition-colors duration-500"
            >
              Iniciar sesion
            </span>
            }
          </button>
        </form>

        <aside
          class="md:w-1/2 bg-[#fdfdf3] flex items-center flex-col pt-20 pb-[30px]"
        >
          <div
            class="w-full gap-4 items-center  flex flex-col justify-centerst"
          >
            <h1 class="font-playfair font-bold text-[25px]">
              ¿No estás registrado?
            </h1>
            <p class="w-2/3">
              Crea tu cuenta para acceder a promociones exclusivas. Disfruta de
              una experiencia sencilla y descubre todo lo que Flor & Cera tiene
              para ti.
            </p>
          </div>

          <a
            routerLink="/registro"
            class="mt-10 relative inline-flex h-[46px] overflow-hidden rounded-[15px] p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-1/2"
          >
            <span
              class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
            ></span>
            <span
              class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[15px] bg-white px-3 py-1 font-medium text-gris-500 backdrop-blur-3xl hover:bg-morado-200 transition-colors duration-500"
            >
              Registrarse
            </span>
          </a>
        </aside>
      </section>
    </main>
    <footeer></footeer>
  `,
})
export class LoginPage {
  private serviceAuth = inject(AuthService);
  private serviceRouter = inject(Router); //para las rutas

  //variable del ojito
  public passwordVisible = signal<boolean>(false);

  //variable de carga
  public carga = signal<boolean>(false);

  //para la contrasena o email
  public validacion = signal<string>('');

  public formulario = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]), //valodacion de correo y que no sea vacio: required
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  
  //crear un metodo para utilizar cada vez que se presiona un boton
  onSubmit() {
    if (this.formulario.valid) {
      this.carga.set(true);
      
      this.serviceAuth
        .login(this.formulario.value.email!, this.formulario.value.password!)
        .subscribe({
          next: (response: any) => {
            const userEmail = this.formulario.value.email!;
            
            // Lista de correos de administradores (podrías obtenerla del backend también)
            const adminEmails = ['estefi2000ms2@gmail.com'];
            
            if (adminEmails.includes(userEmail.toLowerCase())) {
              this.serviceRouter.navigate(['/admin/dashboard']);
            } else {
              this.serviceRouter.navigate(['/inicio']);
            }
            
            this.carga.set(false);
          },
          error: ({ error }: { error: any }) => {
            this.validacion.set(error.msg);
            this.carga.set(false);
          },
        });
    } else {
      this.validacion.set('Complete correctamente los campos');
      this.carga.set(false);
    }
    setTimeout(() => {
      this.validacion.set('');
    }, 3000);
  }
}
