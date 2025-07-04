import { Component, model } from '@angular/core';
import { Headers } from '../components/header.component';

@Component({
  template: `
    <headers></headers>
    <main class="flex-grow bg-[#f9fafb] mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" >
      <div class="flex flex-col gap-8 md:flex-row">
        <aside class="sticky top-8 w-full flex-shrink-0 rounded-lg bg-white p-4 shadow-sm md:w-64" >
          <header class="mb-6 flex flex-col items-center">
            <img
              src=""
              class="mb-3 h-20 w-20 rounded-full border-2"
            />
            <h2 class="text-lg font-medium">Nombre</h2>
            <p class="text-sm text-gray-500">Correo</p>
            
          </header>

          <nav>
            <ul class="space-y-2">
              <li>
                <a
                  href="/mi-perfil"
                  class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <i class="fas fa-user-circle mr-3" ></i>
                  Mi perfil
                </a>
              </li>
              <li>
                <a
                  href="/mis-pedidos"
                  class="flex items-center rounded-md bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700"
                  aria-current="page"
                >
                  <i class="mr-3" ></i>
                  Mis pedidos
                </a>
              </li>

              <li class="border-t border-gray-200 pt-4">
                <a
                  href="/logout"
                  class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <i class="fas fa-sign-out-alt mr-3" ></i>
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Contenido principal -->
        <article class="flex-grow">
          <!-- ... resto del contenido ... -->
           <header class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Historial de Pedidos</h1>
          </header>
          <!-- Lista de pedidos -->
          <section aria-labelledby="pedidos-heading">
            <h2 id="pedidos-heading" class="sr-only">Listado de pedidos recientes</h2>
            
            <!-- Pedido individual -->
            <article class="mb-6 overflow-hidden rounded-lg bg-white shadow-sm">
              <header class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div>
                  <span class="text-sm font-medium text-gray-500"></span>
                  <span class="mx-2 text-gray-300" >•</span>
                  <span class="text-sm font-medium text-morado-200">Enviado</span>
                  <span class="mx-2 text-gray-300" >•</span>
                  <time datetime="2023-05-15" class="text-sm text-gray-500">15 de Mayo, 2023</time>
                </div>
                <span class="text-lg font-semibold">$1,250.00 <abbr title="Pesos Mexicanos"></abbr></span>
              </header>
              
              <div class="p-6">
                <section aria-labelledby="productos-pedido-78945">
                  <h3 id="productos-pedido-78945" class="sr-only">Productos del pedido</h3>
                  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <!-- Producto 1 -->
                    <section class="flex items-start">
                      <img
                        src="https://via.placeholder.com/80x80?text=Jarrón+Barro"
                        class="mr-4 h-16 w-16 rounded-md object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h4 class="text-sm font-medium">Jabon de arroz</h4>
                        <p class="mt-1 text-xs text-gray-500"></p>
                        <p class="mt-1 text-sm font-medium">$</p>
                        <p class="mt-1 text-xs text-gray-500">Cantidad: 1</p>
                      </div>
                    </section>
                    
                    <!-- Producto 2 -->
                    <section class="flex items-start">
                      <img
                        src="https://via.placeholder.com/80x80?text=Textil+Huipil"
                        alt="Huipil tradicional mexicano - Textil Maya"
                        class="mr-4 h-16 w-16 rounded-md object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h4 class="text-sm font-medium">l</h4>
                        <p class="mt-1 text-xs text-gray-500"></p>
                        <p class="mt-1 text-sm font-medium">$</p>
                        <p class="mt-1 text-xs text-gray-500">Cantidad: 1</p>
                      </div>
                    </section>
                    
                    <!-- Producto 3 -->
                    <!-- <section class="flex items-start">
                      <img
                        src="https://via.placeholder.com/80x80?text=Alebrije"
                        alt="Alebrije de madera tallada a mano - Arte Popular Mexicano"
                        class="mr-4 h-16 w-16 rounded-md object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h4 class="text-sm font-medium">Alebrije de madera</h4>
                        <p class="mt-1 text-xs text-gray-500">Arte Popular</p>
                        <p class="mt-1 text-sm font-medium">$150.00</p>
                        <p class="mt-1 text-xs text-gray-500">Cantidad: 1</p>
                      </div>
                    </section> -->
                  </div>
                </section>
                
                <footer class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                  <div>
                    <p class="text-sm text-gray-600">
                      <span class="font-medium">Envío estimado:</span>
                      <time datetime="2023-05-20">20 de Mayo, 2023</time>
                    </p>
                  </div>
                  <!-- <nav aria-label="Acciones para el pedido ART-78945">
                    <a
                      href="/pedidos/ART-78945"
                      class="rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
                    >
                      Ver detalles completos
                    </a>
                  </nav> -->
                </footer>
              </div>
            </article>
          </section>

          <!-- Paginación -->
          <nav aria-label="Navegación de páginas" class="mt-8 flex items-center justify-between">
            <p class="text-sm text-gray-700">
              Mostrando <span class="font-medium">1</span> a <span class="font-medium">3</span> de <span class="font-medium">5</span> pedidos
            </p>
            <div class="flex space-x-2">
              <button
                class="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                disabled
              >
                Anterior
              </button>
              <button
                class="rounded-md border border-amber-600 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 cursor-pointer"
                aria-current="page"
              >
                1
              </button>
              <button
                class="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                2
              </button>
              <button
                class="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </nav>
        </article>
      </div>
    </main>
  `,
  imports: [Headers],
})
export class OrdersPage {
  public cantidadProducto = model<number>(0);
}