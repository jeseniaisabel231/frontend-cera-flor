import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  model,
  viewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';

@Component({
  selector: 'formulario',
  imports: [ReactiveFormsModule],
  template: `
    <dialog
      #modal
      class="m-auto bg-white backdrop:bg-gris-600/25 backdrop:backdrop-blur-[2px] rounded-[10px] text-[#3C3C3B]"
    >
      <div class="flex items-center py-5 justify-between px-7">
        <h1 class="text-lg text-[#3C3C3B] font-medium">Agregar producto</h1>
        <button (click)="close() " class="focus:outline-none">
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
      <form class="grid grid-cols-1 md:grid-cols-2 gap-x-4 py-2 px-7">
        <!-- Subir foto -->
        <div
          class="flex flex-col items-center border border-[#878787] rounded-xl p-4 h-53 justify-center"
        >
          <label for="foto" class="text-gray-500 mb-2">Subir foto</label>
          <input type="file" id="foto" class="text-sm" />
        </div>

        <!-- Nombre y descripción -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Nombre del producto:
            </label>
            <input
              type="text"
              placeholder="Ej: Jabón de avena y miel"
              class="w-full border border-[#878787] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-morado-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              placeholder="Describe aroma, textura, beneficios o forma artesanal..."
              rows="4"
              class="w-full border border-[#878787] rounded-lg p-2 focus:outline-none focus:ring-2  focus:ring-morado-400"
            ></textarea>
          </div>
        </div>

        <!-- Categoría y precio -->
        <div class="mt-4">
          <label class="block text-sm font-medium mb-1">
            Selecciona una categoría
          </label>
          <select
            class="text-gray-600 w-full border border-[#878787] rounded-lg p-2 focus:outline-none  focus:ring-2  focus:ring-morado-400"
          >
            <option>Jabón artesanal</option>
            <option>Vela artesanal</option>
          </select>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium mb-1">Precio</label>
          <div class="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ej: 5.50"
              class="w-full border border-[#878787] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span class="text-gray-600">$</span>
          </div>
        </div>

        <!-- Ingredientes -->
        <div class="md:col-span-2 mt-6">
          <p class="text-lg font-medium mb-3">Características del producto</p>
          <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <label class="block text-sm font-medium mb-1">
                Selecciona dos ingredientes
              </label>
              <div class="grid grid-cols-1 gap-2 text-sm pl-2">
                <label>
                  <input type="checkbox" class="mr-1" />
                  Glicerina vegetal
                </label>
                <label>
                  <input type="checkbox" class="mr-1" />
                  Avena
                </label>
                <label>
                  <input type="checkbox" class="mr-1" />
                  Miel
                </label>
                <label>
                  <input type="checkbox" class="mr-1" />
                  Aceite esencial de coco
                </label>
                <label>
                  <input type="checkbox" class="mr-1" />
                  Arcilla blanca
                </label>
                <label>
                  <input type="checkbox" class="mr-1" />
                  Aceite esencial de coco
                </label>
              </div>
            </div>

            <!-- Aroma y tipo de piel -->
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block  font-medium mb-1">
                  Selecciona una aroma
                </label>
                <select
                  class="w-full border rounded-lg p-2 border-[#878787]  focus:outline-none focus:ring-2  focus:ring-morado-400"
                >
                  <option>Vainilla</option>
                  <option>Lavanda</option>
                  <option>Cítrico</option>
                  <!-- Agrega más opciones si deseas -->
                </select>
              </div>
              <div>
                <label class="block font-medium mb-1">
                  Selecciona un tipo de piel
                </label>
                <select
                  class="w-full border rounded-lg p-2 border-[#878787]  focus:outline-none focus:ring-2  focus:ring-morado-400"
                >
                  <option>Piel seca</option>
                  <option>Piel grasa</option>
                  <option>Piel mixta</option>
                  <!-- Agrega más opciones si deseas -->
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="md:col-span-2 flex justify-end gap-4 mt-6 pb-4">
          <button
            class="bg-indigo-400 text-white px-6 h-10 rounded-full hover:bg-indigo-500 w-auto"
          >
          Guardar producto
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
export class FormProducto {
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
  //funcion que verifica que haciion hace el boton
}
