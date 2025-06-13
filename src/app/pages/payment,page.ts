import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { PaymentService } from '../../services/payment.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { BarranavComponent } from '../components/barranav.component';
import { Headers } from '../components/header.component';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    NgxStripeModule,
    ModalAvisosComponent,
  ],
  template: `
    <headers></headers>
    <main class="flex min-h-screen flex-col">
      <barranav rutaSeccionSeleccionada="pago"></barranav>

      <section class="min-h-screen bg-gray-100 px-4 py-8">
        <div class="mx-auto max-w-6xl">
          <h1 class="mt-10 mb-4 text-[24px] font-bold">Finalizar Compra</h1>

          <article class="flex flex-col gap-8 sm:gap-4 lg:flex-row">
            <!-- formulario para pagar -->
            <section class="rounded-lg bg-white p-6 shadow-md lg:w-2/3">
              <fieldset class="mb-8">
                <legend class="mb-4 text-lg font-medium">
                  Dirección de Envío
                </legend>
                <p class="mb-4 text-sm">
                  Recuerda colocar tu dirección de envío. Si necesitas modificarla, hazlo antes de proceder al pago.
                </p>
                <form
                  class="grid grid-cols-1 gap-4 md:grid-cols-2"
                  [formGroup]="direccion"
                >
                  <div>
                    <label class="mb-1 block text-sm font-medium ">
                      Calle y número
                    </label>
                    <input
                      type="text"
                      class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none "
                      placeholder="Calle Principal 123"
                      formControlName="calle"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium">
                      Provincia
                    </label>
                    <input
                      type="text"
                      class="ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                      placeholder="Provincia"
                      formControlName="provincia"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium">Ciudad</label>
                    <input
                      type="text"
                      class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                      placeholder="Ciudad"
                      formControlName="ciudad"
                    />
                  </div>
                  @if (modificarDireccion()) {
                    <button
                      (click)="OnSubmitDireccion()"
                      class="mt-6 w-full rounded-[12px] bg-[#9810fa] py-3 font-semibold text-white transition-colors hover:bg-[#7a0dc7] disabled:bg-gray-400"
                    >
                      Guardar dirección
                    </button>
                  }
                  @else {
                    <button
                      (click)="modificarDireccion.set(true)"
                      class="mt-6 w-full rounded-[12px] bg-[#9810fa] py-3 font-semibold text-white transition-colors hover:bg-[#7a0dc7] disabled:bg-gray-400"
                    >
                      Modificar dirección
                    </button>
                  }
                </form>
              </fieldset>
              <form>
                <legend class="mb-4 text-lg font-medium">Método de pago</legend>
                <p class="mb-4 text-sm">
                  Utiliza una tarjeta de crédito o débito para completar tu
                  compra. Asegúrate de que la tarjeta esté a tu nombre y tenga
                  fondos suficientes.
                </p>

                <!-- forma de paago -->
                <ngx-stripe-card
                  [elementsOptions]="opcionesFormularioPago"
                  id="formulariopago"
                ></ngx-stripe-card>

                <button
                  (click)="OnSubmitPago($event)"
                  class="mt-6 w-full rounded-[12px] bg-[#9810fa] py-3 font-semibold text-white transition-colors hover:bg-[#7a0dc7] disabled:bg-gray-400"
                  [disabled]="modificarDireccion()"
                >
                  Pagar
                </button>
              </form>
              <app-modal
                [mostrarModal]="mostrarModalExito()"
                [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
                [mensaje]="respuestaBack()"
                [tipo]="tipoRespuesta()"
                (closed)="cerraTodo()"
              ></app-modal>

              <!-- <fieldset>
                <legend class="mb-4 text-lg font-medium">Método de Pago</legend>
                <div class="mb-6 rounded-lg border border-gray-200 p-4">
                  <div class="mb-4 flex items-center">
                    <label class="block text-sm font-medium text-gray-700">
                      Tarjeta de crédito/débito
                    </label>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <label
                        class="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                      />
                      <figure class="mt-2 flex space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="11.578"
                          viewBox="0 0 256 114"
                        >
                          <path
                            fill="#1A1F71"
                            d="M97.197 1.46 63.68 81.418H41.814L25.32 17.604c-1-3.921-1.869-5.364-4.912-7.022C15.434 7.88 7.22 5.353 0 3.781L.487 1.46h35.204c4.48 0 8.514 2.983 9.54 8.148l8.715 46.273L75.462 1.46zm29.56 0-17.103 79.958H88.966L106.071 1.46zm56.116 53.852c.086-21.099-29.174-22.27-28.983-31.697.07-2.866 2.8-5.917 8.776-6.697 2.96-.383 11.138-.688 20.401 3.58l3.624-16.966C181.714 1.732 175.309 0 167.342 0c-20.45 0-34.835 10.862-34.95 26.428-.134 11.514 10.275 17.931 18.103 21.766 8.063 3.916 10.767 6.433 10.73 9.933-.058 5.365-6.44 7.74-12.373 7.828-10.404.165-16.435-2.812-21.246-5.053l-3.755 17.528c4.84 2.218 13.76 4.145 22.999 4.243 21.74 0 35.959-10.737 36.023-27.36m54 26.106H256L239.29 1.46h-17.647c-3.98 0-7.325 2.31-8.809 5.861l-31.04 74.097h21.723l4.309-11.944h26.54zm-23.09-28.329 10.892-30.027 6.257 30.027zm-60.55 50.338h-8.406v7.823h9.402v2.352h-12.234V91.9h11.752v2.352h-8.92v6.857h8.405zm5.339-12.686h2.832v22.86h-2.832zm9.978 15.583c.064 3.833 2.48 5.41 5.344 5.41 2.03 0 3.285-.354 4.317-.804l.514 2.029c-.998.45-2.736.997-5.217.997-4.796 0-7.661-3.187-7.661-7.889 0-4.7 2.767-8.372 7.308-8.372 5.12 0 6.44 4.445 6.44 7.31 0 .579-.033.997-.098 1.32zm8.307-2.028c.033-1.77-.74-4.572-3.928-4.572-2.898 0-4.122 2.608-4.348 4.572zm18.154 8.758c-.74.355-2.383.903-4.475.903-4.701 0-7.76-3.188-7.76-7.954 0-4.798 3.283-8.307 8.371-8.307 1.674 0 3.155.417 3.928.837l-.642 2.157c-.679-.354-1.741-.742-3.286-.742-3.575 0-5.505 2.673-5.505 5.895 0 3.605 2.318 5.827 5.409 5.827 1.61 0 2.672-.386 3.477-.74zm7.948-18.772v3.735h4.056v2.156h-4.056v8.405c0 1.934.548 3.027 2.125 3.027.772 0 1.224-.063 1.643-.194l.129 2.16c-.548.192-1.417.385-2.512.385-1.321 0-2.384-.451-3.059-1.19-.773-.871-1.095-2.254-1.095-4.09v-8.503h-2.416v-2.156h2.416V95.12zm8.013 8.598c0-1.836-.034-3.413-.129-4.863h2.48l.13 3.09h.094c.71-2.091 2.447-3.412 4.346-3.412.291 0 .517.033.775.064v2.674c-.29-.066-.579-.066-.968-.066-1.994 0-3.413 1.481-3.798 3.608a8.5 8.5 0 0 0-.097 1.32v8.308h-2.833zm25.111 2.8c0 5.764-4.026 8.276-7.76 8.276-4.187 0-7.47-3.092-7.47-8.017 0-5.185 3.445-8.243 7.728-8.243 4.475 0 7.502 3.25 7.502 7.985m-12.333.162c0 3.413 1.932 5.99 4.701 5.99 2.706 0 4.733-2.546 4.733-6.055 0-2.64-1.32-5.958-4.669-5.958-3.315 0-4.765 3.093-4.765 6.023m16.675-3.607c0-1.641-.034-2.93-.13-4.217h2.512l.161 2.576h.064c.773-1.45 2.576-2.898 5.152-2.898 2.156 0 5.506 1.288 5.506 6.631v9.275h-2.833v-8.984c0-2.51-.934-4.605-3.606-4.605-1.836 0-3.286 1.321-3.799 2.898-.13.355-.194.837-.194 1.321v9.37h-2.833z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="20.211"
                          viewBox="0 0 256 199"
                        >
                          <path
                            d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342-2.634 0-5.488.878-7.464 3.732-1.536-2.415-3.731-3.732-7.024-3.732-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488 3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488 3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683 1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195-5.268 0-8.78 2.634-8.78 6.805 0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195 0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634 6.147 0 9.66-2.853 9.66-6.805 0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975 0-1.537 1.536-2.415 3.951-2.415 2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976 3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975-3.732 0-6.366-2.634-6.366-6.805 0-3.951 2.634-6.586 6.366-6.805 1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805 3.732 0 6.367 2.854 6.367 6.805 0 3.732-2.635 6.805-6.367 6.805-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05 5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805 3.732 0 6.366 2.854 6.366 6.805 0 3.732-2.634 6.805-6.366 6.805-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805 3.732 0 6.367 2.854 6.367 6.805 0 3.732-2.635 6.805-6.367 6.805-3.951-.22-6.366-3.073-6.366-6.805"
                          />
                          <path
                            fill="#FF5F00"
                            d="M93.298 16.903h69.15v124.251h-69.15z"
                          />
                          <path
                            fill="#EB001B"
                            d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0 35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904-18.22-14.269-30.074-36.88-30.074-62.125"
                          />
                          <path
                            fill="#F79E1B"
                            d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029-18.44 0-35.343-6.366-48.734-16.904 18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
                          />
                        </svg>
                      </figure>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          class="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Fecha de expiración
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          class="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Código de seguridad
                        </label>
                        <input
                          type="text"
                          placeholder="CVC"
                          class="focus:ring-morado-400 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  class="w-full rounded-[12px] bg-[#9810fa] py-3 font-semibold text-white transition-colors hover:bg-[#7a0dc7] disabled:bg-gray-400"
                >
                  Confirmar Pago
                </button>
              </fieldset> -->
            </section>

            <aside class="h-fit lg:w-2/5 lg:pl-4">
              <div
                class="sticky top-28 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 class="mb-4 text-xl font-bold text-gray-800">
                  Resumen del pedido
                </h3>

                <ul class="space-y-3 text-gray-700">
                  <li class="flex justify-between">
                    <span>
                      Subtotal ({{ carritoProductos.productos?.length }}
                      productos)
                    </span>
                    <span class="font-medium">
                      {{ calcularSubtotal() | currency }}
                    </span>
                  </li>
                  <li class="flex justify-between">
                    <span>Impuestos</span>
                    <span class="font-medium">
                      {{ calcularImpuestos() | currency }}
                    </span>
                  </li>
                  <li
                    class="flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold"
                  >
                    <span>Total a pagar:</span>
                    <span class="text-[#9810fa]">
                      {{ carritoProductos.total | currency }}
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </article>
        </div>
      </section>
    </main>
  `,
})
export class PaymentPage {
  public serviceCarrito = inject(CarritoService);
  public carritoProductos: any = {};
  public cantidad = signal(1);
  public cantidadProducto = signal(0);
  public servicePerfil = inject(AuthService);
  public servicePayment = inject(PaymentService);
  public mostrarModalExito = signal(false);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public mostrarModal = model<boolean>(false);
  public modificarDireccion = signal<boolean>(false);

