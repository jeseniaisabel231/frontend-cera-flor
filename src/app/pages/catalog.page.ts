import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ProductosService } from '../../services/admin/productos.service';
import { CategoryService } from '../../services/categorias.service';
import { BarranavComponent } from '../components/barranav.component';
import { Card } from '../components/card.component';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';
import { Loading } from '../components/loading.component';
import { categorias } from '../interfaces/categoria.interface';
import { producto } from '../interfaces/producto.interface';

@Component({
  imports: [
    Headers,
    Footeer,
    Card,
    RouterLink,
    BarranavComponent,
    TitleCasePipe,
    Loading,
  ],
  template: `
    <headers ></headers>
    <main class="flex flex-col">
      <barranav
        rutaSeccionSeleccionada="catalogo"
        [rutaCategoriaSeleccionada]="titulo().replace('-', ' ')"
      />
      <div class="relative aspect-[16/9]  md:h-115">
        <img [src]="getBannerImage()" alt="Banner description" class="w-full" />
      </div>
      <section class="pt-34 sm:pt-8 pb-8">
        <div class="mx-auto max-w-5xl text-center mt-8">
          <h2
            class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
          >
            Selecciona una categoría
          </h2>

          <div
            class="mt-8 flex flex-col items-center justify-center gap-20 md:flex-row"
          >
            <!-- Jabones -->
            @for (categoria of categorias; track categoria._id) {
              <article
                class="flex cursor-pointer flex-col items-center text-center"
              >
                <div
                  class="rounded-full bg-green-100 p-4 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    [src]="categoria.imagen"
                    [alt]="'Imagen de ' + categoria.nombre"
                    class="size-40 rounded-full object-cover"
                  />
                </div>
                <h3 class="mt-4 text-lg">
                  {{ categoria.nombre }}
                </h3>
                <a
                  [routerLink]="'/catalogo'"
                  [queryParams]="{
                    categoria: categoria.nombre.replace(' ', '-'),
                  }"
                  class="bg-morado-600 hover:bg-morado-700 mt-3 inline-flex items-center rounded-full px-4 py-2 text-white transition"
                >
                  Ver más →
                </a>
              </article>
            }
          </div>
        </div>
      </section>

      <section class="bg-green-50 py-10">
        <div class="mx-auto max-w-6xl px-4">
          <h2
            class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
          >
            {{ titulo().replace('-', ' ') | titlecase }}
          </h2>
          <!-- Filtros de productos-->
          <!-- <div class="mb-8 flex flex-col items-center gap-14 md:flex-row">
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
          </div> -->

          <!-- Grid para los productos-->
          @if (carga()) {
            <loading></loading>
          } @else if (errorCarga()) {
            <div class="text-center text-red-500">
              Error al cargar los productos
            </div>
          } @else {
            <div
              class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              @for (producto of productos; track producto._id) {
                <card [producto]="producto" (emitirCantidad)="recibirCantidad($event)"></card>
              } @empty {
                <p class="col-span-full text-center">
                  No se encontraron productos
                </p>
              }
            </div>
          }
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
  public carga = signal<boolean>(true);
  public errorCarga = signal<boolean>(false);
  public tipoFiltro: string | null = null;
  public rutaActiva = inject(ActivatedRoute);
  public titulo = toSignal(
    this.rutaActiva.queryParams.pipe(map((params) => params['categoria'])),
  );
  public cantidadProducto = signal(0);
  public banners = {
    'jabones-artesanales': 'bannerJA.png',
    'velas-artesanales': 'bannerVA.png',
  };
  public getBannerImage(): string {
    const categoria = this.titulo()?.toLowerCase() || 'jabones-artesanales';
    return this.banners[categoria as keyof typeof this.banners] || this.banners['jabones-artesanales'];
  }

  ngOnInit() {
    this.cargarCategorias();
    this.rutaActiva.queryParams.subscribe((params) => {
      const categoria = params['categoria'];
      if (categoria) {
        this.obtenerProductos(1, 20); // vuelve a cargar productos cuando cambia la categoría
      } else {
        // Manejar caso cuando no hay categoría seleccionada
        this.carga.set(false);
      }
    });
  }
  cargarCategorias() {
    this.serviceCategorias.obtener().subscribe({
      next: (respuesta: any) => {
        this.categorias = respuesta.categorias;
      },
    });
  }

  obtenerProductos(numeroPagina: number, limit: number) {
    this.carga.set(true);
    this.errorCarga.set(false);
    this.serviceProductos
      .obtener(numeroPagina, limit)
      .subscribe({
        next: (respuesta: any) => {
          this.productos = respuesta.productos.filter(
            (producto: producto) =>
              producto.id_categoria.nombre.replace(' ', '-').toLowerCase() ===
              this.titulo().toLowerCase(),
          );
          this.carga.set(false);
        },
        error: (err) => {
          this.errorCarga.set(true);
          this.carga.set(false);
        },
      })
      .add(() => {
        this.carga.set(false);
      });
  }
  recibirCantidad(cantidad: number) {
    this.cantidadProducto.set(cantidad)
  }

  filtrarPorTipo(event: Event) {}
}
