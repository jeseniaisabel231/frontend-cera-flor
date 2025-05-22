import { Component, inject, signal } from '@angular/core';
import { Headers } from '../components/header.component';
import { BarranavComponent } from '../components/barranav.component';
import { ProductDetailsComponent } from '../components/productDetails.component';
import { Footeer } from '../components/footer.component';

@Component({
  imports: [Headers, BarranavComponent, ProductDetailsComponent, Footeer],
  template: `
    <headers></headers>
    <main class="flex flex-col bg-yellow-50 min-h-screen">
      <barranav></barranav>

      <!-- Contenido principal del carrito -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl  bg-black py-10">
        <!-- Lista de productos -->
        <section class="md:col-span-2 bg-amarrillo-900 mx-auto">
          <!-- Producto -->
          <article class="bg-white p-4 rounded-lg flex max-w-6xl px-4">
            <div class="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Jabón de avena"
                class="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 class="text-lg font-semibold text-green-900">
                  Jabón de avena
                </h2>
                <p class="text-gray-700 mt-1">$6.99</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center border rounded">
                <button class="px-2 text-xl">−</button>
                <span class="px-3">1</span>
                <button class="px-2 text-xl">+</button>
              </div>
              <button
                aria-label="Eliminar producto"
                class="text-gray-600 hover:text-red-600"
              >
                🗑️
              </button>
            </div>
          </article>
        </section>

        <!-- Resumen del pedido -->
        <aside class="bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 class="text-lg font-bold text-green-900 mb-4">
            Resumen del pedido
          </h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex justify-between">
              <span>Subtotal</span>
              <span>$6.99</span>
            </li>
            <li class="flex justify-between">
              <span>Impuestos</span>
              <span>$6.99</span>
            </li>
            <li class="flex justify-between font-semibold border-t pt-2">
              <span>Total a pagar:</span>
              <span>$6.99</span>
            </li>
          </ul>
          <button
            class="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition duration-300"
          >
            Pagar
          </button>
        </aside>
      </div>
    </main>
    <footeer></footeer>
  `,
})
export class ShoppingCardPage {}
