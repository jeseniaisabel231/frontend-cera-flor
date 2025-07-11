import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import type { productoPersonalizado } from '../interfaces/personalizacion.interface';
import { transformaFecha } from '../utils/transformaFecha';

@Component({
  selector: 'app-modal-resumen',
  imports: [TitleCasePipe, CurrencyPipe, RouterLink],
  template: `
    <dialog
      #modal
      class="m-auto w-11/12 max-w-3xl rounded-lg bg-white p-6 text-gray-800 outline-none backdrop:bg-gray-600/30 backdrop:backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-y-4">
        <!-- Título del modal -->
        <h1 class="text-xl font-bold text-purple-800">
          {{ obtenerNombreProducto() }}
        </h1>
        <!-- Información del producto -->
        <div class="flex w-full items-center justify-evenly gap-x-4">
          <!-- Imagen del producto -->
          <div class="flex flex-col gap-y-2">
            <figure
              class="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed"
              [routerLink]="['/taller-juego', datos().id_categoria]"
              [queryParams]="{ producto: datos()._id }"
            >
              <img
                [src]="datos().imagen"
                alt="Imagen del producto"
                class="max-h-50 shadow-md"
              />
              <div
                class="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100 group-hover:backdrop-blur-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="white"
                    d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"
                  />
                </svg>
                <span class="text-sm font-bold">
                  ¿Deseas editar este producto personalizado?
                </span>
              </div>
            </figure>
            <div class="flex flex-col">
              <p class="text-sm text-gray-400">
                Creado el:
                {{ formatearFecha(datos().createdAt) }}
              </p>
              <p class="text-sm text-gray-400">
                Actualizado el:
                {{ formatearFecha(datos().updatedAt) }}
              </p>
            </div>
          </div>
          <div class="space-y-4">
            <!-- Ingredientes personalizados -->
            <div class="space-y-2">
              <div
                class="bg-morado-500 flex justify-between gap-x-2 rounded-lg px-4 py-1"
              >
                <p>
                  <strong>Aroma:</strong>
                  {{ aroma().nombre | titlecase }}
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
                  />
                </svg>

                <strong class="text-white">
                  {{
                    calcularPrecioSinIVA(aroma().precio)
                      | currency: 'USD' : 'symbol'
                  }}
                </strong>
              </div>
              <div
                class="bg-celeste-500 flex justify-between gap-x-2 rounded-lg px-4 py-1"
              >
                <p>
                  <strong>Colorante:</strong>
                  {{ color().nombre | titlecase }}
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
                  />
                </svg>

                <strong class="text-white">
                  {{
                    calcularPrecioSinIVA(color().precio)
                      | currency: 'USD' : 'symbol'
                  }}
                </strong>
              </div>
              <div
                class="flex justify-between gap-x-2 rounded-lg bg-sky-300 px-4 py-1"
              >
                <p>
                  <strong>Molde:</strong>
                  {{ molde().nombre | titlecase }}
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
                  />
                </svg>

                <strong class="text-white">
                  {{
                    calcularPrecioSinIVA(molde().precio)
                      | currency: 'USD' : 'symbol'
                  }}
                </strong>
              </div>
              <div class="flex flex-col rounded-lg bg-pink-400 px-4 py-1">
                <strong>Esencias:</strong>
                <ul>
                  @for (esencia of esencias(); track $index) {
                    <li class="flex items-center justify-between">
                      {{ esencia.nombre | titlecase }}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="white"
                          d="M16.15 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
                        />
                      </svg>

                      <strong class="text-white">
                        {{
                          calcularPrecioSinIVA(esencia.precio)
                            | currency: 'USD' : 'symbol'
                        }}
                      </strong>
                    </li>
                  }
                </ul>
              </div>
            </div>

            <!-- Subtotal -->
            <div>
              <div class="mt-4 flex justify-between border-t pt-2 text-sm">
                <span>Subtotal:</span>
                <span class="text-purple-700">
                  {{
                    calcularPrecioSinIVA(datos().precio)
                      | currency: 'USD' : 'symbol'
                  }}
                </span>
              </div>

              <div class="flex justify-between text-sm">
                <span>IVA (15%):</span>
                <span class="text-purple-700">
                  {{ datos().precio * 0.15 | currency: 'USD' : 'symbol' }}
                </span>
              </div>

              <div class="flex justify-between text-lg">
                <strong>Total:</strong>
                <span class="font-bold text-purple-700">
                  {{ datos().precio | currency: 'USD' : 'symbol' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex w-full items-center justify-end gap-4">
          <button
            class="h-10 w-auto cursor-pointer rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
            (click)="anadirCarrito()"
          >
            @if (cargando()) {
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
              Añadir carrito
            }
          </button>
          <button
            class="cursor-pointer rounded-[15px] bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
            (click)="mostrarModal.set(false)"
          >
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  `,
})
export class ModalResumenProductoComponent {
  public serviceCarrito = inject(CarritoService);
  public cargando = signal(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public datos = input.required<productoPersonalizado>();
  public router = inject(Router);

  public molde = signal<any>({});
  public color = signal<any>({});
  public aroma = signal<any>({});
  public esencias = signal<any[]>([]);

  constructor() {
    effect(() => {
      const dialog = this.modal()?.nativeElement;
      if (this.mostrarModal()) {
        dialog?.showModal?.();
      } else {
        dialog?.close?.();
      }
    });

    effect(() => {
      const ingredientes = this.datos().ingredientes;
      const esenciasArray: any[] = [];

      ingredientes?.forEach(({ nombre, precio, tipo }) => {
        switch (tipo) {
          case 'molde':
            this.molde.set({ nombre, precio });
            break;
          case 'color':
            this.color.set({ nombre, precio });
            break;
          case 'aroma':
            this.aroma.set({ nombre, precio });
            break;
          case 'esencia':
            esenciasArray.push({ nombre, precio });
            break;
        }
      });

      this.esencias.set(esenciasArray);
    });
  }

  public obtenerNombreProducto(): string {
    const nombreMolde = new TitleCasePipe().transform(this.molde().nombre);
    const nombreColor = new TitleCasePipe().transform(this.color().nombre);

    return `Jabón con Forma ${nombreMolde} de Color ${nombreColor}`;
  }

  public formatearFecha(fecha: string): string {
    return transformaFecha(fecha);
  }

  public calcularPrecioSinIVA(precio: number): number {
    return precio / 1.15;
  }

  public anadirCarrito(): void {
    const { tipo_producto, ...datos }  = this.datos();
    this.cargando.set(true);
    this.serviceCarrito
      .agregarCarrito(datos, 1, undefined, tipo_producto)
      .subscribe(() => this.router.navigate(['/carrito']))
      .add(() => this.cargando.set(false));
  }
}
