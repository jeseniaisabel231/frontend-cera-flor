import { Component } from '@angular/core';
@Component({
  selector: 'app-modal-resumen',
  template: `
    <dialog
      #modal
      open
      class="m-auto w-11/12 max-w-4xl rounded-lg bg-white p-6 text-gray-800 outline-none backdrop:bg-gray-600/30 backdrop:backdrop-blur-sm"
    >
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Información del producto -->
        <div class="flex-1 space-y-4">
          <h2 class="text-xl font-semibold text-purple-900">Resumen del Producto</h2>
          <p><strong>Nombre:</strong> vela de arroz</p>
          <p><strong>Descripción:</strong> dela   gc cygcvgd yc dde</p>

          <!-- Ingredientes personalizados -->
          <div class="mt-4 space-y-2">
            <div>
              <h3 class="font-semibold">Aroma:</h3>
              <p>lindo</p>
            </div>
            <div>
              <h3 class="font-semibold">Color:</h3>
              <p>rojo</p>
            </div>
            <div>
              <h3 class="font-semibold">Esencias:</h3>
              <ul class="list-disc pl-5">
                
              </ul>
            </div>
          </div>

          <!-- Precio total -->
          <div class="mt-4 border-t pt-2 text-lg font-bold text-purple-800">
            Precio Total:
          </div>
        </div>

        <!-- Imagen del producto -->
        <div class="flex-1 flex items-center justify-center">
          <img
            [src]=""
            alt="Imagen del producto"
            class="max-h-64 rounded-lg shadow-md"
          />
        </div>
      </div>
      <button type="button">Anadir carrito</button>
      <button>Cancelar</button>
    </dialog>
  `,
})
export class ModalResumenProductoComponent {}
