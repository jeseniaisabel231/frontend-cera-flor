import { Component, signal } from '@angular/core';
import { Navegacion } from '../../components/navegacion.component';
import { Presentation } from "../../components/admin/presentation.component";

@Component({
  imports: [Navegacion, Presentation],
  template: `
    <div class="bg-[#efecff] w-full flex min-h-dvh">
      <navegacion></navegacion>
      <!-- Contenido principal -->

      <div class="grid grid-cols-5 grid-rows-4 gap-4 p-6 w-full border-l border-[#d0c9fe]">
        <presentation titulo="Dashboard" class="col-span-5"></presentation>

        <div
          class="col-span-3 row-span-3 col-start-1 row-start-2 bg-white rounded-[18px]  py-6 px-10"
        >
          <h3 class="text-[17px] font-semibold mb-2 ">
            Total de ventas obtenidas al mes
          </h3>
        </div>
        <div class="col-span-2 row-start-2 rounded-[18px] py-4 px-10  bg-white">
          <h3 class="text-[17px] font-semibold mb-2 ">Usuarios registrados</h3>
          <div class="flex  gap-3 justify-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="41"
              viewBox="0 0 48 41"
              fill="none"
            >
              <path
                d="M32.143 30.646v-2.158c2.912-1.624 5.286-5.67 5.286-9.719C37.429 12.27 37.429 7 29.5 7s-7.929 5.27-7.929 11.77c0 4.048 2.374 8.094 5.286 9.718v2.158C17.893 31.37 11 35.73 11 41h37c0-5.27-6.893-9.63-15.857-10.354"
                fill="#3C3C3B"
              />
              <path
                d="M13.506 32.499c2.283-1.478 5.123-2.6 8.248-3.285a15 15 0 0 1-1.672-2.411 14.8 14.8 0 0 1-1.918-7.188c0-3.515 0-6.836 1.263-9.554 1.226-2.636 3.432-4.27 6.573-4.883C25.302 2.053 23.442 0 18.494 0c-7.926 0-7.926 5.27-7.926 11.77 0 4.048 2.373 8.094 5.284 9.718v2.158C6.89 24.37 0 28.73 0 34h11.517a17 17 0 0 1 1.989-1.499z"
                fill="#3C3C3B"
              />
            </svg>
            <p class="text-4xl font-bold">
              64
              <span class="text-base font-normal ml-1">usuarios</span>
            </p>
          </div>
        </div>

        <div class="col-span-2 row-start-3  rounded-[18px] py-4 px-10 bg-white">
          <h3 class="text-[17px] font-semibold mb-2 ">Productos vendidos</h3>
          <div class="flex  gap-3 justify-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="41"
              viewBox="0 0 38 41"
              fill="none"
            >
              <path
                d="M37.146 12.575a2.9 2.9 0 0 0-2.07-.86h-5.845V10.25a10.26 10.26 0 0 0-2.997-7.248 10.22 10.22 0 0 0-14.468 0 10.26 10.26 0 0 0-2.997 7.248v1.464H2.923a2.92 2.92 0 0 0-2.067.858A2.93 2.93 0 0 0 0 14.642v19.769C0 37.98 3.014 41 6.577 41h24.846a6.6 6.6 0 0 0 4.611-1.88A6.36 6.36 0 0 0 38 34.524V14.643a2.9 2.9 0 0 0-.854-2.068m-11.159 9.572-8.185 10.25a1.46 1.46 0 0 1-1.117.55h-.023a1.46 1.46 0 0 1-1.111-.513l-3.508-4.107a1.464 1.464 0 0 1 2.222-1.904l2.36 2.763 7.08-8.869a1.462 1.462 0 0 1 2.595.753c.043.386-.069.774-.311 1.077zm.32-10.433H11.693V10.25a7.33 7.33 0 0 1 2.14-5.177 7.3 7.3 0 0 1 10.335 0 7.33 7.33 0 0 1 2.14 5.177z"
                fill="#3C3C3B"
              />
            </svg>
            <p class="text-4xl font-bold">
              16
              <span class="text-base font-normal ml-1">productos</span>
            </p>
          </div>
        </div>
        <div class="col-span-2 row-start-4 rounded-[18px] py-6 px-10  bg-white">
          <h3 class="text-[17px] font-semibold mb-2 ">Productos activos</h3>
          <div class="flex  gap-3 justify-center mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <path
                d="M20.5 0C9.196 0 0 9.196 0 20.5S9.196 41 20.5 41 41 31.804 41 20.5 31.804 0 20.5 0m4.75 11.967 2.375 2.076-7.255 8.288-2.375-2.273zM14.185 29.038l-6.954-6.961 2.23-2.23 6.956 6.96zm6.407.078-7.035-7.04 2.231-2.229 4.648 4.653 10.953-12.533 2.375 2.076z"
                fill="#3C3C3B"
              />
            </svg>
            <p class="text-4xl font-bold">
              70
              <span class="text-base font-normal ml-1">productos activos</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardPage {
  //1.false: menu de navegacion oculto
  //Variable que hara que la barra de navegacion se muestre o no se muestre
  public mostrar = signal<boolean>(true);
}
