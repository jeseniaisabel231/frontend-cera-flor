import { Component } from '@angular/core';
import { Navegacion } from '../components/header.component';
import { Footeer } from '../components/footer.component';

@Component({
  template: `
    <navegacion></navegacion>
    <main class="flex md:h-[81dvh] flex-col text-[#3C3C3B] ">
      <section class="flex flex-col md:flex-row h-full ">
        <form
          action=""
          class=" bg-[#eff9ff] flex flex-col  items-center w-full pt-9 px-4"
        >
          <h2 class=" font-playfair font-bold text-[25px] mb-8">
            Regístrate en Flor & Cera
          </h2>
          <!-- <p class="mb-4">
            Regístrate en nuestra Tienda Online y realiza todas tus compras.
          </p> -->
          <div class=" flex gap-12  lg:w-1/2 justify-center">
            <div class="relative mt-2 flex flex-col gap-2 w-full">
              <span class="font-medium pl-2">Nombre</span>
              <svg
                class="absolute left-4 inset-y-0 my-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
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
                type="text"
                placeholder="Ejm. John"
                id="text"
                name="text"
                formControlName="text"
              />
            </div>
            <div class="relative mt-2 flex flex-col gap-2 w-full">
              <span class="font-medium pl-2">Apellido</span>
              <svg
                class="absolute left-4 inset-y-0 my-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
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
                type="text"
                placeholder="Ejm. Mata"
                id="text"
                name="text"
                formControlName="text"
              />
            </div>
          </div>

          <div
            class="mt-2 flex gap-12 lg:w-1/2 justify-center sm:w-[579px] w-full"
          >
            <div class="relative mt-2 flex flex-col gap-2 w-full">
              <span class="font-medium pl-2">Correo Electronico</span>
              <svg
                class="absolute left-4 inset-y-0 my-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#3C3C3B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <rect width="18.5" height="15.5" x="2.75" y="4.25" rx="3" />
                  <path d="m2.75 8l8.415 3.866a2 2 0 0 0 1.67 0L21.25 8" />
                </g>
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
            <div class="mt-2 flex flex-col gap-2 w-full ">
              <label class="pl-3">Género</label>
              <div class="flex h-[46px] items-center ">
                <input
                  type="radio"
                  id="femenino"
                  name="genero"
                  value="femenino"
                />
                <label for="femenino" class=" mr-4 ml-2">Femenino</label>

                <input
                  type="radio"
                  id="masculino"
                  name="genero"
                  value="masculino"
                />
                <label for="masculino" class="ml-2">Masculino</label>
              </div>
            </div>
          </div>

          <div class=" flex gap-12 lg:w-1/2 justify-center">
            <div class="relative mt-2 flex flex-col gap-2 w-full">
              <span class="font-medium pl-2">Contraseña</span>
              <svg
                class="absolute left-4 inset-y-0 my-10"
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
              <input
                class="border-[#878787] bg-white border p-1.5 pl-12 w-full h-[46px] rounded-[15px] outline-[#3C3C3B]"
                type="password"
                placeholder="T4!s9vL@qZ#8pR"
                id="password"
                name="password"
              />
            </div>
            <div class="relative mt-2 flex flex-col gap-2 w-full">
              <span class="font-medium pl-2">Confirmar contraseña</span>
              <svg
                class="absolute left-4 inset-y-0 my-10"
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
              <input
                class="border-[#878787] bg-white border p-1.5 pl-12 w-full h-[46px] rounded-[15px] outline-[#3C3C3B]"
                formControlName="text"
                type=""
                placeholder="T4!s9vL@qZ#8pR"
                id="password"
                name="password"
              />
            </div>
          </div>
          <!-- <div class="flex gap-4 items-center text-[14px] mt-4 lg:w-1/2">
            <input type="checkbox" id="terminos" name="terminos" required />
            <label for="terminos"
              >Confirmo que he leído y acepto los
              <a href="#"
                >Términos, Condiciones y Política de Privacidad</a
              ></label
            >
          </div> -->
          <!-- <button
            class="w-2/3 sm:w-1/5 p-1.5 h-[45px] mt-8 rounded-[15px] bg-[#9F93E7] text-[#FFFFEC] font-medium"
          >
            Registrarse
          </button> -->
          <button
            class="mt-8 relative inline-flex h-12 overflow-hidden rounded-[15px] p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-2/3 sm:w-1/5 "
          >
            <span
              class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
            ></span>
            <span
              class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[15px] bg-[#9F93E7] px-3 py-1 font-medium text-white backdrop-blur-3xl hover:bg-morado-600 transition-colors duration-500"
            >
              Registrarse
            </span>
          </button>
          <p class="mt-4 text-[14px]">
            Si ya tienes una cuenta,
            <a class="text-blue-600 font-semibold underline hover:text-blue-800" href="/iniciar-sesion">inicia sesión</a>.
          </p>
        </form>
      </section>
    </main>
    <footeer></footeer>
  `,
  imports: [Navegacion, Footeer],
})
export class RegisterPage {}
