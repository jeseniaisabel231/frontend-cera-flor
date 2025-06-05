import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'barranav',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  template: `
    <nav class="bg-[#d3c0f4] py-3 pl-4 fixed w-full shadow-sm z-10">
      <div class="mx-auto max-w-7xl">
        <!-- Breadcrumbs -->
        <ol class="flex items-center space-x-2 text-sm">
          <!-- Inicio -->
          <li>
            <div class="flex items-center">
              <a 
                routerLink="/inicio" 
                class="text-gray-500 hover:text-[#9810fa] transition-colors"
                aria-label="Inicio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </a>
            </div>
          </li>

          <!-- Separador -->
          <li class="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </li>

          <!-- Sección actual -->
          <li>
            <div class="flex items-center">
              <a 
                [routerLink]="'/' + rutaSeccionSeleccionada()" 
                class="font-medium text-[#9810fa] hover:underline"
              >
                {{ rutaSeccionSeleccionada() | titlecase }}
              </a>
            </div>
          </li>

          <!-- Categoría (si existe) -->
          @if (rutaCategoriaSeleccionada()) {
            <li class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <div class="flex items-center">
                <a 
                  routerLink="/catalogo" 
                  [queryParams]="{ categoria: rutaCategoriaSeleccionada().replace(' ', '-') }"
                  class="font-medium text-gray-700 hover:text-[#9810fa] hover:underline transition-colors"
                >
                  {{ rutaCategoriaSeleccionada() | titlecase }}
                </a>
              </div>
            </li>
          }

          <!-- Producto (si existe) -->
          @if (rutaProductoSeleccionado()) {
            <li class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <div class="flex items-center">
                <span class="font-medium text-gray-900 truncate max-w-xs">
                  {{ rutaProductoSeleccionado() }}
                </span>
              </div>
            </li>
          }
        </ol>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      backdrop-filter: blur(8px);
      background-color: rgba(255, 255, 255, 0.8);
    }
  `]
})
export class BarranavComponent {
  public rutaSeccionSeleccionada = input.required<string>();
  public rutaCategoriaSeleccionada = input<string>('');
  public rutaProductoSeleccionado = input<string>('');
}