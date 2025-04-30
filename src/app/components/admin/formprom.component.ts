import { Component, effect, ElementRef, model, viewChild } from '@angular/core';

@Component({
  selector: 'formprom',
  template: `
    <dialog
      #modal
      class="m-auto bg-white backdrop:bg-gris-600/25 backdrop:backdrop-blur-[2px] rounded-[10px] text-[#3C3C3B]"
    >
      <div class="flex items-center py-5 justify-between px-7">
        <h1 class="text-lg text-[#3C3C3B] font-medium mb-6">
          Agregar promoción
        </h1>
        <button (click)="close()" class="focus:outline-none mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 512 512"
          >
            <path
              fill="#3C3C3B"
              d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"
            />
          </svg>
        </button>
      </div>

      <!-- Imagen + info -->
      <form class="grid grid-cols-1 md:grid-cols-2 gap-x-4 py-2 px-7">
        <!-- Imagen -->
        <div
          class="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl h-66 w-full"
        >
          <label
            class="block text-center text-sm font-medium text-gray-500 cursor-pointer"
          >
            <div class="mb-2 text-base">Subir imagen</div>
            <input type="file" class="hidden" />
            <div class="text-sm text-gray-400">Seleccionar archivo</div>
          </label>
        </div>

        <!-- Título y descripción -->
        <div class="flex flex-col gap-6 w-full">
          <!-- Título -->
          <div>
            <label class="block text-sm font-medium mb-1" for="titulo">
              Título de la promoción:
            </label>
            <input
              type="text"
              id="titulo"
              class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-morado-400"
              placeholder="Ej: 20% de descuento en jabones"
            />
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-medium mb-1" for="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2  focus:ring-morado-400"
              rows="6"
              placeholder="Describe la promoción, condiciones o productos incluidos..."
            ></textarea>
          </div>
        </div>
        

        <!-- Fechas -->
        <div class="grid grid-cols-2 gap-6 mt-8">
          <div>
            <label class="block mb-1" for="fechaInicio">Fecha de inicio</label>
            <input
              type="date"
              id="fechaInicio"
              class="w-full border border-gray-300 rounded-lg text-base p-2 focus:outline-none focus:ring-2  focus:ring-morado-400 "
            />
          </div>
          <div>
            <label class="block mb-1" for="fechaFin">Fecha de fin</label>
            <input
              type="date"
              id="fechaFin"
              class="w-full border border-gray-300 rounded-lg text-base p-2 focus:outline-none focus:ring-2  focus:ring-morado-400 "
            />
          </div>
        </div>

        <!-- Botón -->
        <div class="md:col-span-2 flex justify-end gap-4 mt-6 pb-4">
          <button
            class="bg-indigo-400 text-white px-6 h-10 rounded-full hover:bg-indigo-500 w-auto"
          >
            Guardar promoción
          </button>
          <button
            type="button"
            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </dialog>
  `,
})
export class FormProm {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);

  public close() {
    this.mostrarModal.set(false);
  }
  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
}
