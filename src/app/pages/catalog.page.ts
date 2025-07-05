import { CommonModule, TitleCasePipe } from '@angular/common';
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
    CommonModule,
  ],
  template: `
    <headers></headers>
    <main class="flex flex-col">
      <barranav
        rutaSeccionSeleccionada="catálogo"
        [rutaCategoriaSeleccionada]="titulo().replace('-', ' ')"
      />
      <div class="relative aspect-[16/9] md:h-115">
        <img [src]="getBannerImage()" alt="Banner description" class="w-full" />
      </div>
      <section class="bg-gradient-to-t from-[#f0fdf4] to-white pt-20 pb-16">
        <div class="mx-auto max-w-5xl text-center">
          <h2
            class="font-playfair mb-10 text-[20px] font-semibold text-gray-800 sm:text-2xl"
          >
            Selecciona una categoría
          </h2>

          <div class="mt-6 flex flex-wrap justify-evenly">
            @for (categoria of categorias; track categoria._id) {
              <article
                class="group flex cursor-pointer flex-col items-center text-center transition-transform duration-300 hover:scale-105"
              >
                <div
                  class="rounded-full border-4 border-white bg-white p-2 shadow-xl group-hover:shadow-2xl"
                >
                  <img
                    [src]="categoria.imagen"
                    [alt]="'Imagen de ' + categoria.nombre"
                    class="h-44 w-44 rounded-full object-cover"
                  />
                </div>
                <a
                  [routerLink]="'/catalogo'"
                  [queryParams]="{
                    categoria: categoria.nombre.replace(' ', '-'),
                  }"
                  class="mt-4 rounded-full px-5 w-60 gap-2 py-3 font-bold text-white transition-colors duration-300 flex"
                  [ngClass]="{
                    'bg-morado-500 hover:bg-morado-600': categoria.nombre
                      .toLowerCase()
                      .includes('jabon'),
                    'bg-celeste-600 hover:bg-celeste-700': categoria.nombre
                      .toLowerCase()
                      .includes('vela'),
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  {{ categoria.nombre }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </article>
            }
          </div>
        </div>
      </section>

      <section class="bg-green-100 py-10">
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
                <card [producto]="producto"></card>
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
    return (
      this.banners[categoria as keyof typeof this.banners] ||
      this.banners['jabones-artesanales']
    );
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
    this.cantidadProducto.set(cantidad);
  }

  filtrarPorTipo(event: Event) {}
}
