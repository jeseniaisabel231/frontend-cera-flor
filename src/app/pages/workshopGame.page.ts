import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { IngredientesService } from '../../services/admin/ingredients.service';
import { CategoryService } from '../../services/categorias.service';
import { PersonalizationService } from '../../services/personalization.service';
import { RecolorImageComponent } from '../components/coloredIcon.component';
import { Headers } from '../components/header.component';
import { ModaIAComponent } from '../components/modaIA.component';
import { ModalJuegoComponent } from '../components/modalJuego.component';

@Component({
  template: `
    <headers></headers>
    <div class="flex items-center justify-between bg-gray-300 px-6 py-4">
      <!-- Botón de volver -->
      <a
        class="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
        routerLink="/personalizacion-producto"
      >
        <span class="relative z-10 flex items-center gap-2">
          <svg
            class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Volver
        </span>
        <span
          class="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ></span>
      </a>

      <strong class="text-xl font-bold">
        Taller de Personalización de {{ nombreCategoria() | titlecase }}
      </strong>

      <!-- Botón de ayuda rápida -->
      <button
        (click)="mostrarInstrucciones()"
        class="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 px-4 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
      >
        <span class="relative z-10 flex items-center gap-2">
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          Ayuda Rápida
        </span>
        <span
          class="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.8),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        ></span>
      </button>
    </div>

    <main class="relative flex h-[79.2dvh] items-start">
      <img
        src="fondoJuego.png"
        alt=""
        class="absolute inset-0 -z-1 h-full w-full object-cover"
      />
      @if (mostrarAyuda()) {
        <app-confirmation-dialog
          (confirm)="mostrarAyuda.set(false)"
          [text]="instruccionesJuego"
        />
      }

      <div
        cdkDropListGroup
        class="grid h-full w-full grid-cols-7 grid-rows-5 p-4"
      >
        <!-- Contenedor colores -->
        <div
          class="col-span-5 col-start-2 row-start-1 flex items-center justify-center"
        >
          <div
            id="colores"
            cdkDropListOrientation="horizontal"
            cdkDropList
            [cdkDropListData]="colores"
            class="bg-opacity-70 flex justify-center gap-4 overflow-x-auto overflow-y-hidden rounded-lg bg-white/90 p-4"
            (cdkDropListDropped)="dropColores($event)"
          >
            @for (item of colores; track item) {
              <img
                class="size-14 cursor-grab rounded-full border hover:scale-105"
                [src]="item.imagen"
                cdkDrag
                [title]="'Colorante ' + item.nombre"
              />
            }
          </div>
        </div>

        <!-- Contenedor moldes -->
        <div
          class="col-start-1 row-span-5 row-start-1 flex items-start justify-center"
        >
          <div
            id="moldes"
            class="bg-opacity-70 max-h-full w-3/4 overflow-x-hidden overflow-y-auto rounded-lg bg-white/90 p-2"
            cdkDropList
            [cdkDropListData]="moldes"
            (cdkDropListDropped)="dropMoldes($event)"
          >
            @for (item of moldes; track $index) {
              <div
                class="group mb-4 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <p
                  class="bg-morado-600 group-hover:border-morado-300 group-hover:bg-morado-700 mx-auto mt-2 w-3/4 overflow-hidden rounded-2xl border-2 p-1 text-center text-sm font-semibold text-ellipsis whitespace-nowrap text-white transition-colors"
                >
                  {{ item.nombre | titlecase }}
                </p>
                <img
                  class="mx-auto flex size-32 cursor-grab object-contain p-2"
                  [src]="item.imagen"
                  [title]="'Molde ' + item.nombre"
                  cdkDrag
                />
              </div>
            }
          </div>
        </div>

        <!-- Contenedor mesa de trabajo -->
        <div
          class="col-span-5 col-start-2 row-span-3 row-start-2 flex items-center justify-center"
        >
          <div class="flex gap-4 rounded-lg bg-white/90 p-4">
            <section
              id="mesa-trabajo"
              class="grid h-[30dvh] w-[30dvw] grid-cols-4 grid-rows-3 border-gray-300"
            >
              <div
                class="relative col-span-3 row-span-3"
                id="moldesMesa"
                cdkDropList
                [cdkDropListData]="moldesSeleccionados"
                (cdkDropListDropped)="dropMoldes($event)"
              >
                <div
                  class="bg-morado-200 flex h-full w-full items-center justify-center border-2 border-dashed"
                  cdkDropList
                  [cdkDropListData]="coloresSeleccionados"
                  (cdkDropListDropped)="dropColores($event)"
                >
                  @for (item of moldesSeleccionados; track item) {
                    <app-recolor-image
                      [src]="item.imagen"
                      [fill]="coloresSeleccionados[0]?.imagen"
                      [title]="'Molde ' + item.nombre"
                      cdkDrag
                    ></app-recolor-image>
                  } @empty {
                    <p class="text-center text-gray-500">
                      Arrastra un molde y un color aquí
                    </p>
                  }
                </div>
              </div>

              <div
                class="col-start-4 flex items-center justify-center border-2 border-dashed bg-amber-200"
                id="aromasMesa"
                cdkDropList
                [cdkDropListData]="aromasSeleccionados"
                (cdkDropListDropped)="dropAromas($event)"
              >
                @for (item of aromasSeleccionados; track item) {
                  <img
                    class="mx-auto flex size-12 cursor-grab p-1"
                    [src]="item.imagen"
                    [title]="'Aroma ' + item.nombre"
                    cdkDrag
                  />
                } @empty {
                  <p class="text-center text-gray-500">
                    Arrastra un aroma aquí
                  </p>
                }
              </div>
              <div
                class="col-start-4 row-span-2 flex flex-col items-center justify-center border-2 border-dashed bg-blue-200"
                id="esenciasMesa"
                cdkDropList
                [cdkDropListData]="esenciasSeleccionadas"
                (cdkDropListDropped)="dropEsencias($event)"
              >
                @for (item of esenciasSeleccionadas; track item) {
                  <img
                    class="mx-auto flex size-12 cursor-grab p-1"
                    [src]="item.imagen"
                    [title]="'Esencia de ' + item.nombre"
                    cdkDrag
                  />
                } @empty {
                  <p class="text-center text-gray-500">
                    Arrastra hasta 2 esencias aquí
                  </p>
                }
              </div>
            </section>
            <div class="flex flex-col justify-center gap-4">
              <button
                (click)="OnsubmitProductoPersonalizado()"
                class="cursor-pointer rounded-full bg-teal-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-103 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/40 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none active:scale-95"
              >
                Finalizar Creación
              </button>

              @if (mostrarDialogoConfirmacion()) {
                <app-confirmation-dialog
                  (confirm)="mostrarDialogoConfirmacion.set(false)"
                  [text]="mensajeProductoPersonalizado()"
                  [imagen]="imagenPersonalizada()"
                />
              }

              <button
                class="cursor-pointer rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-103 hover:from-purple-700 hover:to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none active:scale-95"
                (click)="obtenerRecomendacionesIA()"
              >
                <span class="flex items-center justify-center gap-2">
                  Recomendación de IA
                  <span class="text-xl">✨</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Contenedor aromas -->
        <div
          class="col-start-7 row-span-5 row-start-1 flex items-start justify-center"
        >
          <div
            id="aromas"
            cdkDropList
            [cdkDropListData]="aromas"
            (cdkDropListDropped)="dropAromas($event)"
            class="bg-opacity-80 max-h-full w-3/4 overflow-x-hidden overflow-y-auto rounded-lg bg-white/90 p-2"
          >
            @for (item of aromas; track $index) {
              <div
                class="group mb-4 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <!-- Texto con colores para aromas -->
                <p
                  class="mx-auto mt-2 w-1/2 overflow-hidden rounded-lg border-2 border-amber-500 bg-amber-600 p-1 text-center text-sm font-semibold text-ellipsis whitespace-nowrap text-white"
                >
                  {{ item.nombre | titlecase }}
                </p>

                <img
                  class="mx-auto flex size-22 cursor-grab object-contain p-2"
                  [src]="item.imagen"
                  [title]="'Aroma ' + item.nombre"
                  cdkDrag
                />
              </div>
            }
          </div>
        </div>

        <!-- Contenedor esencias -->
        <div
          class="col-span-5 col-start-2 row-start-5 flex items-start justify-center"
        >
          <div
            id="esencias"
            cdkDropListOrientation="horizontal"
            cdkDropList
            [cdkDropListData]="esencias"
            (cdkDropListDropped)="dropEsencias($event)"
            class="bg-opacity-70 flex justify-center gap-x-8 overflow-x-auto overflow-y-hidden rounded-lg bg-white/90 p-1"
          >
            @for (item of esencias; track $index) {
              <div class="group flex cursor-pointer flex-col gap-y-2">
                <p
                  class="bg-celeste-600 mx-auto w-full overflow-hidden rounded-lg p-1 text-center text-sm font-semibold text-ellipsis whitespace-nowrap text-white"
                >
                  {{ item.nombre | titlecase }}
                </p>
                <img
                  class="flex size-16 cursor-grab object-contain"
                  [src]="item.imagen"
                  [title]="'Esencia de ' + item.nombre"
                  cdkDrag
                />
              </div>
            }
          </div>
        </div>
      </div>
    </main>
    <app-modal-ia [(mostrarModal)]="mostrarModalIA" />
  `,
  imports: [
    Headers,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    TitleCasePipe,
    RecolorImageComponent,
    RouterLink,
    CommonModule,
    ModalJuegoComponent,
    ModaIAComponent,
  ],
})
export class WorkshopGamePage {
  public servicioIngredientes = inject(IngredientesService);
  public categoriasService = inject(CategoryService);

