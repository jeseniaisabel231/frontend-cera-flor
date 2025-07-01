import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import type { usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-bill',
  imports: [CurrencyPipe, DatePipe],
  template: `
    <dialog
      #modal
      class="m-auto w-11/12 max-w-3xl rounded-lg bg-white p-6 text-gray-800 outline-none backdrop:bg-gray-600/30 backdrop:backdrop-blur-sm"
    >
      <button
        class="absolute top-4 right-4 cursor-pointer focus:outline-none"
        (click)="mostrarModal.set(false)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 512 512"
        >
          <path
            fill="#3C3C3B"
            d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"
          />
        </svg>
      </button>
      <div class="mx-auto max-w-3xl rounded-xl bg-white text-gray-800 *:p-8">
        <!-- Encabezado -->
        <div #factura>
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <img src="logo.png" alt="Logo de Flor & Cera" />
              <h2 class="font-playfair text-2xl font-bold">Flor & Cera</h2>
            </div>
            <div class="text-right">
              <p class="text-sm">
                Factura #:
                <span class="font-medium uppercase">
                  FC-{{ (verVenta()._id || '').slice(0, 8) }}
                </span>
              </p>
              <p class="text-sm">Fecha: {{ now | date: 'dd/MM/yyyy' }}</p>
            </div>
          </div>

          <!-- datos del cliente -->
          <div class="mb-6">
            <h3 class="mb-2 text-lg font-semibold">Datos del Cliente</h3>
            <p>
              <span class="font-semibold">Nombre:</span>
              {{ datosCliente().nombre }}
            </p>
            <p>
              <span class="font-semibold">Dirección:</span>
              {{ datosCliente().direccion }}
            </p>
            <p>
              <span class="font-semibold">Teléfono:</span>
              {{ datosCliente().telefono ?? 'No registrado' }}
            </p>
            <p>
              <span class="font-semibold">Correo:</span>
              {{ datosCliente().email }}
            </p>
          </div>

          <!-- Tabla de productos -->
          <div class="mb-6 max-w-3xl">
            <h3 class="mb-2 text-lg font-semibold">Detalle de Productos</h3>
            <table class="w-full border text-sm">
              <thead class="bg-gray-100 text-left">
                <tr>
                  <th class="border p-2">Producto</th>
                  <th class="border p-2">Descripcion</th>
                  <th class="border p-2 text-center">Cantidad</th>
                  <th class="border p-2 text-right">Precio Unitario</th>
                  <th class="border p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                @for (item of verVenta().productos; track $index) {
                  <tr>
                    <td
                      class="max-w-30 overflow-hidden border p-2 text-ellipsis whitespace-nowrap"
                    >
                      {{ item.producto.nombre }}
                    </td>
                    <td
                      class="max-w-50 overflow-hidden border p-2 text-ellipsis whitespace-nowrap"
                    >
                      {{
                        item.producto?.descripcion ??
                          'Producto personalizado por el cliente'
                      }}
                    </td>
                    <td class="border p-2 text-center">
                      {{ item.cantidad }}
                    </td>
                    <td class="border p-2 text-right">
                      {{ item.producto.precio | currency: 'USD' }}
                    </td>
                    <td class="border p-2 text-right">
                      {{ item.subtotal | currency: 'USD' }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Totales -->
          <div class="mb-6 flex justify-end">
            <div class="w-full sm:w-1/2 lg:w-1/3">
              <div class="flex justify-between">
                <span class="font-medium">Subtotal:</span>
                <span>{{ subtotal() | currency: 'USD' : 'symbol' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">IVA (15%):</span>
                <span>{{ iva() | currency: 'USD' : 'symbol' }}</span>
              </div>
              <div
                class="mt-2 flex justify-between border-t pt-2 font-bold text-purple-700"
              >
                <span>Total a pagar:</span>
                <span>{{ verVenta().total | currency: 'USD' : 'symbol' }}</span>
              </div>
            </div>
          </div>

          <!-- Pago y nota -->
          <!-- <div class="mb-4">
            <p>
              <span class="font-medium">Método de pago:</span>
              Tarjeta de crédito (**** **** **** 1234)
            </p>
          </div>

          <div class="text-sm text-gray-500 italic">
            Este documento es una representación digital de la compra realizada.
            Para cualquier reclamo o devolución, contáctanos dentro de los 7
            días posteriores a la compra.
          </div> -->
        </div>

        <!-- Botones -->
        <div class="flex flex-col justify-end gap-4 sm:flex-row">
          <button
            class="w-full cursor-pointer rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 sm:w-auto"
            (click)="guardarComoPDF()"
          >
            📄 Descargar PDF
          </button>
          <!-- <button
            class="w-full cursor-pointer rounded-lg bg-gray-200 px-6 py-2 text-gray-800 hover:bg-gray-300 sm:w-auto"
          >
            ✉️ Enviar al correo
          </button> -->
          <button
            class="w-full cursor-pointer rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 sm:w-auto"
            (click)="imprimirFactura()"
          >
            🖨️ Imprimir
          </button>
          <button
            class="cursor-pointer rounded-lg bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
            (click)="mostrarModal.set(false); alCerrar.emit()"
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  `,
})
export class BillComponent {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public factura = viewChild<ElementRef<HTMLDivElement>>('factura');
  public now = new Date();

  public mostrarModal = model<boolean>(false);
  public verVenta = input.required<any>();
  public datosCliente = input.required<usuario>();
  public alCerrar = output<void>();

  public iva = computed(() => this.verVenta().total * 0.15);
  public subtotal = computed(() => this.verVenta().total - this.iva());

  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }

  public guardarComoPDF() {
    const element = this.factura()?.nativeElement;

    if (element) {
      toPng(element, { quality: 1, pixelRatio: 2 }).then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;

          pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('factura.pdf');
        };
      });
    }
  }

  public imprimirFactura() {
    const printContent = this.factura()?.nativeElement.innerHTML;

    if (printContent) {
      const ventanaImpresion = window.open(
        '',
        '_blank',
        'width=800,height=1000',
      );
      if (!ventanaImpresion) return;

      ventanaImpresion.document.open();
      ventanaImpresion.document.write(`
    <html>
      <head>
        <title>Factura</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
          }
          body {
            font-family: 'Arial', sans-serif;
            padding: 20px;
          }
        </style>
      </head>
      <body onload="window.print(); setTimeout(() => window.close(), 500);">
        ${printContent}
      </body>
    </html>
  `);
      ventanaImpresion.document.close();
    }
  }
}
