import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { IngredientesService } from '../../services/admin/ingredients.service';
import { PersonalizationService } from '../../services/personalization.service';
import { RecolorImageComponent } from '../components/coloredIcon.component';
import { Headers } from '../components/header.component';
import { ModalJuegoComponent } from '../components/modalJuego.component';
import { InteligenciaArtificialService } from '../../services/inteligenciaArtificial.service';

@Component({
  template: `
    <headers></headers>
    <main
      class="from-celeste-200 via-morado-200 flex flex-col bg-gradient-to-b to-pink-200 text-center"
    >
      <div class="relative h-[82vh] w-full overflow-hidden">
        <a
          class="group absolute top-0 left-4 z-10"
          routerLink="/personalizacion-producto"
        >
          <div
            class="relative transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <img
              src="botonRegreso.png"
              alt="Volver atrás"
              class="h-16 w-16 drop-shadow-md transition-all duration-300 group-hover:drop-shadow-lg"
              title="Volver atrás"
            />
          </div>
        </a>

        <div
          cdkDropListGroup
          class="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-12 px-8 py-4 pl-12"
        >
          <div
            class="bg-opacity-70 row-span-5 overflow-y-auto rounded-lg bg-white"
          >
            <div
              id="moldes"
              class="bg-opacity-80 m-auto min-h-15 w-full p-2"
              cdkDropList
              [cdkDropListData]="moldes"
              (cdkDropListDropped)="dropMoldes($event)"
            >
              @for (item of moldes; track $index) {
                <div
                  class="group mb-4 cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <p
                    class="bg-morado-600 group-hover:border-morado-300 group-hover:bg-morado-700 mx-auto mt-2 w-1/2 rounded-2xl border-2 p-1 text-center text-sm font-semibold text-white transition-colors"
                  >
                    {{ item.nombre | titlecase }}
                  </p>
                  <img
                    class="mx-auto flex size-32 cursor-grab object-contain p-2"
                    [src]="item.imagen"
                    [title]="item.nombre"
                    cdkDrag
                  />
                </div>
              }
            </div>
          </div>

          <!-- Contenedor colores -->
          <div
            class="bg-opacity-70 col-span-3 col-start-2 h-[120%] overflow-x-auto rounded-lg bg-white"
          >
            <div
              id="colores"
              cdkDropListOrientation="horizontal"
              cdkDropList
              [cdkDropListData]="colores"
              class="bg-opacity-80 m-auto flex flex-wrap justify-center gap-1"
              (cdkDropListDropped)="dropColores($event)"
            >
              @for (item of colores; track item) {
                <div
                  class="group flex cursor-pointer flex-col items-center transition-transform hover:scale-110"
                >
                  <img
                    class="flex size-14 transform cursor-grab rounded-lg p-1"
                    [src]="item.imagen"
                    cdkDrag
                    [title]="item.nombre"
                  />
                </div>
              }
            </div>
          </div>

          <!-- Contenedor mesa -->

          @if (mostrarDialogo()) {
            <app-confirmation-dialog
              (confirm)="mostrarDialogo.set(false)"
              [text]="instruccionesJuego"
            />
          }

          <div class="bg-opacity-70 relative col-span-3 row-span-3">
            <p
              class="bg-morado-600 relative left-[36%] w-[200px] -translate-x-1/2 rounded-lg p-1 font-semibold text-white"
            >
              Coloca aqui tu molde
            </p>
            <p
              class="absolute top-0 right-56 w-[130px] rounded-lg bg-amber-600 p-1 font-semibold text-white"
            >
              Coloca un aroma
            </p>
            <p
              class="absolute top-48 right-50 rounded-lg bg-blue-400 p-1 font-semibold text-white"
            >
              Coloca aqui tus esencias
            </p>
            <div class="mx-auto h-40 flex justify-center">
              <section
                id="mesa-trabajo"
                class="grid grid-cols-4 grid-rows-3 border-gray-300 w-100"
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
                        cdkDrag
                      ></app-recolor-image>
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
                      cdkDrag
                    />
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
                      cdkDrag
                    />
                  }
                </div>
              </section>
            </div>
            <div class="mt-10 flex justify-center gap-4">
              <button class="bg-red-200" (click)="capturarSeccion()">
                Descargar Imagen
              </button>

              <button
                (click)="OnsubmitProductoPersonalizado()"
                class="rounded-full bg-teal-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/40 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none active:scale-95"
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
                class="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none active:scale-95"
                (click)="obtenerRecomendacionesIA()"
              >
                <span class="flex items-center justify-center gap-2">
                  <span class="text-xl">🤖</span>
                  Personalizar con IA
                  <span class="text-xl">✨</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Contenedor esencias -->
          <div
            class="bg-opacity-70 relative bottom-8 col-span-3 col-start-2 row-start-5 h-[200%] overflow-x-auto rounded-lg bg-white"
          >
            <div
              id="esencias"
              cdkDropListOrientation="horizontal"
              cdkDropList
              [cdkDropListData]="esencias"
              (cdkDropListDropped)="dropEsencias($event)"
              class="bg-opacity-80 m-auto flex min-h-40 w-full justify-center gap-8 p-2"
            >
              @for (item of esencias; track $index) {
                <div
                  class="group mb-4 cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <p
                    class="bg-celeste-600 mx-auto w-full rounded-lg p-1 text-center text-sm font-semibold text-white"
                  >
                    {{ item.nombre | titlecase }}
                  </p>
                  <img
                    class="flex size-16 cursor-grab"
                    [src]="item.imagen"
                    cdkDrag
                  />
                </div>
              }
            </div>
          </div>

          <!-- Contenedor aromas -->
          <div
            class="bg-opacity-70 col-start-5 row-span-5 row-start-1 overflow-y-auto rounded-lg bg-white p-2"
          >
            <div
              id="aromas"
              cdkDropList
              [cdkDropListData]="aromas"
              (cdkDropListDropped)="dropAromas($event)"
              class="bg-opacity-80 m-auto min-h-40 w-full p-2"
            >
              @for (item of aromas; track $index) {
                <div
                  class="group mb-4 cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <!-- Texto con colores para aromas -->
                  <p
                    class="mx-auto mt-2 w-1/2 rounded-lg border-2 border-amber-500 bg-amber-600 p-1 text-center text-sm font-semibold text-white"
                  >
                    {{ item.nombre | titlecase }}
                  </p>

                  <img
                    class="rounded-lgp-2 mx-auto flex size-22 cursor-grab"
                    [src]="item.imagen"
                    cdkDrag
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
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
  ],
})
export class WorkshopGamePage {
  public imgIngredientes: any[] = [];
  public ingredientesSeleccionados: any[] = [];
  public servicioIngredientes = inject(IngredientesService);
  public aromas: any[] = [];
  public moldes: any[] = [];
  public colores: any[] = [];
  public esencias: any[] = [];
  public moldesSeleccionados: any[] = [];
  public esenciasSeleccionadas: any[] = [];
  public coloresSeleccionados: any[] = [];
  public aromasSeleccionados: any[] = [];
  public mostrarDialogo = signal(true);
  public mostrarDialogoConfirmacion = signal(false);
  public servicePersonalizacion = inject(PersonalizationService);
  public categoria = input.required();
  public instruccionesJuego =
    '1. Colocar el molde en el sitio de trabajo\n\n2. Despues no se olvide de colocar el color de su gusto\n\n3. Coloca el aroma de tu preferencia\n\n4. Debes colocar dos esencias';
  public mensajeProductoPersonalizado = signal('');
  public imagenPersonalizada = signal('');
  public serviceInteligencia = inject(InteligenciaArtificialService);

  constructor() {
    this.servicioIngredientes.obtener().subscribe(({ ingredientes }) => {
      this.imgIngredientes = ingredientes;

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
  }

  public formularioPersonalizado = {
    ingredientes: [] as any[],
    tipo_producto: '',
    id_categoria: '',
  };

  // Método para obtener recomendaciones de IA
  obtenerRecomendacionesIA(){
    this.serviceInteligencia
      .obtenerRecomendacion('decorativa', this.categoria() as string)
      .subscribe({
        next: (respuesta: any) => {
          const { recomendacion: { producto_personalizado } } = respuesta;

          console.log('Recomendaciones de IA:', producto_personalizado);

          this.moldesSeleccionados = [producto_personalizado.molde];
          this.coloresSeleccionados = [producto_personalizado.color];
          this.aromasSeleccionados = [producto_personalizado.aroma];
          this.esenciasSeleccionadas = producto_personalizado.esencias;
        },
        error: (error: any) => {
          console.error('Error al obtener recomendaciones de IA:', error);
        },
      });
  }

  //Metodo onsumit
  async OnsubmitProductoPersonalizado() {
    this.formularioPersonalizado.ingredientes = [
      ...this.moldesSeleccionados,
      ...this.coloresSeleccionados,
      ...this.aromasSeleccionados,
      ...this.esenciasSeleccionadas,
    ];
    this.formularioPersonalizado.tipo_producto = 'piel seca';
    this.formularioPersonalizado.id_categoria = this.categoria() as string;
    await this.capturarSeccion(); // Captura la sección antes de enviar el formulario
    this.servicePersonalizacion
      .registrarPersonalizacion(this.formularioPersonalizado as any)
      .subscribe({
        next: (respuesta: any) => {
          console.log('Producto personalizado registrado:', respuesta);

          this.mostrarDialogoConfirmacion.set(true);

          this.mensajeProductoPersonalizado.set(respuesta.msg);
        },
        error: (error: any) => {
          console.error('Error al registrar producto personalizado:', error);
          this.mostrarDialogoConfirmacion.set(true);
          this.mensajeProductoPersonalizado.set(
            error.error.msg || 'Error al registrar el producto personalizado',
          );
          this.imagenPersonalizada.set('');
        },
      });
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
    }
  }
  dropAromas(event: CdkDragDrop<any[]>) {
    console.log('dropAromas');
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
    }
  }
  dropColores(event: CdkDragDrop<any[]>) {
    console.log('dropColores', event.container);
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
    }
  }

  // Métodos:
  finalizarCreacion() {
    this.mostrarDialogo.set(true);
  }

  confirmar() {
    console.log('Compra confirmada!');
    this.mostrarDialogo.set(false);
  }

  async capturarSeccion() {
    const elemento = document.getElementById('mesa-trabajo');
    if (elemento) {
      const captura = await htmlToImage.toJpeg(elemento);

      this.imagenPersonalizada.set(captura);
    }
  }
}
