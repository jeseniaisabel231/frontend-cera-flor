import { httpResource, HttpResourceRef } from '@angular/common/http';
import { Component, input, linkedSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { producto } from '../interfaces/producto.interface';

@Component({
  selector: 'product-details',
  template: `
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2  gap-6 ">
      @if(productoResource().isLoading()){
      <div class="flex items-center justify-center">
        <div
          class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
        ></div>
      </div>
      } @else {

      <figure>
        <img
          [src]="productoResource().value()?.producto.imagen"
          alt="Jabón de avena"
          class="rounded-xl shadow-md object-cover size-80"
        />
      </figure>
      <article>
        <h2
          class="text-[20px] sm:text-2xl font-semibold mb-8 font-playfair"
        >
          {{ productoResource().value()?.producto.nombre }}
        </h2>
        <p class="mb-4">
          {{ productoResource().value()?.producto.descripcion }}
        </p>

        <h2 class="font-semibold mb-2">Beneficios</h2>
        <ul class="list-disc list-inside space-y-1 mb-4">
          @for ( beneficio of productoResource().value()?.producto.beneficios;
          track beneficio ) {
          <li>{{ beneficio }}</li>
          }
        </ul>

        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold">
            $ {{ productoResource().value()?.producto.precio }}
          </span>
          <div class="flex items-center border rounded px-2 py-1">
            <button class="px-2">-</button>
            <span class="px-2">1</span>
            <button class="px-2">+</button>
          </div>

          <button
            class="bg-morado-600 text-white font-bold py-2 rounded-2xl px-8 hover:bg-morado-700 transition"
          >
            Comprar
          </button>
        </div>
      </article>
      }
    </div>
  `,
})
export class ProductDetailsComponent {
  public producto_id = input();
  public id = linkedSignal(() => this.producto_id());

  public productoResource = input.required<HttpResourceRef<any>>()
}
