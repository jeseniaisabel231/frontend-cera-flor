import { Component } from '@angular/core';
@Component({
  selector: 'app-bill',
  template: `
    <div
      class="mx-auto max-w-3xl rounded-xl bg-white p-8 text-gray-800 shadow-lg"
    >
      <!-- Encabezado -->
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img src="logo.png" alt="" />
          <h2 class="font-playfair text-2xl font-bold">Flor & Cera</h2>
        </div>
        <div class="text-right">
          <p class="text-sm">
            Factura #:
            <span class="font-medium">FC-000125</span>
          </p>
          <p class="text-sm">Fecha: 28/06/2025</p>
        </div>
      </div>

      <!-- datos del cliente -->
      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold">Datos del Cliente</h3>
        <p>
          <span class="font-semibold">Nombre:</span>
          Jesenia Pazto
        </p>
        <p>
          <span class="font-semibold">Dirección:</span>
          Solanda, Quito - Pichincha
        </p>
        <p>
          <span class="font-semibold">Teléfono:</span>
          0987654321
        </p>
        <p>
          <span class="font-semibold">Correo:</span>
          jesenia&#64;example.com
        </p>
      </div>

      <!-- Tabla de productos -->
      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold">Detalle de Productos</h3>
        <table class="w-full rounded-md border text-sm">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="border p-2">Producto</th>
              <th class="border p-2">Aroma</th>
              <th class="border p-2">Tipo</th>
              <th class="border p-2 text-center">Cant.</th>
              <th class="border p-2 text-right">P/U</th>
              <th class="border p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">Vela oceanica</td>
              <td class="border p-2">Océano</td>
              <td class="border p-2">Decorativa</td>
              <td class="border p-2 text-center">8</td>
              <td class="border p-2 text-right">$5.00</td>
              <td class="border p-2 text-right">$40.00</td>
            </tr>
            <tr>
              <td class="border p-2">Vela Relax Nueva</td>
              <td class="border p-2">Manzanilla</td>
              <td class="border p-2">Piel seca</td>
              <td class="border p-2 text-center">1</td>
              <td class="border p-2 text-right">$3.00</td>
              <td class="border p-2 text-right">$3.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totales -->
      <div class="mb-6 flex justify-end">
        <div class="w-full sm:w-1/2 lg:w-1/3">
          <div class="flex justify-between">
            <span class="font-medium">Subtotal:</span>
            <span>$36.55</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">IVA (15%):</span>
            <span>$6.45</span>
          </div>
          <div
            class="mt-2 flex justify-between border-t pt-2 font-bold text-purple-700"
          >
            <span>Total a pagar:</span>
            <span>$43.00</span>
          </div>
        </div>
      </div>

      <!-- Pago y nota -->
      <div class="mb-4">
        <p>
          <span class="font-medium">Método de pago:</span>
          Tarjeta de crédito (**** **** **** 1234)
        </p>
      </div>

      <div class="text-sm text-gray-500 italic">
        Este documento es una representación digital de la compra realizada.
        Para cualquier reclamo o devolución, contáctanos dentro de los 7 días
        posteriores a la compra.
      </div>

      <!-- Botones -->
      <div class="mt-6 flex flex-col gap-4 sm:flex-row">
        <button
          class="w-full rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 sm:w-auto"
        >
          📄 Descargar PDF
        </button>
        <button
          class="w-full rounded-lg bg-gray-200 px-6 py-2 text-gray-800 hover:bg-gray-300 sm:w-auto"
        >
          ✉️ Enviar al correo
        </button>
        <button
          class="w-full rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 sm:w-auto"
        >
          🖨️ Imprimir
        </button>
      </div>
    </div>
  `,
})
export class BillComponent {}
