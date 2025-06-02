import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'barranav',
  imports: [RouterLink, TitleCasePipe],
  template: `
    <nav class="bg-[#e5e5e5] py-3 pl-4 fixed w-full shadow-sm z-10">
      <ol class="flex space-x-2 text-sm text-gray-600">
        <li><a routerLink="/inicio">Inicio</a></li>
        <li>/</li>
        <li class="font-medium">
          <a [routerLink]="'/' + rutaSeccionSeleccionada()">
            {{ rutaSeccionSeleccionada() | titlecase }}
          </a>
        </li>

        @if (rutaCategoriaSeleccionada()) {
          <!-- Quiere decir que cuando sea diferente a un string vacio se ejecuta el bloque if -->
          <li>/</li>
          <li class="font-medium">
            <a
              routerLink="/catalogo"
              [queryParams]="{ categoria: rutaCategoriaSeleccionada().replace(' ', '-') }"
            >
              {{ rutaCategoriaSeleccionada() | titlecase }}
            </a>
          </li>
        }
        @if (rutaProductoSeleccionado()) {
          <li>/</li>
          <li class="font-medium ">
            <a >{{ rutaProductoSeleccionado() }}</a>
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BarranavComponent {
  public rutaSeccionSeleccionada = input.required<string>();
  public rutaCategoriaSeleccionada = input<string>('');
  public rutaProductoSeleccionado = input<string>('');
}
