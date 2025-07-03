import { httpResource } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { environment } from '../../environments/environment';
import { ProductosService } from '../../services/admin/productos.service';
import { Card } from '../components/card.component';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';

register();

@Component({
  imports: [Headers, Footeer, Card, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <headers></headers>
    <main class="flex flex-col">
      <!--Seccion banner -->
      <!-- elementos dentro del banner -->

      <swiper-container
        [pagination]="{ clickable: true }"
        speed="500"
        centered-slides
        loop
        init
        navigation
        class="mySwiper h-[500px] w-full"
      >
        @for (
          promocion of promocionesResource.value().promociones;
          track $index
        ) {
          <swiper-slide>
            <img
              [src]="promocion.imagen"
              [alt]="promocion.nombre"
              class="w-full"
            />
          </swiper-slide>
        }
      </swiper-container>
      <!--Seccion de beneficios -->

      <section class="py-12">
        <h2
          class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
        >
          Beneficios o características clave
        </h2>

        <div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- Ingredientes Naturales -->
          <div class="rounded-t-4xl bg-green-100 p-6 text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#3C3C3B"
                  d="M4.088 3.25a.75.75 0 0 0-.75.643a9 9 0 0 0-.088 1.24c0 4.548 3.524 8.27 8 8.647V20a.75.75 0 0 0 1.5 0v-6.22c4.476-.377 8-4.1 8-8.648q0-.63-.089-1.24a.75.75 0 0 0-.75-.642A8.76 8.76 0 0 0 12 8.407A8.76 8.76 0 0 0 4.088 3.25"
                />
              </svg>
            </div>
            <h3 class="font-playfair mb-2 text-[17px] font-semibold">
              Ingredientes Naturales
            </h3>
            <p class="mt-2 text-sm">
              Los productos están elaborados con ingredientes naturales, libres
              de sustancias artificiales. Esto garantiza suavidad y cuidado para
              la piel.
            </p>
          </div>

          <!-- Hecho a Mano -->
          <div class="rounded-t-4xl bg-blue-50 p-6 text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#3C3C3B"
                  d="M3 16V5.75a1.25 1.25 0 0 1 2.5 0V12h1V2.75a1.25 1.25 0 0 1 2.5 0V12h1V1.25a1.25 1.25 0 0 1 2.5 0V12h1V3.25a1.25 1.25 0 0 1 2.5 0V15h.75l1.41-3.53c.22-.55.68-.97 1.24-1.16l.79-.26a1 1 0 0 1 1.24 1.32L18.4 19c-1.21 3-4.14 5-7.4 5c-4.42 0-8-3.58-8-8"
                />
              </svg>
            </div>
            <h3 class="font-playfair mb-2 text-[17px] font-semibold">
              Producción artesanal
            </h3>
            <p class="mt-2 text-sm text-gray-700">
              Cada vela y jabón es creado de manera artesanal, con procesos
              cuidadosos y atención al detalle. Esto asegura calidad, texturas
              únicas y aromas duraderos.
            </p>
          </div>

          <!-- Sostenibilidad -->
          <div class="rounded-t-4xl bg-purple-100 p-6 text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#3C3C3B"
                  fill-rule="evenodd"
                  d="M10.847 21.934C5.867 21.362 2 17.133 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.157-3.283 4.733-6.086 4.37c-1.618-.209-3.075-.397-3.652.518c-.395.626.032 1.406.555 1.929a1.673 1.673 0 0 1 0 2.366c-.523.523-1.235.836-1.97.751M11.085 7a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6.5 13a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m11 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-3-4.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="font-playfair mb-2 text-[17px] font-semibold">
              Personalización
            </h3>
            <p class="text-sm">
              Los clientes pueden elegir fragancias, formas y colores según sus
              preferencias. Esto permite ofrecer productos exclusivos y
              adaptados a cada necesidad.
            </p>
          </div>

          <!-- Bienestar y Relajación -->
          <div class="rounded-t-4xl bg-rose-100 p-6 text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
              >
                <path
                  d="M21.3153 40.9952L21.2332 40.9821C21.2447 40.9908 21.2582 40.9966 21.2726 40.9989C21.2869 41.0012 21.3016 40.9999 21.3153 40.9952ZM39.986 12.1194C39.9626 11.9977 39.8985 11.8871 39.8039 11.8053C39.7092 11.7235 39.5895 11.6751 39.4637 11.6678C39.3378 11.6605 39.2131 11.6947 39.1094 11.765C39.0056 11.8353 38.9287 11.9377 38.8908 12.0559C38.8546 12.1681 38.7831 12.2661 38.6867 12.3359C38.5902 12.4057 38.4738 12.4436 38.354 12.4443H36.7661C36.6634 12.4444 36.5626 12.4168 36.4746 12.3646L34.1775 11.0107C34.0895 10.9584 33.9887 10.9309 33.886 10.931H30.2114C30.0995 10.9309 29.9902 10.9635 29.8973 11.0248L25.3656 13.9939C25.2873 14.0452 25.2232 14.1148 25.1791 14.1966C25.135 14.2783 25.1123 14.3695 25.1131 14.462V18.673C25.113 18.7739 25.1408 18.873 25.1936 18.9596C25.2464 19.0461 25.3222 19.1169 25.4128 19.1643L31.3548 22.2817C31.4441 22.3289 31.5189 22.3987 31.5716 22.4838C31.6243 22.569 31.6529 22.6664 31.6545 22.766L31.6822 25.1358C31.6838 25.2339 31.7117 25.3299 31.7631 25.414C31.8144 25.4982 31.8874 25.5675 31.9748 25.615L34.3622 26.9135C34.4507 26.9617 34.5244 27.0324 34.5759 27.118C34.6273 27.2037 34.6545 27.3013 34.6548 27.4007V32.3038C34.6548 32.411 34.6863 32.5158 34.7454 32.6059C34.8046 32.6959 34.8889 32.7672 34.9882 32.8113C35.0876 32.8554 35.1978 32.8704 35.3056 32.8544C35.4134 32.8385 35.5142 32.7923 35.596 32.7215C36.5588 31.8882 37.9393 30.6715 38.1231 30.393C38.4269 29.931 38.7119 29.4578 38.9781 28.9736C39.5293 27.9702 39.9962 26.9242 40.374 25.8461C41.6755 22.1425 40.6471 15.485 39.986 12.1194ZM23.3066 23.7234L17.0115 19.0826C16.9404 19.0302 16.854 19.0019 16.7652 19.0019H13.7782C13.7271 19.002 13.6765 18.9921 13.6293 18.9729C13.5821 18.9537 13.5393 18.9255 13.5032 18.8899L12.0949 17.5058C12.0567 17.4683 12.0114 17.4386 11.9616 17.4183C11.9118 17.3981 11.8584 17.3877 11.8044 17.3877H6.34485C6.2679 17.3877 6.19269 17.3653 6.12871 17.3233C6.06474 17.2813 6.01487 17.2216 5.98543 17.1517C5.95598 17.0818 5.94828 17.0049 5.96329 16.9308C5.9783 16.8566 6.01536 16.7885 6.06976 16.735L6.93402 15.8855C6.97011 15.85 7.01299 15.8218 7.06019 15.8026C7.1074 15.7833 7.158 15.7735 7.2091 15.7735H10.5316C10.7106 15.7735 10.8846 15.7161 11.0273 15.6099C11.17 15.5037 11.2735 15.3547 11.322 15.1854L12.0292 12.7137C12.0443 12.6605 12.0703 12.611 12.1056 12.5682C12.1409 12.5253 12.1848 12.49 12.2345 12.4645L15.0541 11.0379C15.1175 11.0057 15.1707 10.9569 15.2078 10.897C15.245 10.837 15.2646 10.7681 15.2645 10.6979V9.43685C15.2646 9.35861 15.289 9.28225 15.3343 9.21793L16.8329 7.09729C16.8778 7.03358 16.9416 6.98498 17.0156 6.95807L19.1126 6.18427C19.1868 6.15694 19.2507 6.10801 19.2958 6.04401C19.3409 5.98 19.3651 5.90399 19.3651 5.82612V4.67601C19.3651 4.61295 19.3493 4.55086 19.319 4.49525C19.2887 4.43964 19.245 4.39223 19.1916 4.35721L17.0895 2.98313C17.0317 2.94579 16.965 2.92407 16.896 2.92017C16.827 2.91627 16.7581 2.93034 16.6964 2.96094L13.8347 4.3673C13.7692 4.39907 13.696 4.41204 13.6234 4.40473C13.5507 4.39741 13.4817 4.3701 13.4241 4.32594L12.0672 3.27167C12.0209 3.23507 11.9837 3.18855 11.9585 3.13567C11.9333 3.08279 11.9207 3.02494 11.9216 2.96654C11.9226 2.90815 11.9372 2.85074 11.9642 2.79872C11.9912 2.74669 12.0299 2.70142 12.0774 2.66635L13.1798 1.86834C13.2297 1.83236 13.2702 1.78517 13.2977 1.73071C13.3253 1.67624 13.3392 1.61609 13.3383 1.55526C13.3374 1.49444 13.3217 1.43471 13.2925 1.38106C13.2634 1.32741 13.2215 1.28141 13.1706 1.24688L11.4534 0.069528C11.3939 0.0283917 11.3239 0.00449983 11.2513 0.000575592C11.1787 -0.00334865 11.1065 0.0128533 11.0428 0.0473336C10.4218 0.381268 8.59991 1.36996 7.95326 1.81487C4.96132 3.87712 2.55349 6.65486 0.957122 9.8858C0.770312 10.2651 0.539366 10.6515 0.516784 11.0682C0.494203 11.4849 0.16164 12.415 0.0230719 12.7913C0.00438067 12.8422 -0.00308962 12.8964 0.00115757 12.9503C0.00540475 13.0042 0.021272 13.0567 0.047706 13.1041L3.71103 19.7202C3.744 19.7804 3.79295 19.8306 3.85268 19.8655L7.70692 22.1395C7.75692 22.1688 7.79958 22.2087 7.83174 22.2564C7.8639 22.3041 7.88473 22.3582 7.8927 22.4149L8.66457 27.9173C8.67212 27.97 8.6907 28.0206 8.71914 28.0659C8.74758 28.1113 8.78527 28.1503 8.82983 28.1806L11.8373 30.2124C11.9244 30.2713 11.9851 30.3609 12.0066 30.4626L13.6017 37.9081C13.6106 37.9518 13.6277 37.9935 13.652 38.0312C13.8018 38.2692 14.3992 39.1409 15.1198 39.27C15.0531 39.2882 14.9935 39.3296 14.9268 39.3487C15.0999 39.3787 15.2712 39.4177 15.44 39.4658C15.6453 39.5202 15.8506 39.5667 16.0559 39.61C16.3772 39.6726 16.409 39.721 16.5629 39.4405C16.7682 39.0652 17.0033 38.9361 17.1788 38.8897C17.2512 38.8733 17.3175 38.8371 17.37 38.7854C17.4224 38.7336 17.459 38.6684 17.4754 38.5971L18.5091 33.8877C18.5308 33.789 18.5894 33.7019 18.6733 33.6436L23.2922 30.4253C23.3459 30.388 23.3897 30.3385 23.4198 30.2811C23.45 30.2237 23.4657 30.16 23.4657 30.0954V24.0462C23.4663 23.984 23.4522 23.9225 23.4246 23.8665C23.397 23.8105 23.3566 23.7615 23.3066 23.7234Z"
                  fill="#3C3C3B"
                />
              </svg>
            </div>
            <h3 class="font-playfair mb-2 text-[17px] font-semibold">
              Beneficios ecológicos
            </h3>
            <p class="text-sm">
              Son biodegradables y no contaminan el medio ambiente. Su
              producción sostenible reduce el impacto ecológico, siendo una
              opción responsable.
            </p>
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
            @for (
              producto of serviceProductos.productosPorCantidad(4);
              track producto._id
            ) {
              <card [producto]="producto"></card>
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
  public cantidadProducto = signal(0);

  public promocionesResource = httpResource<any>(
    () => `${environment.urlApi}/api/promociones`,
  );

  siguienteBotonBanner() {}
}