  public aromas: any[] = [];
  public moldes: any[] = [];
  public colores: any[] = [];
  public esencias: any[] = [];
  public moldesSeleccionados: any[] = [];
  public esenciasSeleccionadas: any[] = [];
  public coloresSeleccionados: any[] = [];
  public aromasSeleccionados: any[] = [];

  public mostrarDialogoConfirmacion = signal(false);
  public mostrarModalIA = signal(false);
  public servicePersonalizacion = inject(PersonalizationService);
  public categoria = input.required();
  public rutaActiva = inject(ActivatedRoute);
  public editarProducto = signal<string>('');
  public nombreCategoria = signal<string>('');

  public imagenCreada = signal<File | null>(null);

  public mostrarAyuda = signal(true);
  public instruccionesJuego = `
    <ol class="list-decimal list-inside space-y-2 text-left">
      <li class="font-semibold text-gray-800">
        <span class="text-purple-600">Selecciona un molde:</span> Arrástralo al área de trabajo central
      </li>
      <li class="font-semibold text-gray-800">
        <span class="text-blue-600">Elige un color:</span> Arrastra tu color favorito sobre el molde
      </li>
      <li class="font-semibold text-gray-800">
        <span class="text-amber-600">Añade un aroma:</span> Colócalo en el círculo amarillo
      </li>
      <li class="font-semibold text-gray-800">
        <span class="text-blue-400">Selecciona esencias:</span> Puedes añadir hasta 2 en el área azul
      </li>
      <li class="font-semibold text-gray-800">
        <span class="text-teal-600">Finaliza tu creación:</span> Guarda tu diseño o pide recomendaciones de la IA
      </li>
    </ol>
  `;

