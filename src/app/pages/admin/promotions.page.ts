import { Component, signal } from '@angular/core';
import { Navegacion } from '../../components/navegacion.component';
import { Formulario } from '../../components/admin/formproduct.component';
import { Formularioprom } from "../../components/formprom.component";
import { Presentation } from "../../components/admin/presentation.component";
@Component({
  imports: [Navegacion, Formularioprom, Presentation],
  template: `
    <div class="bg-[#efecff] w-full flex min-h-dvh">
      <navegacion></navegacion>
      <div class="grid grid-cols-5 grid-rows-4 gap-4 p-6 w-full border-l border-[#d0c9fe]">
      <presentation titulo="Promociones" class="col-span-5"></presentation>

        <div
          class="overflow-auto w-full col-span-5 row-span-3 col-start-1 row-start-2 bg-white rounded-[18px]  py-6 px-10 shadow-md"
        >
          <div class="flex justify-between">
            <div
              class="flex sm:flex-row sm:items-center w-full sm:w-80 bg-[#F3F5F7] border border-[#eaeaea] rounded-[18px] p-2"
            >
              <svg
                class="text-[#3B3D3E]"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
              >
                <path
                  d="M16.2188 15.7188L11.6142 10.8711C12.3563 9.79771 12.7554 8.50407 12.7542 7.17656C12.7542 3.70195 10.0686 0.875 6.76773 0.875C3.46686 0.875 0.78125 3.70195 0.78125 7.17656C0.78125 10.6512 3.46686 13.4781 6.76773 13.4781C8.02886 13.4794 9.25782 13.0592 10.2775 12.2781L14.8828 17.125L16.2188 15.7188ZM6.76773 11.4879C5.95756 11.488 5.16557 11.2351 4.49191 10.7614C3.81824 10.2877 3.29317 9.61425 2.9831 8.82638C2.67303 8.0385 2.59188 7.17152 2.74992 6.33509C2.90796 5.49866 3.29808 4.73035 3.87096 4.12733C4.44384 3.5243 5.17373 3.11364 5.96834 2.94728C6.76294 2.78093 7.58657 2.86635 8.33506 3.19274C9.08354 3.51913 9.72327 4.07183 10.1733 4.78095C10.6234 5.49007 10.8636 6.32375 10.8635 7.17656C10.8622 8.31959 10.4303 9.41541 9.66247 10.2236C8.89464 11.0319 7.85361 11.4865 6.76773 11.4879Z"
                  fill="#3B3D3E"
                />
              </svg>
              <input
                class="flex-1 bg-transparent text-[14px] font-normal text-[#3B3D3E] outline-none pl-2"
                type="search"
                placeholder="Buscar"
                id="search"
                name="search"
              />
            </div>
            <button
              class="flex items-center gap-3 px-4 h-[40px] bg-[#41D9B5] rounded-[10px] "
              (click)="mostrarModal.set(true)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m3.692 8.615H8.615v3.077h-1.23V8.615H4.308v-1.23h3.077V4.308h1.23v3.077h3.077z"
                  fill="#3C3C3B"
                />
              </svg>
              Añadir promoción
            </button>
          </div>
          <formularioprom [(mostrarModal)]="mostrarModal"></formularioprom>
          <table
            class="text-[14px] mt-6 table-auto border-collapse border-y-[2px] border-[#d5d6d6] w-full"
          >
            <thead>
              <tr class="border-y-[2px] border-[#f3f5f7] bg-[#f3f5f7]">
                <th class="py-2 p-1 text-center">Imagen</th>
                <th class="py-2 p-1 text-center">Título</th>
                <th class="py-2 p-1 text-center">Descripción	</th>
                <th class="py-2 p-1 text-center">Estado</th>
                <th class="py-2 p-1 text-center">Fecha de inicio</th>
                <th class="py-2 text-center p-1">Fecha de fin</th>
                <th class="py-2 text-center p-1">Fecha acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="font-normal">
                <td
                  class="max-w-[150px] truncate whitespace-nowrap overflow-hidden p-1 text-center"
                ></td>

                <td class="whitespace-nowrap flex justify-center p-1">
                  <button
                    class="flex items-center justify-center w-[36px] h-[21px] bg-[#4ab763] rounded-[8px] mr-[3px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      fill="none"
                    >
                      <path
                        d="M6.5 0A6.507 6.507 0 0 0 0 6.5C0 10.084 2.916 13 6.5 13S13 10.084 13 6.5 10.084 0 6.5 0Zm0 2.665a.845.845 0 1 1 0 1.69.845.845 0 0 1 0-1.69Zm1.56 7.345H5.2a.52.52 0 0 1 0-1.04h.91V6.11h-.52a.52.52 0 0 1 0-1.04h1.04a.52.52 0 0 1 .52.52v3.38h.91a.52.52 0 0 1 0 1.04Z"
                        fill="#3B3D3E"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class PromotionsPage {
  public mostrarModal = signal<boolean>(false);
}
