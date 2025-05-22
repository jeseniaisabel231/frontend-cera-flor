import { Component, inject, OnInit, signal } from '@angular/core';
import { Headers } from '../components/header.component';
import { Footeer } from '../components/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Card } from '../components/card.component';
import { promocion } from '../interfaces/promocion.interface';
import { PromocionesService } from '../../services/admin/promociones.service';
import { ProductosService } from '../../services/admin/productos.service';
import { producto } from '../interfaces/producto.interface';
import { categorias } from '../interfaces/categoria.interface';
import { BarranavComponent } from '../components/barranav.component';
import { CategoryService } from '../../services/categorias.service';

@Component({
  imports: [Headers, Footeer, Card, RouterLink, BarranavComponent],

  template: `
    <headers></headers>
    <main class="flex flex-col">
      <barranav></barranav>
      <section class="py-10">
        <div class="max-w-4xl mx-auto text-center md:text-left">
          <h1 id="catalogo-heading" class="text-4xl font-bold">
            Descubre el arte de lo natural: Jabones y Velas Artesanales para tu
            bienestar
          </h1>
          <p class="mt-4 text-gray-700">
            Nuestros jabones y velas están hechos con ingredientes naturales...
          </p>
        </div>
      </section>
      <section aria-labelledby="categorias-heading" class="bg-yellow-50 py-10">
        <div class="max-w-5xl mx-auto text-center">
          <h2 id="categorias-heading" class="text-3xl font-semibold">
            Categorías
          </h2>

          <div
            class="flex flex-col md:flex-row justify-center items-center gap-10 mt-8"
          >
            <!-- Jabones -->
            @for(categoria of categorias; track categoria._id){

            <article class="flex flex-col items-center text-center">
              <div class="rounded-full bg-green-100 p-4">
                <img
                  [src]="categoria.imagen"
                  [alt]="'Imagen de ' + categoria.nombre"
                  class="rounded-full size-40 object-cover"
                />
              </div>
              <h3 class="mt-4 text-lg">
                {{ categoria.nombre }}
              </h3>
              <button
                (click)="seleccionarCategoria(categoria._id)"
                class="mt-3 inline-flex items-center px-4 py-2 bg-morado-600 text-white rounded-full hover:bg-morado-700 transition"
              >
                Ver más →
              </button>
            </article>
            }
          </div>
        </div>
      </section>

      <section class="bg-green-50 py-10">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center mb-6">
            {{ titulo() }}
          </h2>
          <!-- Filtros de productos-->
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
          >
            <div>
              <label for="filter" class="mr-2 font-medium text-gray-700">
                Filtrar por:
              </label>
              <select
                id="filter"
                class="rounded border border-gray-300 px-3 py-1 text-sm"
              >
                <option value="">Todos</option>
              </select>
            </div>

            <div>
              <label for="sort" class="mr-2 font-medium text-gray-700">
                Ordenar por:
              </label>
              <select
                id="sort"
                class="rounded border border-gray-300 px-3 py-1 text-sm"
              >
                <option value="relevante">Más relevante</option>
                <option value="precio_asc">Precio: menor a mayor</option>
                <option value="precio_desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <!-- Grid para los productos-->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            @for(producto of productos; track producto._id){

            <!-- Card producto -->
            <card [producto]="producto"></card>
            }
          </div>
        </div>
      </section>
    </main>
    <footeer></footeer>
  `,
})
export class CatalogPage {
  public serviceProductos = inject(ProductosService);
  public serviceCategorias = inject(CategoryService);
  public productos: producto[] = [];
  public categorias: categorias[] = [];
  public productosFiltrados: producto[] = [];
  public titulo = signal('Jabones Artesanales');
  public categoriaSeleccionada = signal('');
  public tipoFiltro: string | null = null;

  ngOnInit() {
    this.cargarCategorias();
    this.obtenerProductos(1);
  }
  cargarCategorias() {
    this.serviceCategorias.obtener().subscribe({
      next: (respuesta: any) => {
        this.categorias = respuesta.categorias;
        this.categoriaSeleccionada.set(this.categorias[0]._id);
        this.titulo.set(this.categorias[0].nombre);
      },
      error: (err) => console.error('Error al cargar categorías', err),
    });
  }

  obtenerProductos(numeroPagina: number) {
    this.serviceProductos.obtener(numeroPagina).subscribe({
      next: (respuesta: any) => {
        console.log('Respuesta del backend:', respuesta);
        this.productos = respuesta.productos.filter(
          (producto: producto) =>
            producto.id_categoria._id === this.categoriaSeleccionada()
        );
        console.log('Productos filtrados:', this.productos);
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada.set(categoria);
    this.titulo.set(
      this.categorias.find((cat) => cat._id === categoria)?.nombre || ''
    );
    this.obtenerProductos(1);
  }

  filtrarPorTipo(event: Event) {}
}