  public mensajeProductoPersonalizado = signal('');
  public imagenPersonalizada = signal('');
  public producto_id = signal('');

  constructor() {
    effect(() => {
      const ingredientes = this.servicioIngredientes.ingredientes();

      ingredientes.forEach((ingrediente: any) => {
        if (ingrediente.id_categoria.includes(this.categoria())) {
          switch (ingrediente.tipo) {
            case 'aroma':
              this.aromas.push(ingrediente);
              break;
            case 'molde':
              this.moldes.push(ingrediente);
              break;
            case 'color':
              this.colores.push(ingrediente);
              break;
            case 'esencia':
              this.esencias.push(ingrediente);
              break;
          }
        }
      });
    });

    this.rutaActiva.queryParams.subscribe((params) => {
      const producto = params['producto'];

      if (producto) {
        this.editarProducto.set(producto);

        this.servicePersonalizacion.obtenerPersonalizacion(producto).subscribe({
          next: ({ producto }: any) => {
            const { ingredientes = [] } = producto;

            ingredientes.forEach((ingrediente: any) => {
              switch (ingrediente.tipo) {
                case 'molde':
                  this.moldesSeleccionados.push(ingrediente);
                  break;
                case 'color':
                  this.coloresSeleccionados.push(ingrediente);
                  break;
                case 'aroma':
                  this.aromasSeleccionados.push(ingrediente);
                  break;
                case 'esencia':
                  this.esenciasSeleccionadas.push(ingrediente);
                  break;
              }
            });
          },
        });
      }
    });

    effect(() => {
      const categorias = this.categoriasService.categorias();
      const categoriaActual = this.categoria();

      const categoria = categorias.find((cat) => cat._id === categoriaActual);

      if (categoria) {
        this.nombreCategoria.set(categoria.nombre);
      }
    });
  }

  public formularioPersonalizado = {
    ingredientes: [] as any[],
    tipo_producto: '',
    id_categoria: '',
  };

  // Método para obtener recomendaciones de IA
  obtenerRecomendacionesIA() {
    this.mostrarModalIA.set(true);
    setTimeout(() => {
      this.servicePersonalizacion
        .obtenerRecomendacion(this.categoria() as string)
        .subscribe({
          next: ({ producto_personalizado }: any) => {
            this.moldesSeleccionados = [producto_personalizado.molde];
            this.coloresSeleccionados = [producto_personalizado.color];
            this.aromasSeleccionados = [producto_personalizado.aroma];
            this.esenciasSeleccionadas = producto_personalizado.esencias;
            this.formularioPersonalizado.tipo_producto = 'ia';
          },
        })
        .add(() => this.mostrarModalIA.set(false));
    }, 1);
  }