  public direccion = new FormGroup({
    calle: new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
  });

  constructor() {
    // Inicializar el carrito al cargar la página
    this.serviceCarrito.obtenerCarrito().subscribe({
      next: (respuesta) => {
        this.carritoProductos = respuesta.carrito ?? {}; // Asignar el carrito a la variable objeto{}
      },
      error: (error) => {
        console.error('Error al cargar el carrito:', error);
      },
    });

    this.servicePerfil.obtenerPerfil().subscribe({
      next: (respuesta) => {
        const {
          cliente: { direccion },
        } = respuesta;

        if(direccion) {
          const [calle, provincia, ciudad] = direccion.split(', ');
          this.direccion.setValue({
            calle: calle || '',
            provincia: provincia || '',
            ciudad: ciudad || '',
          });
        }else{
          this.modificarDireccion.set(true); // Si no hay dirección, permitimos modificarla
        }
      },
      error: (error) => {
      },
    });

    effect(() => {
      if(this.modificarDireccion()) {
        this.direccion.enable();
      }else{
        this.direccion.disable();
      }
    })
  }
  calcularSubtotal() {
    const iva = 0.15;
    const impuestos = this.carritoProductos.total * iva;
    return this.carritoProductos.total - impuestos;
  }
  calcularImpuestos() {
    const iva = 0.15;
    return this.carritoProductos.total * iva;
  }
  OnSubmitDireccion() {
    const direccionData = this.direccion.value;
    const direccionConcatenada = `${direccionData.calle}, ${direccionData.provincia}, ${direccionData.ciudad}`;

    const formData = new FormData();
    formData.append('direccion', direccionConcatenada);

    this.servicePerfil.actualizarPerfil(formData).subscribe({
      next: (respuesta) => {
        this.modificarDireccion.set(false);
      },
      error: (error) => {
      },
    });
  }
  cerraTodo() {
    this.mostrarModalExito.set(false);
    if (this.tipoRespuesta() === 'exito') {
      this.close(); // Solo cerramos el formulario si fue éxito
    }
  }
  public close() {
    this.mostrarModal.set(false);
  }

  opcionesFormularioPago: StripeElementsOptions = {
    locale: 'es',
  };

  async OnSubmitPago(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const servicePaymentPromise = await this.servicePayment.pagarCarrito();

    servicePaymentPromise.subscribe({
      next: (respuesta: any) => {
        this.tipoRespuesta.set('exito');
        this.mostrarModalExito.set(true);
        this.respuestaBack.set(
          'Pago realizado con éxito. ¡Gracias por tu compra!',
        );

      },
      error: (error: any) => {
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      },
    });
  }
}
