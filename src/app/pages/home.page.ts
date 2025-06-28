import { httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductosService } from '../../services/admin/productos.service';
import { Card } from '../components/card.component';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';
import { producto } from '../interfaces/producto.interface';
import { PromocionesService } from '../../services/admin/promociones.service';

@Component({
  imports: [Headers, Footeer, Card, RouterLink],

  template: `
    <headers ></headers>
    <main class="flex flex-col">
      <!--Seccion banner -->
      <section class="relative w-full">
        <!-- elementos dentro del banner -->

        <div
          id="default-carousel"
          class="relative w-full"
          data-carousel="slide"
        >
          <!-- Carousel wrapper -->
          <div class="relative aspect-[21/9] w-full overflow-hidden rounded-lg md:h-96">
            <!-- Item 1 -->
            <div class="duration-700 ease-in-out">
              <img src="banner1.png" alt="Banner description" class="w-full" />
            </div>
            @for (
              promocion of promocionesResource.value()?.promociones;
              track promocion._id
            ) {
              <div class="duration-700 ease-in-out">
                <img
                  [src]="promocion.imagen"
                  [alt]="promocion.descripcion"
                  class="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            }

            <!-- Slider indicators -->
            <div
              class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse"
            >
              <button
                type="button"
                class="h-3 w-3 rounded-full"
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                class="h-3 w-3 rounded-full"
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
              <button
                type="button"
                class="h-3 w-3 rounded-full"
                aria-current="false"
                aria-label="Slide 3"
                data-carousel-slide-to="2"
              ></button>
              <button
                type="button"
                class="h-3 w-3 rounded-full"
                aria-current="false"
                aria-label="Slide 4"
                data-carousel-slide-to="3"
              ></button>
              <button
                type="button"
                class="h-3 w-3 rounded-full"
                aria-current="false"
                aria-label="Slide 5"
                data-carousel-slide-to="4"
              ></button>
            </div>
            <!-- Slider controls -->
            <button
              type="button"
              class="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
              data-carousel-prev
            >
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
              >
                <svg
                  class="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span class="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              class="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
              data-carousel-next
            >
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
              >
                <svg
                  class="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span class="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </section>
      <!--Seccion de beneficios -->
      <section class="py-10">
        <div class="mx-auto max-w-6xl px-4">
          <h2
            class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
          >
            Beneficios o características clave
          </h2>

          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            <article class="flex flex-col items-center text-center">
              <img src="beneficios1.png" alt="" class="mb-4 w-28 sm:w-36" />
              <h3 class="font-playfair mb-2 text-[17px] font-semibold">
                Ingredientes naturales
              </h3>
              <p class="text-sm">
                Los productos están elaborados con ingredientes naturales,
                libres de sustancias artificiales. Esto garantiza suavidad y
                cuidado para la piel.
              </p>
            </article>

            <article class="flex flex-col items-center text-center">
              <img src="beneficios2.png" alt="" class="mb-4 w-28 sm:w-36" />
              <h3 class="font-playfair mb-2 text-[17px] font-semibold">
                Producción artesanal
              </h3>
              <p class="text-sm">
                Cada vela y jabón es creado de manera artesanal, con procesos
                cuidadosos y atención al detalle. Esto asegura calidad, texturas
                únicas y aromas duraderos.
              </p>
            </article>

            <article class="flex flex-col items-center text-center">
              <img src="beneficios1.png" alt="" class="mb-4 w-28 sm:w-36" />
              <h3 class="font-playfair mb-2 text-[17px] font-semibold">
                Personalización
              </h3>
              <p class="text-sm">
                Los clientes pueden elegir fragancias, formas y colores según
                sus preferencias. Esto permite ofrecer productos exclusivos y
                adaptados a cada necesidad.
              </p>
            </article>

            <article class="flex flex-col items-center text-center">
              <img src="beneficios1.png" alt="" class="mb-4 w-28 sm:w-36" />
              <h3 class="font-playfair mb-2 text-[17px] font-semibold">
                Beneficios ecológicos
              </h3>
              <p class="text-sm">
                Son biodegradables y no contaminan el medio ambiente. Su
                producción sostenible reduce el impacto ecológico, siendo una
                opción responsable.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!--Seccion de productos destacados -->
      <section class="bg-celeste-200 py-10">
        <div class="mx-auto max-w-6xl px-4">
          <h2
            class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
          >
            Nuevos Productos
          </h2>
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            @for (producto of productos; track producto._id) {
              <card [producto]="producto" (emitirCantidad)="recibirCantidad($event)"></card>
            }
          </div>
        </div>
      </section>

      <!--Seccion de personalizacion -->
      <a class="relative w-full" routerLink="/personalizacion-producto">
        <a href="" class="relative block h-full w-full overflow-hidden">
          <img
            src="banner2.png"
            alt=""
            class="h-[500px] w-full object-cover md:h-[300px] xl:h-auto"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float3 absolute top-[10%] left-[20%] w-8 lg:w-12"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float1 absolute top-[65%] left-[1%] w-4 lg:w-6"
          />

          <img
            src="banner2-flor1.png"
            alt=""
            class="animate-float2 absolute top-[10%] left-[3%] w-6 lg:w-10"
          />

          <img
            src="banner2-flor3.png"
            alt=""
            class="animate-float2 absolute top-[75%] left-[5%] w-6 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float1 absolute top-[85%] left-[30%] w-6 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float2 absolute top-[15%] left-[40%] w-4 lg:w-6"
          />

          <img
            src="banner2-flor2.png"
            alt=""
            class="animate-float1 absolute top-[9%] left-[50%] w-6 lg:w-12"
          />

          <img
            src="banner2-flor3.png"
            alt=""
            class="animate-float2 absolute top-[78%] left-[70%] w-4 lg:w-8"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float3 absolute top-[15%] left-[75%] w-4 lg:w-5"
          />

          <img
            src="banner2-flor1.png"
            alt=""
            class="animate-float1 absolute top-[20%] left-[80%] w-8 lg:w-10"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float2 absolute top-[70%] left-[85%] w-5"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="animate-float3 absolute top-[13%] left-[90%] w-4 lg:w-10"
          />

          <img
            src="banner2-flor2.png"
            alt=""
            class="animate-float1 absolute top-[80%] left-[95%] w-4 sm:w-8"
          />

          <p
            class="text-celeste-600 text-outline-sky absolute top-[15%] left-[15%] text-4xl text-[35px] font-bold [text-shadow:2px_2px_6px_rgba(0,0,0,0.5)] md:top-[23%] md:left-[5%] lg:left-[10%] lg:text-[55px]"
          >
            ¡Tu producto,
          </p>
          <div
            class="absolute top-[25%] left-[30%] rounded-[15px] bg-[#fbd800] px-10 py-2 [box-shadow:8px_6px_12px_#806BFF] md:top-[40%] md:left-[10%] md:py-4 lg:top-[50%] lg:left-[20%] lg:py-6"
          >
            <p
              class="text-celeste-600 text-outline-pink text-[32px] font-bold [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)] lg:text-5xl"
            >
              tu estilo!
            </p>
          </div>
          <p
            class="absolute top-[45%] left-[15%] text-center text-[17px] md:top-[20%] md:left-[40%] lg:left-[45%] lg:text-[18px]"
          >
            <span class="text-[19px] font-bold md:text-[22px]">
              Personaliza
            </span>
            cada detalle para
            <br />
            <span class="text-[19px] font-bold md:text-[21px]">crear</span>
            algo
            <span class="text-[19px] font-bold md:text-[21px]">
              verdaderamente único.
            </span>
          </p>
          <img
            src="banner2-dibujo.png"
            alt=""
            class="absolute top-[58%] left-[30%] w-44 transform transition-transform duration-300 hover:scale-120 md:top-[43%] md:left-[38%] md:w-3xs lg:left-[48%]"
          />
          <a
            class="bg-morado-600 text-amarrillo-500 hover:bg-morado-700 absolute top-[83%] left-[28%] w-50 transform rounded-2xl px-6 py-2 text-center font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:text-white md:top-[45%] md:left-[70%] lg:top-[45%] lg:left-[75%] lg:py-4 xl:w-60"
          >
            ¡Comienza a crear ahora!
          </a>
        </a>
      </a>
      <!--Seccion de necesitas ayuda -->
      <section class="w-full bg-[#ffe3e3] px-14 py-6">
        <div class="mx-auto max-w-7xl">
          <!-- Título centrado -->
          <h2
            class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
          >
            Preguntas Frecuentes
          </h2>

          <!-- Layout de 3 columnas -->
          <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <!-- Columna izquierda con imágenes -->
            <div class="flex flex-col items-center">
              <img
                src="componente3-vela.jpg"
                alt="Vela artesanal"
                class="w-58 rounded-lg shadow-md"
              />
            </div>

            <!-- Columna central con preguntas -->
            <div class="flex flex-col gap-4">
              <div class="border-morado-400 border-l-4 pl-4">
                <p class="text-morado-700 font-semibold">
                  🧠 Funcionamiento de la personalización con inteligencia
                  artificial
                </p>
                <p class="text-sm text-gray-600">
                  La IA analiza las preferencias del cliente para recomendar y
                  diseñar productos únicos.
                </p>
              </div>
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="text-morado-700 font-semibold">
                  🕯️ Selección de aromas y colores
                </p>
                <p class="text-sm text-gray-600">
                  Los clientes pueden elegir personalmente los aromas, colores a
                  sus productos.
                </p>
              </div>
              <div class="border-morado-400 border-l-4 pl-4">
                <p class="text-morado-700 font-semibold">
                  🧴 Ingredientes utilizados
                </p>
                <p class="text-sm text-gray-600">
                  Todos los artículos se elaboran con ingredientes 100%
                  naturales, veganos y seguros para la piel.
                </p>
              </div>

              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="text-morado-700 font-semibold">
                  🧼 Cuidado y mantenimiento
                </p>
                <p class="text-sm text-gray-600">
                  Se recomienda almacenar los productos en ambientes frescos y
                  secos, protegidos de la luz solar directa. En el caso de las
                  velas, deben utilizarse sobre superficies estables y alejadas
                  de materiales inflamables.
                </p>
              </div>
            </div>

            <!-- Columna derecha con preguntas -->
            <div class="flex flex-col gap-4">
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="text-morado-700 font-semibold">
                  🖼️ Visualización previa del diseño
                </p>
                <p class="text-sm text-gray-600">
                  El sistema genera una representación digital del producto
                  personalizado una vez completado el formulario, permitiendo al
                  cliente aprobar el diseño antes de confirmar la compra.
                </p>
              </div>
              <div class="border-morado-400 border-l-4 pl-4">
                <p class="text-morado-700 font-semibold">
                  📦 Tiempos de entrega
                </p>
                <p class="text-sm text-gray-600">
                  El proceso de fabricación tiene una duración de 2 a 4 días
                  laborables. Posteriormente, el envío estándar tarda entre 3 y
                  5 días hábiles, variando según la ubicación del destinatario.
                </p>
              </div>
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="text-morado-700 font-semibold">💳 Opciones de pago</p>
                <p class="text-sm text-gray-600">
                  Se aceptan tarjetas de crédito/débito y transferencias.
                </p>
              </div>
              <div class="border-morado-400 border-l-4 pl-4">
                <p class="text-morado-700 font-semibold">
                  🤖 Flexibilidad en la personalización
                </p>
                <p class="text-sm text-gray-600">
                  Los clientes pueden optar tanto por productos prediseñados
                  como por creaciones personalizadas asistidas por inteligencia
                  artificial, según sus preferencias.
                </p>
              </div>
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="text-morado-700 font-semibold">
                  📩 Soporte al cliente
                </p>
                <p class="text-sm text-gray-600">
                  El equipo de atención al cliente está disponible de lunes a
                  sábado a través de múltiples canales WhatsApp y Instagram para
                  resolver cualquier consulta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footeer></footeer>
  `,
})
export class HomePage {
  public serviceProductos = inject(ProductosService);
  public productos: producto[] = [];
  public cantidadProducto = signal(0);
  ngOnInit() {
    this.obtenerProductos(1);
  }
  obtenerProductos(numeroPagina: number) {
    this.serviceProductos.obtener(numeroPagina).subscribe({
      next: (respuesta: any) => {
        this.productos = respuesta.productos;
      },
    });
  }
  public promocionesResource = httpResource<any>(
    () => `${environment.urlApi}/api/promociones`,
  );

  recibirCantidad(cantidad: number) {
    this.cantidadProducto.set(cantidad)
  }
  //metodo para el boton de siguientes
  siguienteBotonBanner(){
  }
}