  async OnsubmitProductoPersonalizado() {
    await this.capturarSeccion();

    if (!this.imagenCreada()) return;

    this.formularioPersonalizado.id_categoria = this.categoria() as string;
    this.formularioPersonalizado.ingredientes = [
      ...this.moldesSeleccionados,
      ...this.coloresSeleccionados,
      ...this.aromasSeleccionados,
      ...this.esenciasSeleccionadas,
    ];

    if (this.editarProducto()) {
      this.servicePersonalizacion
        .editarPersonalizacion(
          this.editarProducto(),
          this.formularioPersonalizado.ingredientes,
        )
        .subscribe({
          next: this.peticionExitosa,
          error: this.peticionErronea,
        })
        .add(() => this.mostrarDialogoConfirmacion.set(true));
    } else {
      this.servicePersonalizacion
        .registrarPersonalizacion(this.formularioPersonalizado)
        .subscribe({
          next: this.peticionExitosa,
          error: this.peticionErronea,
        })
        .add(() => this.mostrarDialogoConfirmacion.set(true));
    }
  }

  dropMoldes(event: CdkDragDrop<any[]>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;

    if (previousContainer.id === 'colores') {
      this.dropColores(event);
      return;
    }

    if (previousContainer === container || previousContainer.id !== 'moldes') {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      if (
        this.moldesSeleccionados.length === 1 &&
        container.id === 'moldesMesa'
      ) {
        transferArrayItem(
          this.moldesSeleccionados,
          this.moldes,
          0,
          this.moldes.length,
        );
      }

      transferArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex,
      );

      this.formularioPersonalizado.tipo_producto = 'personalizado';
    }
  }

  dropAromas(event: CdkDragDrop<any[]>) {
    if (
      event.previousContainer === event.container ||
      event.previousContainer.id !== 'aromas'
    ) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      if (
        this.aromasSeleccionados.length === 1 &&
        event.container.id === 'aromasMesa'
      ) {
        transferArrayItem(
          this.aromasSeleccionados,
          this.aromas,
          0,
          this.aromas.length,
        );
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.formularioPersonalizado.tipo_producto = 'personalizado';
    }
  }

  dropColores(event: CdkDragDrop<any[]>) {
    if (
      event.previousContainer === event.container ||
      event.previousContainer.id !== 'colores'
    ) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      if (
        this.coloresSeleccionados.length === 1 &&
        event.container.id === 'moldesMesa'
      ) {
        transferArrayItem(
          this.coloresSeleccionados,
          this.colores,
          0,
          this.colores.length,
        );
      }
      this.coloresSeleccionados.push(
        event.previousContainer.data[event.previousIndex],
      );
      this.colores.splice(event.previousIndex, 1);
      this.formularioPersonalizado.tipo_producto = 'personalizado';
    }
  }

  dropEsencias(event: CdkDragDrop<any[]>) {
    if (
      event.previousContainer === event.container ||
      event.previousContainer.id !== 'esencias'
    ) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      if (
        this.esenciasSeleccionadas.length === 2 &&
        event.container.id === 'esenciasMesa'
      ) {
        transferArrayItem(
          this.esenciasSeleccionadas,
          this.esencias,
          0,
          this.esencias.length,
        );
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.formularioPersonalizado.tipo_producto = 'personalizado';
    }
  }

  async capturarSeccion() {
    const elemento = document.getElementById('mesa-trabajo');
    if (elemento) {
      try {
        const blob = await htmlToImage.toBlob(elemento, {
          quality: 1,
          pixelRatio: 2,
        });

        if (!blob) return;

        const file = new File([blob], 'captura.png', {
          type: blob.type,
          lastModified: Date.now(),
        });

        this.imagenPersonalizada.set(URL.createObjectURL(file));

        this.imagenCreada.set(file);
      } catch {}
    }
  }

  mostrarInstrucciones() {
    this.mostrarAyuda.set(true);
  }

  private peticionExitosa = ({ producto_personalizado, msg }: any) => {
    this.producto_id.set(producto_personalizado._id);
    this.mensajeProductoPersonalizado.set(msg);

    this.servicePersonalizacion
      .subirFotoPersonalizacion(this.producto_id(), this.imagenCreada()!)
      .subscribe();
  };

  private peticionErronea = ({ error }: any) => {
    this.mensajeProductoPersonalizado.set(
      error.msg || 'Error al registrar el producto personalizado',
    );
    this.imagenPersonalizada.set('');
  };
}
