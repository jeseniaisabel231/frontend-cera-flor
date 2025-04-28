import { Component } from '@angular/core';
import { Headers } from '../components/header.component';
import { Footeer } from '../components/footer.component';
import { RouterLink } from '@angular/router';
import { Card } from '../components/card.component';

@Component({
  imports: [Headers, Footeer, Card],

  template: `
    <headers></headers>
    <main class="flex flex-col ">
      <!--Seccion banner -->
      <section class="w-full relative">
        <!-- elementos dentro del banner -->
        <div class="text-center md:text-left md:w-1/2 absolute top-[25%] left-[10%]">
          <h1 class="text-5xl font-bold font-playfair text-pink-600 text-outline-pink">
            Artesanía <span class="block pl-10">para tu, piel</span>
          </h1>
          <p class="text-3xl font-bold font-playfair text-outline-purple mt-">magia para tu hogar</p>
          <a
            href="#catalogo"
            class="inline-block mt-4 px-12 py-2 bg-morado-600 text-white font-semibold rounded-full hover:bg-morado-700 transition"
          >
            Ver catálogo
          </a>
        </div>
        <img src="banner1-foto.png" alt="" class="absolute left-[40%]">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="banner1.png"
            alt="Banner description"
            class="w-full h-[240px] sm:h-auto object-cover"
          />
          <!-- class="w-full sm:h-auto object-cover" -->
        </a>
      </section>
      <!--Seccion de beneficios -->
      <section class="flex flex-col py-6 px-14 lg:px-40 ">
        <h2
          class="text-center text-[20px] sm:text-2xl font-semibold mb-8 font-playfair"
        >
          Beneficios o características clave
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          <article class="text-center flex flex-col items-center">
            <img src="beneficios1.png" alt="" class="sm:w-36 w-28 mb-4 " />
            <h3 class="font-semibold font-playfair mb-2 text-[17px]">
              Ingredientes naturales
            </h3>
            <p class="text-sm">
              Los productos están elaborados con ingredientes naturales, libres
              de sustancias artificiales. Esto garantiza suavidad y cuidado para
              la piel.
            </p>
          </article>

          <article class="text-center flex flex-col items-center">
            <img src="beneficios2.png" alt="" class="sm:w-36 w-28  mb-4" />
            <h3 class="font-semibold font-playfair mb-2 text-[17px]">
              Producción artesanal
            </h3>
            <p class="text-sm">
              Cada vela y jabón es creado de manera artesanal, con procesos
              cuidadosos y atención al detalle. Esto asegura calidad, texturas
              únicas y aromas duraderos.
            </p>
          </article>

          <article class="text-center flex flex-col items-center">
            <img src="beneficios1.png" alt="" class="sm:w-36 w-28  mb-4" />
            <h3 class="font-semibold font-playfair mb-2 text-[17px]">
              Personalización
            </h3>
            <p class="text-sm">
              Los clientes pueden elegir fragancias, formas y colores según sus
              preferencias. Esto permite ofrecer productos exclusivos y
              adaptados a cada necesidad.
            </p>
          </article>

          <article class="text-center flex flex-col items-center">
            <img src="beneficios1.png" alt="" class="sm:w-36 w-28  mb-4" />
            <h3 class="font-semibold font-playfair mb-2 text-[17px]">
              Beneficios ecológicos
            </h3>
            <p class="text-sm">
              Son biodegradables y no contaminan el medio ambiente. Su
              producción sostenible reduce el impacto ecológico, siendo una
              opción responsable.
            </p>
          </article>
        </div>
      </section>

      <!--Seccion de productos destacados -->
      <section class="flex flex-col py-6 px-14 xl:px-40 bg-celeste-200">
        <h2
          class="text-center text-[20px] sm:text-2xl font-semibold mb-8 font-playfair"
        >
          Productos destacados
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4"
        >
          <card></card>
          <card></card>
          <card></card>
          <card></card>
        </div>
      </section>

      <!--Seccion de personalizacion -->
      <section class="w-full relative">
        <a href="" class="block relative w-full h-full overflow-hidden">
          <img
            src="banner2.png"
            alt=""
            class="w-full h-[500px] md:h-[300px] xl:h-auto object-cover"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-8 lg:w-12 animate-float3 top-[10%] left-[20%]"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-4 lg:w-6 animate-float1 top-[65%] left-[1%]"
          />

          <img
            src="banner2-flor1.png"
            alt=""
            class="absolute w-6 lg:w-10 animate-float2 top-[10%] left-[3%]"
          />

          <img
            src="banner2-flor3.png"
            alt=""
            class="absolute w-6 lg:w-8 animate-float2 top-[75%] left-[5%]"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-6 lg:w-8 animate-float1 top-[85%] left-[30%]"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-4 lg:w-6 animate-float2 top-[15%] left-[40%]"
          />

          <img
            src="banner2-flor2.png"
            alt=""
            class="absolute w-6 lg:w-12 animate-float1 top-[9%] left-[50%]"
          />

          <img
            src="banner2-flor3.png"
            alt=""
            class="absolute w-4 lg:w-8 animate-float2 top-[78%] left-[70%]"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-4 lg:w-5 animate-float3 top-[15%] left-[75%]"
          />

          <img
            src="banner2-flor1.png"
            alt=""
            class="absolute w-8 lg:w-10 animate-float1 top-[20%] left-[80%]"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-5 animate-float2 top-[70%] left-[85%]"
          />

          <img
            src="banner2-burbuja.png"
            alt=""
            class="absolute w-4 lg:w-10 animate-float3 top-[13%] left-[90%]"
          />

          <img
            src="banner2-flor2.png"
            alt=""
            class="absolute w-4 sm:w-8 animate-float1 top-[80%] left-[95%] "
          />

          <p
            class="absolute lg:left-[10%] top-[15%] md:top-[23%] md:left-[5%] left-[15%] text-[35px] lg:text-[55px]  text-celeste-600 text-outline-sky font-bold [text-shadow:2px_2px_6px_rgba(0,0,0,0.5)] text-4xl "
          >
            ¡Tu producto,
          </p>
          <div
            class="absolute top-[25%] lg:left-[20%] md:top-[40%] lg:top-[50%] left-[30%] md:left-[10%] bg-[#fbd800] px-10 py-2 md:py-4 lg:py-6 rounded-[15px] [box-shadow:8px_6px_12px_#806BFF]"
          >
            <p
              class="text-[32px] lg:text-5xl text-celeste-600 text-outline-pink font-bold [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]"
            >
              tu estilo!
            </p>
          </div>
          <p
            class="absolute top-[45%] left-[15%] md:top-[20%] md:left-[40%]  text-[17px] lg:text-[18px] text-center lg:left-[45%]"
          >
            <span class="font-bold text-[19px] md:text-[22px]"
              >Personaliza</span
            >
            cada detalle para <br /><span
              class="font-bold text-[19px] md:text-[21px]"
              >crear </span
            >algo
            <span class="font-bold text-[19px] md:text-[21px]"
              >verdaderamente único.</span
            >
          </p>
          <img
            src="banner2-dibujo.png"
            alt=""
            class="absolute md:w-3xs md:top-[43%] md:left-[38%] w-44 top-[58%] left-[30%] lg:left-[48%] transition-transform transform hover:scale-120 duration-300"
          />
          <a
            class="absolute top-[83%] left-[28%] md:top-[45%] md:left-[70%] lg:top-[45%] lg:left-[75%] bg-morado-600 text-amarrillo-500 font-bold py-2 px-6 lg:py-4 rounded-2xl w-50 xl:w-60 text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-morado-700 hover:text-white"
          >
            ¡Comienza a crear ahora!
          </a>
        </a>
      </section>
      <!--Seccion de necesitas ayuda -->
      <section class="w-full px-14 py-6 bg-[#ffe3e3]">
        <div class="max-w-7xl mx-auto">
          <!-- Título centrado -->
          <h2
            class="text-center text-[20px] sm:text-2xl font-semibold mb-8 font-playfair"
          >
            Preguntas Frecuentes
          </h2>

          <!-- Layout de 3 columnas -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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
              <div class="border-l-4 border-morado-400 pl-4">
                <p class="font-semibold text-morado-700">
                  🧠 Funcionamiento de la personalización con inteligencia
                  artificial
                </p>
                <p class="text-gray-600 text-sm">
                  La IA analiza las preferenicas del cliente para recomendar y
                  diseñar productos únicos.
                </p>
              </div>
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="font-semibold text-morado-700">
                  🕯️ Selección de aromas y colores
                </p>
                <p class="text-gray-600 text-sm">
                  Los clientes pueden elegir personalmente los aromas, colores a
                  sus productos.
                </p>
              </div>
              <div class="border-l-4 border-morado-400 pl-4">
                <p class="font-semibold text-morado-700">
                  🧴 Ingredientes utilizados
                </p>
                <p class="text-gray-600 text-sm">
                  Todos los artículos se elaboran con ingredientes 100%
                  naturales, , veganos y seguros para la piel.
                </p>
              </div>

              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="font-semibold text-morado-700">
                  🧼 Cuidado y mantenimiento
                </p>
                <p class="text-gray-600 text-sm">
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
                <p class="font-semibold text-morado-700">
                  🖼️ Visualización previa del diseño
                </p>
                <p class="text-gray-600 text-sm">
                  El sistema genera una representación digital del producto
                  personalizado una vez completado el formulario, permitiendo al
                  cliente aprobar el diseño antes de confirmar la compra.
                </p>
              </div>
              <div class="border-l-4 border-morado-400 pl-4">
                <p class="font-semibold text-morado-700">
                  📦 Tiempos de entrega
                </p>
                <p class="text-gray-600 text-sm">
                  El proceso de fabricación tiene una duración de 2 a 4 días
                  laborables. Posteriormente, el envío estándar tarda entre 3 y
                  5 días hábiles, variando según la ubicación del destinatario.
                </p>
              </div>
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="font-semibold text-morado-700">💳 Opciones de pago</p>
                <p class="text-gray-600 text-sm">
                  Se aceptan tarjetas de crédito/débito y transferencias.
                </p>
              </div>
              <div class="border-l-4 border-morado-400 pl-4">
                <p class="font-semibold text-morado-700">
                  🤖 Flexibilidad en la personalización
                </p>
                <p class="text-gray-600 text-sm">
                  Los clientes pueden optar tanto por productos prediseñados
                  como por creaciones personalizadas asistidas por inteligencia
                  artificial, según sus preferencias.
                </p>
              </div>
              <div class="border-l-4 border-[#FF6EA5] pl-4">
                <p class="font-semibold text-morado-700">
                  📩 Soporte al cliente
                </p>
                <p class="text-gray-600 text-sm">
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
export class HomePage {}
