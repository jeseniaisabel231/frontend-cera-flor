import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { PaymentService } from '../../services/payment.service';
import { BarranavComponent } from '../components/barranav.component';
import { BillComponent } from '../components/bill.component';
import { Headers } from '../components/header.component';
import { venta } from '../interfaces/venta.interface';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    NgxStripeModule,
    BillComponent,
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
                  Recuerda colocar tu dirección de envío. Si necesitas
                  modificarla, hazlo antes de proceder al pago.
                </p>
                <form
                  class="grid grid-cols-1 gap-4 md:grid-cols-2"
                  [formGroup]="formularioDireccion"
                >
                  <div>
                    <label class="mb-1 block text-sm font-medium">
                      Dirección
                    </label>
                    <input
                      type="text"
                      class="focus:ring-morado-400 placeholder-gris-300 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                      placeholder="Pichincha, Quito, Av. Amazonas 1234"
                      formControlName="direccion"
                    />
                  </div>
                  @if (modificarDireccion()) {
                    <button
                      (click)="OnSubmitDireccion()"
                      class="bg-morado-600 hover:bg-morado-700 mt-6 w-full cursor-pointer rounded-[12px] py-2 font-semibold text-white transition-colors disabled:bg-gray-400"
                    >
                      Guardar dirección
                    </button>
                  } @else {
                    <button
                      (click)="modificarDireccion.set(true)"
                      class="bg-morado-600 hover:bg-morado-700 mt-6 w-full cursor-pointer rounded-[12px] py-2 font-semibold text-white transition-colors disabled:bg-gray-400"
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
                  class="bg-morado-600 hover:bg-morado-700 mt-6 w-full cursor-pointer rounded-[12px] py-3 font-semibold text-white transition-colors disabled:bg-gray-400"
                  [disabled]="modificarDireccion()"
                >
                  @if (carga()) {
                    <svg
                      class="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="#fff"
                    >
                      <path
                        d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
                      />
                    </svg>
                  } @else {
                    Pagar
                  }
                </button>
              </form>
              <!-- <app-modal
                [(mostrarModal)]="mostrarModalExito"
                [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
                [mensaje]="respuestaBack()"
                [tipo]="tipoRespuesta()"
              ></app-modal> -->

              <app-bill
                [(mostrarModal)]="mostrarVenta"
                [verVenta]="ventaCreada()"
              />
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
                      Subtotal ({{ serviceCarrito.carrito().productos.length }}
                      productos)
                    </span>
                    <span class="font-medium">
                      {{ calcularSubtotal() | currency }}
                    </span>
                  </li>
                  <li class="flex justify-between">
                    <span>Impuestos (IVA 15%)</span>
                    <span class="font-medium">
                      {{ calcularImpuestos() | currency }}
                    </span>
                  </li>
                  <li
                    class="flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold"
                  >
                    <span>Total a pagar:</span>
                    <span class="text-[#9810fa]">
                      {{ serviceCarrito.carrito().total | currency }}
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
  public carga = signal(false);
  public serviceCarrito = inject(CarritoService);
  public servicePerfil = inject(AuthService);
  public servicePayment = inject(PaymentService);
  public mostrarModalExito = signal(false);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public modificarDireccion = signal<boolean>(false);

  public ventaCreada = signal<venta>({} as venta);
  public mostrarVenta = signal<boolean>(false);

  public opcionesFormularioPago: StripeElementsOptions = {
    locale: 'es',
  };

  public formularioDireccion = new FormGroup({
    direccion: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s\#\-\.,/°]{5,30}$/),
    ]),
  });

  constructor() {
    effect(() => {
      const { direccion } = this.servicePerfil.datosUsuario() ?? {};
      if (direccion) {
        this.formularioDireccion.patchValue({ direccion });
        this.modificarDireccion.set(false);
      } else {
        this.modificarDireccion.set(true);
      }
    });

    effect(() => {
      if (this.modificarDireccion()) {
        this.formularioDireccion.enable();
      } else {
        this.formularioDireccion.disable();
      }
    });
  }

  calcularSubtotal() {
    const iva = 0.15;
    const impuestos = this.serviceCarrito.carrito().total * iva;
    return this.serviceCarrito.carrito().total - impuestos;
  }

  calcularImpuestos() {
    const iva = 0.15;
    return this.serviceCarrito.carrito().total * iva;
  }

  OnSubmitDireccion() {
    const formData = new FormData();
    formData.append(
      'direccion',
      this.formularioDireccion.value.direccion as string,
    );

    this.servicePerfil.actualizarPerfil(formData).subscribe(() => {
      this.modificarDireccion.set(false);
    });
  }

  async OnSubmitPago(event: Event) {
    event.preventDefault();

    this.carga.set(true);
    const servicePaymentPromise = await this.servicePayment.pagarCarrito();
    console.log('servicePaymentPromise', servicePaymentPromise);
    servicePaymentPromise.subscribe({
      next: ({ venta }) => {
        this.carga.set(false);
        this.ventaCreada.set(venta);
        this.mostrarVenta.set(true);
      },
      error: (error) => {
        this.carga.set(false);
        this.tipoRespuesta.set('error');
        this.mostrarModalExito.set(true);
        this.respuestaBack.set(
          'Error al procesar el pago. Por favor, inténtalo de nuevo.',
        );
        console.error('Error al procesar el pago:', error);
      },
    });
  }
}
