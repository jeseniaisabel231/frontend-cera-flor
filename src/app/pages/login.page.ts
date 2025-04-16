import { Component } from '@angular/core';
import { Navegacion } from '../components/header.component';
import { Footeer } from '../components/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Navegacion, Footeer, RouterLink],

  template: `
    <navegacion></navegacion>
    <main class="flex md:h-[83dvh] flex-col text-[#3C3C3B]">
      <section class="flex flex-col md:flex-row h-full">
        <form
          class="md:w-1/2 bg-[#eff9ff] flex flex-col gap-4 items-center w-full pt-20 pb-[30px]"
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
                placeholder="Contraseña"
                id="password"
                name="password"
                formControlName="password"
              />
            </div>
            <div class="text-end mt-2">
              <a class="hover:underline" href="">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          

          <button
            class="mt-8 relative inline-flex h-[46px] overflow-hidden rounded-[15px] p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-2/3 "
          >
            <span
              class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
            ></span>
            <span
              class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[15px] bg-[#9F93E7] px-3 py-1 font-medium text-white backdrop-blur-3xl hover:bg-morado-600 transition-colors duration-500"
            >
              Iniciar sesion
            </span>
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
              Crea tu cuenta para acceder a promociones exclusivas. Disfruta de una experiencia
              sencilla y descubre todo lo que Flor & Cera tiene
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
export class LoginPage {}
