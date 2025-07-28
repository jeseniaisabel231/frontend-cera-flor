import { CurrencyPipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxStripeModule } from 'ngx-stripe';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { FacturaService } from '../../services/facturas.service';
import { PaymentService } from '../../services/payment.service';
import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
import { BarranavComponent } from '../components/barranav.component';
import { BillComponent } from '../components/bill.component';
import { Headers } from '../components/header.component';
import type { usuario } from '../interfaces/usuario.interface';
import { venta } from '../interfaces/venta.interface';

@Component({
  imports: [
    Headers,
    BarranavComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    NgxStripeModule,
    BillComponent,
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
                  Datos para el envío
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
                    @let cedulaInvalida =
                      (formularioDireccion.get('cedula')?.invalid &&
                        formularioDireccion.get('cedula')?.value) ||
                      errores().cedula;

                    <label class="mb-1 block text-sm font-medium">Cédula</label>
                    <input
                      type="text"
                      class="focus:ring-morado-400 placeholder-gris-300 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none disabled:bg-gray-100"
                      placeholder="1711223344"
                      formControlName="cedula"
                      (input)="borrarErrores('cedula')"
                      data-testid="cedula-input"
                    />

                    @if (cedulaInvalida) {
                      <p class="mt-1 text-sm text-red-500">
                        La cédula debe tener 10 dígitos y solo números.
                      </p>
                    } @else if (errores().cedula) {
                      <p class="mt-1 text-sm text-red-500">
                        {{ errores().cedula }}
                      </p>
                    }
                  </div>
                  <div>
                    @let direccionInvalida =
                      (formularioDireccion.get('direccion')?.invalid &&
                        formularioDireccion.get('direccion')?.value) ||
                      errores().direccion;
                    <label class="mb-1 block text-sm font-medium">
                      Dirección
                    </label>
                    <input
                      type="text"
                      class="focus:ring-morado-400 placeholder-gris-300 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none disabled:bg-gray-100"
                      placeholder="Pichincha, Quito, Av. Amazonas 1234"
                      formControlName="direccion"
                      (input)="borrarErrores('direccion')"
                      data-testid="direccion-input"
                    />
                    @if (direccionInvalida) {
                      <p class="mt-1 text-sm text-red-500">
                        La dirección debe tener entre 5 y 30 caracteres.
                      </p>
                    } @else if (errores().direccion) {
                      <p class="mt-1 text-sm text-red-500">
                        {{ errores().direccion }}
                      </p>
                    }
                  </div>
                  <div>
                    @let telefonoInvalido =
                      (formularioDireccion.get('telefono')?.invalid &&
                        formularioDireccion.get('telefono')?.value) ||
                      errores().telefono;
                    <label class="mb-1 block text-sm font-medium">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      class="focus:ring-morado-400 placeholder-gris-300 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none disabled:bg-gray-100"
                      placeholder="0991234567"
                      formControlName="telefono"
                      (input)="borrarErrores('telefono')"
                      data-testid="telefono-input"
                    />
                    @if (telefonoInvalido) {
                      <p class="mt-1 text-sm text-red-500">
                        El teléfono debe tener 10 dígitos y solo números.
                      </p>
                    } @else if (errores().telefono) {
                      <p class="mt-1 text-sm text-red-500">
                        {{ errores().telefono }}
                      </p>
                    }
                  </div>
                  @if (modificarDatos()) {
                    <button
                      (click)="onSubmitDatos()"
                      class="bg-morado-600 hover:bg-morado-700 mt-6 w-full cursor-pointer rounded-[12px] py-2 font-semibold text-white transition-colors disabled:bg-gray-400"
                      data-testid="guardar-datos-button"
                    >
                      Guardar datos de envío
                    </button>
                  } @else {
                    <button
                      (click)="modificarDatos.set(true)"
                      class="bg-morado-600 hover:bg-morado-700 mt-6 w-full cursor-pointer rounded-[12px] py-2 font-semibold text-white transition-colors disabled:bg-gray-400"
                      data-testid="modificar-datos-button"
                    >
                      Modificar datos de envío
                    </button>
                  }
                </form>
              </fieldset>
              <form>
                <legend class="mb-4 text-lg font-medium">Método de pago</legend>
                <p class="mb-4 text-sm">
                  Utiliza una tarjeta de crédito o débito, o escoge un método de pago para completar tu
                  compra. Asegúrate de que el método escogido tenga
                  fondos suficientes.
                </p>

                <!-- forma de paago -->
                <div #formulariopagoref id="formulariopago"></div>

                <button
                  (click)="onSubmitPago($event)"
                  class="bg-morado-600 hover:bg-morado-700 mt-6 flex w-full cursor-pointer items-center justify-center rounded-[12px] py-3 font-semibold text-white transition-colors disabled:bg-gray-400"
                  [disabled]="modificarDatos() || serviceCarrito.carrito().productos.length === 0"
                  data-testid="pagar-button"
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
                  } @else if (serviceCarrito.carrito().productos.length === 0) {
                    <span>No hay productos en el carrito</span>
                  } @else {
                    Pagar {{ serviceCarrito.carrito().total | currency }}
                  }
                </button>
              </form>
              <app-modal
                [(mostrarModal)]="mostrarModalError"
                [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
                [mensaje]="respuestaBack()"
                [tipo]="tipoRespuesta()"
              ></app-modal>

              <app-bill
                [(mostrarModal)]="mostrarVenta"
                [verVenta]="ventaCreada()"
                [datosCliente]="datosCliente()"
                (alCerrar)="alCerrar()"
                data-testid="factura"
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
  public mostrarModalError = signal(false);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal<string>('');
  public modificarDatos = signal<boolean>(true);
  public router = inject(Router);
  public formulariopago = viewChild<ElementRef<any>>('formulariopagoref');
  public servicioFactura = inject(FacturaService);

  public ventaCreada = signal<venta>({} as venta);
  public datosCliente = signal<usuario>({} as usuario);
  public mostrarVenta = signal<boolean>(false);

  public errores = signal<any>({
    direccion: '',
    cedula: '',
    telefono: '',
  });
  public formularioDireccion = new FormGroup({
    direccion: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s\#\-\.,/°]{5,30}$/),
    ]),
    cedula: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
  });

  borrarErrores(clave: string) {
    this.errores.update((state) => ({
      ...state,
      [clave]: '',
    }));
  }

  constructor() {
    effect(() => {
      const { direccion, cedula, telefono } =
        this.servicePerfil.datosUsuario() ?? {};
      if (direccion && cedula && telefono) {
        this.modificarDatos.set(false);
      }
      this.formularioDireccion.patchValue({ direccion, cedula, telefono });
    });

    effect(() => {
      if (this.modificarDatos()) {
        this.formularioDireccion.enable();
      } else {
        this.formularioDireccion.disable();
      }
    });

    effect(() => {
      if (this.formulariopago()) {
        this.servicePayment.crearElementoTarjeta();
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

  onSubmitDatos() {
    const { direccion, cedula, telefono } = this.formularioDireccion.value;
    const formData = new FormData();

    if (!direccion?.trim()) {
      this.errores.update((state) => ({
        ...state,
        direccion: 'La dirección es requerida.',
      }));
      return;
    }

    formData.append('direccion', direccion as string);
    formData.append('cedula', cedula as string);
    formData.append('telefono', telefono as string);

    this.servicePerfil
      .actualizarPerfil(formData)
      .subscribe({
        next: () => {
          this.modificarDatos.set(false);
          this.tipoRespuesta.set('exito');
          this.respuestaBack.set('Datos de envío actualizados correctamente.');
        },
        error: ({ error }) => {
          const { details = [] } = error;
          details.forEach(({ path, msg }: any) => {
            this.errores.update((state) => ({
              ...state,
              [path]: msg,
            }));
          });
          this.tipoRespuesta.set('error');
          this.respuestaBack.set(
            error.msg ?? 'Ocurrió un error al actualizar los datos.',
          );
        },
      })
      .add(() => this.mostrarModalError.set(true));
  }

  public alCerrar() {
    this.router.navigate(['/pedidos']);
  }

  async onSubmitPago(event: Event) {
    event.preventDefault();

    this.carga.set(true);
    try {
      const servicePaymentPromise = await this.servicePayment.pagarCarrito();
    servicePaymentPromise
      .subscribe({
        next: ({ venta, cliente }) => {
          this.ventaCreada.set(venta);
          this.datosCliente.set(cliente);
          this.mostrarVenta.set(true);
          this.serviceCarrito.vaciarCarrito(true);
          this.servicioFactura.obtenerFacturas().subscribe();
        },
        error: () => {
          this.tipoRespuesta.set('error');
          this.mostrarModalError.set(true);
          this.respuestaBack.set(
            'Error al procesar el pago. Por favor, inténtalo de nuevo.',
          );
        },
      })
      .add(() => this.carga.set(false));
    } catch (error) {
      this.carga.set(false);
      this.tipoRespuesta.set('error');
      this.mostrarModalError.set(true);
      this.respuestaBack.set(
        'Error al procesar el pago. Por favor, inténtalo de nuevo.',
      );
    }
  }
}
