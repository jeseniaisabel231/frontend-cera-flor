import { Component } from '@angular/core';
@Component({
  selector: 'barranav',
  template: `
    <nav class="bg-[#ffffec] py-4 pl-4">
      <ol class="flex space-x-2 text-sm text-gray-600">
        <li><a href="/">Inicio</a></li>
        <li>/</li>
        <li><a href="/catalogo">Catálogo</a></li>
        <li>/</li>
        <li class="text-blue-500 font-medium">Jabones artesanales</li>
      </ol>
    </nav>
  `,
})
export class BarranavComponent {
  // Aquí puedes agregar la lógica necesaria para tu componente
}
