import { Component } from '@angular/core';

@Component({
  selector: 'product-details',
  template: `
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2  gap-6 ">
      <figure>
        <img
          src="#"
          alt="Jabón de avena"
          class="rounded-xl shadow-md object-cover"
        />
      </figure>

      <article>
        <h1
          id="producto-principal"
          class="text-2xl font-bold text-green-900 mb-2"
        >
          Jabón de avena
        </h1>
        <p class="mb-4">
          En Flor & Cera, creemos en el poder de lo natural y lo artesanal.
          Nuestra pasión por el bienestar y el cuidado de la piel nos llevó a
          crear jabones y velas hechos a mano, utilizando ingredientes puros,
          libres de químicos agresivos y respetuosos con el medio ambiente.
        </p>

        <h2 class="font-semibold mb-2">Beneficios</h2>
        <ul class="list-disc list-inside space-y-1 mb-4">
          <li>Hecho a mano con ingredientes naturales</li>
          <li>Cuida tu piel de forma suave y efectiva</li>
          <li>Libre de químicos agresivos</li>
        </ul>

        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold">$4.00</span>
          <div class="flex items-center border rounded px-2 py-1">
            <button class="px-2">−</button>
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
    </div>
  `,
})
export class ProductDetailsComponent {}
