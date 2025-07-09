import { TitleCasePipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IngredientesService } from '../../../services/admin/ingredients.service';
import { CategoryService } from '../../../services/categorias.service';
import { Actions } from './modal.component';
import { ModalAvisosComponent } from './modalavisos.component';

@Component({
  selector: 'formulario',
  imports: [ReactiveFormsModule, ModalAvisosComponent, TitleCasePipe],
  template: `
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto w-3/4 rounded-[10px] bg-white text-[#3C3C3B] backdrop:backdrop-blur-[2px] lg:w-1/2"
    >
      <div class="flex items-center justify-between px-7 py-5">
        <div class="flex flex-col">
          <h1 class="text-lg font-medium text-[#3C3C3B]">
            {{
              acciones() === 'Visualizar'
                ? 'Detalles del producto'
                : acciones() === 'Actualizar'
                  ? 'Actualizar producto'
                  : 'Registrar producto'
            }}
          </h1>
          @if (acciones() !== 'Visualizar') {
            <div class="flex items-center gap-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#806bff"
                  d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0m1 16H9v-2h2zm0-4H9V4h2z"
                />
              </svg>
              <small class="font-bold text-[#806bff]">
                Recuerde no dejar espacios en blanco al derecho y al reves de
                cada campo.
              </small>
            </div>
          }
        </div>
        <button (click)="close()" class="cursor-pointer focus:outline-none">
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
      </div>

      <form
        class="grid grid-cols-1 gap-x-4 px-7 py-2 md:grid-cols-2"
        (ngSubmit)="onSubmit()"
        [formGroup]="formulario"
      >
        <!-- Subir foto -->

        <div class="h-full">
          <label for="foto" class="flex flex-col gap-1">
            <span>
              Imagen del producto
              <strong>(tamaño máximo: 2MB)</strong>
            </span>

            @let imagenInvalida =
              (formulario.get('imagen')?.invalid &&
                formulario.get('imagen')?.value) ||
              errores().imagen;
            <div
              class="flex h-47 flex-col items-center justify-center rounded-xl border border-gray-300"
              [class]="
                imagenInvalida
                  ? 'border-red-500 focus:ring-0 focus:outline-none'
                  : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
              "
            >
              @if (imagePreview !== null) {
                <img
                  [src]="imagePreview"
                  alt="imagen del producto"
                  class="h-full w-full rounded-xl object-cover"
                />
              } @else {
                <div class="flex cursor-pointer flex-col items-center gap-2">
                  <svg
                    class=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#3C3C3B"
                      d="m11.18 8.933 3.232-5.596q2.025.522 3.662 2.046t2.38 3.55zM8.888 11.26 5.673 5.606Q6.946 4.358 8.57 3.679T12 3q.383 0 .875.047t.746.097zm-5.6 2.97q-.15-.638-.219-1.176T3 12q0-1.583.537-3.042.536-1.46 1.567-2.74l4.588 8.013zm6.404 6.472q-2.141-.561-3.82-2.104-1.679-1.542-2.344-3.588h9.402zM12 21q-.375 0-.81-.05t-.71-.1l4.71-7.994 3.156 5.519q-1.254 1.248-2.897 1.937T12 21m6.896-3.217L14.308 9.73h6.406q.13.58.208 1.158T21 12q0 1.616-.536 3.062-.535 1.446-1.568 2.72"
                    />
                  </svg>
                  <span>Subir una imagen</span>
                </div>
              }

              <input
                type="file"
                hidden
                accept="image/*"
                id="foto"
                class="text-sm"
                (input)="onFileChange($event)"
                [value]="formulario.get('imagen')?.value ?? ''"
                data-testid="input-imagen"
              />
            </div>
            @if (errores().imagen) {
              <small class="text-red-600">{{ errores().imagen }}</small>
            } @else if (imagenInvalida) {
              <small class="text-red-600">
                <div>
                  La imagen es requerida y debe ser un archivo de imagen válido
                  (JPG, PNG, GIF).
                </div>
              </small>
            }
          </label>
        </div>

        <!-- Nombre y descripción -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label class="block text-sm font-medium">
              Nombre del producto:
              <span class="text-red-500">*</span>
            </label>
            @let nombreInvalido =
              (formulario.get('nombre')?.invalid &&
                formulario.get('nombre')?.value) ||
              errores().nombre;

            <input
              [class]="
                nombreInvalido
                  ? 'border-red-500 focus:ring-0 focus:outline-none'
                  : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
              "
              type="text"
              placeholder="Ej. Jabón de avena y miel"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
              formControlName="nombre"
              (input)="borrarError('nombre')"
              data-testid="input-nombre"
            />
            <div>
              @if (errores().nombre) {
                <small class="text-red-600">{{ errores().nombre }}</small>
              } @else if (nombreInvalido) {
                <small class="wrap-break-word text-red-600">
                  El nombre debe contener entre 3 y 25 caracteres alfabéticos.
                </small>
              }
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="block text-sm font-medium">
              Beneficios
              <span class="text-red-500">*</span>
            </label>

            @let beneficiosInvalido =
              (formulario.get('beneficios')?.invalid &&
                formulario.get('beneficios')?.value) ||
              errores().beneficios;

            <textarea
              [class]="
                beneficiosInvalido
                  ? 'border-red-500 focus:ring-0 focus:outline-none'
                  : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
              "
              placeholder="Describe 3 de sus beneficios (separados por punto y coma (;))..."
              rows="4"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
              formControlName="beneficios"
              (input)="borrarError('beneficios')"
              data-testid="input-beneficios"
            ></textarea>
            <div class="w-[215px] break-words">
              @if (errores().beneficios) {
                <small class="text-red-600">
                  {{ errores().beneficios }}
                </small>
              } @else if (beneficiosInvalido) {
                <small class="text-red-600">
                  Los beneficios deben estar separados por punto y coma (;) y
                  contener 3 beneficios de entre 10 y 100 caracteres.
                </small>
              }
            </div>
          </div>
        </div>

        <div class="col-span-2 mt-4 flex flex-col gap-1">
          <label class="block text-sm font-medium">
            Descripción
            <span class="text-red-500">*</span>
          </label>
          @let descripcionInvalido =
            (formulario.get('descripcion')?.invalid &&
              formulario.get('descripcion')?.value) ||
            errores().descripcion;

          <textarea
            [class]="
              descripcionInvalido
                ? 'focus border-red-500 outline-none focus:ring-0'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
            placeholder="Describe aroma, textura, beneficios o forma artesanal..."
            rows="4"
            class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
            formControlName="descripcion"
            (input)="borrarError('descripcion')"
            data-testid="input-descripcion"
          ></textarea>
          @if (errores().descripcion) {
            <small class="text-red-600">
              {{ errores().descripcion }}
            </small>
          } @else if (descripcionInvalido) {
            <small class="text-red-600">
              La descripción debe contener por lo menos 10 caracteres
              alfabéticos, y como máximo 500 caracteres alfanuméricos.
            </small>
          }
        </div>

        <div class="col-span-2 mt-4 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <label for="">
              Stock:
              <span class="text-red-500">*</span>
            </label>
            @let stockInvalido =
              (formulario.get('stock')?.invalid &&
                formulario.get('stock')?.value) ||
              errores().stock;

            <span>{{ formulario.value.stock }}</span>
          </div>
          <input
            [class]="
              stockInvalido
                ? 'border-red-500 accent-red-500'
                : 'border-gray-300'
            "
            type="range"
            min="1"
            max="100"
            formControlName="stock"
            class="accent-indigo-400"
            (input)="borrarError('stock')"
            data-testid="input-stock"
          />
          @if (errores().stock) {
            <small class="text-red-600">
              {{ errores().stock }}
            </small>
          } @else if (stockInvalido) {
            <small class="text-red-600">
              El stock debe ser un número entre 1 y 100.
            </small>
          }
        </div>

        <!-- Categoría y precio -->
        <div class="mt-4">
          <label class="block text-sm font-medium">
            Categoría
            <span class="text-red-500">*</span>
          </label>
          @let categoriaInvalido =
            (formulario.get('id_categoria')?.invalid &&
              categoriaSeleccionada()) ||
            errores().id_categoria;

          <select
            class="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-1"
            formControlName="id_categoria"
            (change)="
              categoriaSeleccionada.set(
                formulario.get('id_categoria')?.value ?? ''
              );
              borrarError('id_categoria')
            "
            [class]="
              categoriaInvalido
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-morado-400 border-gray-300'
            "
            data-testid="select-categoria"
          >
            <option selected value="" disabled hidden>
              Selecciona una categoría
            </option>
            @for (categoria of categorias(); track categoria) {
              <option [value]="categoria._id">
                {{ categoria.nombre }}
              </option>
            }
          </select>

          @if (errores().id_categoria) {
            <small class="text-red-600">Debes seleccionar una categoría.</small>
          }
        </div>

        @let precioInvalido =
          (formulario.get('precio')?.invalid &&
            formulario.get('precio')?.value) ||
          errores().precio;

        <div class="mt-4">
          <label class="block text-sm font-medium">Precio</label>
          <div class="flex items-center gap-2">
            <span class="text-gray-600">$</span>
            <input
              placeholder="Ej. 5.50"
              [class]="
                precioInvalido
                  ? 'border-red-500 focus:ring-0 focus:outline-none'
                  : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
              "
              class="placeholder-gris-200 w-full [appearance:textfield] rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              formControlName="precio"
              (input)="eliminarLetras($event); borrarError('precio')"
              data-testid="input-precio"
            />
          </div>
          <div class="w-[215px] break-words">
            @if (errores().precio) {
              <small class="text-red-600">
                {{ errores().precio }}
              </small>
            } @else if (precioInvalido) {
              <small class="text-red-600">
                El precio debe ser un número entre 1 y 100, con un máximo de dos
                decimales.
              </small>
            }
          </div>
        </div>

        <!-- Ingredientes -->
        @if (categoriaSeleccionada()) {
          <div class="mt-6 md:col-span-2">
            <p class="mb-3 text-lg font-medium">
              Características del producto
              <span class="text-red-500">*</span>
            </p>

            @let ingredientesInvalido =
              (ingredientesSeleccionados().length !== 0 &&
                ingredientesSeleccionados().length < 2) ||
              errores().ingredientes;

            <div class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <fieldset class="flex flex-col gap-1">
                <label class="text-sm font-medium">
                  Selecciona
                  <strong class="text-bold">dos</strong>
                  ingredientes
                  <span class="text-red-500">*</span>
                </label>

                <div class="flex flex-col gap-1.5 pl-2 text-sm">
                  @for (ingrediente of esencias(); track ingrediente) {
                    <label>
                      <input
                        type="checkbox"
                        class="accent-morado-600 mr-1"
                        (change)="
                          seleccionarIngrediente(ingrediente._id, $event)
                        "
                        [checked]="
                          ingredientesSeleccionados().includes(ingrediente._id)
                        "
                        (input)="borrarError('ingredientes')"
                        data-testid="input-ingrediente"
                      />
                      {{ ingrediente?.nombre }}
                    </label>
                  }
                </div>
                @if (errores().ingredientes) {
                  <small class="text-red-600">
                    {{ errores().ingredientes }}
                  </small>
                } @else if (ingredientesInvalido) {
                  <small class="text-red-600">
                    Debes seleccionar dos ingredientes.
                  </small>
                }
              </fieldset>

              <!-- Aroma y tipo de piel -->
              <div class="flex flex-col gap-4">
                <fieldset class="flex flex-col gap-1">
                  <label class="block font-medium">
                    Aroma
                    <span class="text-red-500">*</span>
                  </label>
                  @let aromaInvalido =
                    (formulario.get('aroma')?.invalid &&
                      formulario.get('aroma')?.value) ||
                    errores().aroma;
                  <select
                    class="focus:ring-morado-400 placeholder-gris-200 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
                    formControlName="aroma"
                    [class]="
                      aromaInvalido
                        ? 'border-red-500 focus:ring-0 focus:outline-none'
                        : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
                    "
                    (change)="borrarError('aroma')"
                    data-testid="select-aroma"
                  >
                    <option selected value="" disabled hidden>
                      Selecciona un aroma
                    </option>

                    @for (aroma of aromas(); track $index) {
                      <option [value]="aroma.nombre">
                        {{ aroma.nombre | titlecase }}
                      </option>
                    }
                  </select>
                  @if (errores().aroma) {
                    <small class="text-red-600">
                      {{ errores().aroma }}
                    </small>
                  } @else if (aromaInvalido) {
                    <small class="text-red-600">
                      El campo aroma es requerido y debes escoger un aroma.
                    </small>
                  }
                </fieldset>
                <fieldset class="flex flex-col gap-1">
                  <label class="ont-medium">
                    Tipo
                    <span class="text-red-500">*</span>
                  </label>
                  @let tipoInvalido =
                    (formulario.get('tipo')?.invalid &&
                      formulario.get('tipo')?.value) ||
                    errores().tipo;
                  <select
                    class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
                    formControlName="tipo"
                    [class]="
                      tipoInvalido
                        ? 'border-red-500 focus:ring-0 focus:outline-none'
                        : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
                    "
                    (change)="borrarError('tipo')"
                    data-testid="select-tipo"
                  >
                    <option
                      class="text-gris-200"
                      selected
                      value=""
                      disabled
                      hidden
                    >
                      Selecciona un tipo
                    </option>

                    @let tipos =
                      categoriaYTipos()[categoriaSeleccionada()] || [];

                    @for (tipo of tipos; track tipo) {
                      <option [value]="tipo">{{ tipo | titlecase }}</option>
                    } @empty {
                      <option value="" disabled>
                        No hay tipos disponibles para esta categoría
                      </option>
                    }
                  </select>
                  <small class="font-medium text-red-700"></small>
                </fieldset>
                @if (errores().tipo) {
                  <small class="text-red-600">
                    {{ errores().tipo }}
                  </small>
                } @else if (tipoInvalido) {
                  <small class="text-red-600">
                    El campo tipo es requerido y debes escoger un tipo de piel
                  </small>
                }
              </div>
            </div>
          </div>
        }

        <!-- Botones -->
        <div class="mt-6 flex justify-end gap-4 pb-4 md:col-span-2">
          @if (acciones() !== 'Visualizar') {
            <button
              class="h-10 w-auto cursor-pointer rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
              data-testid="boton-accion"
              >
              @if (carga()) {
                <svg
                  class="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#434343"
                >
                  <path
                    d="M480-60.78q-86.52 0-162.9-32.96-76.37-32.95-133.39-89.97T93.74-317.1Q60.78-393.48 60.78-480q0-87.04 32.95-163.06 32.95-76.03 89.96-133.18t133.4-90.07q76.39-32.91 162.91-32.91 22.09 0 37.54 15.46Q533-868.3 533-846.22q0 22.09-15.46 37.55-15.45 15.45-37.54 15.45-130.18 0-221.7 91.52t-91.52 221.69q0 130.18 91.52 221.71 91.52 91.52 221.69 91.52 130.18 0 221.71-91.52 91.52-91.52 91.52-221.7 0-22.09 15.45-37.54Q824.13-533 846.22-533q22.08 0 37.54 15.46 15.46 15.45 15.46 37.54 0 86.52-32.95 162.92t-89.96 133.44q-57.01 57.03-133.1 89.95Q567.12-60.78 480-60.78"
                  />
                </svg>
              } @else {
                {{ acciones() }} producto
              }
            </button>
          }

          <button
            type="button"
            class="cursor-pointer rounded-[15px] bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
            (click)="close()"
          >
            @if (acciones() === 'Visualizar') {
              Cerrar
            } @else {
              Cancelar
            }
          </button>
        </div>
      </form>
      <!-- Al final de tu template, después del cierre del </dialog> principal -->
      <app-modal
        [(mostrarModal)]="mostrarModalExito"
        [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
        [mensaje]="respuestaBack()"
        [tipo]="tipoRespuesta()"
      ></app-modal>
    </dialog>
  `,
})
export class FormProducto {
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public ingredientesServicio = inject(IngredientesService);
  public categoriasServicio = inject(CategoryService);
  public categorias = signal<any[]>([]);
  public categoriaSeleccionada = signal<string>('');
  public carga = signal<boolean>(false);

  public esencias = computed(() => {
    const ingredientes = this.ingredientesServicio.ingredientes();

    return ingredientes.filter(({ tipo }) => tipo === 'esencia');
  });

  public aromas = computed(() => {
    const ingredientes = this.ingredientesServicio.ingredientes();

    return ingredientes.filter(({ tipo }) => tipo === 'aroma');
  });

  public ingredientesSeleccionados = signal<string[]>([]);
  public mostrarModalExito = signal(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public alerta = viewChild<ElementRef<HTMLDialogElement>>('alerta');
  public mostrarModal = model<boolean>(false);
  public servicioProductos = input<any>();
  public acciones = input.required<Actions>();

  public idRegistro = input<string>();
  public categoriaYTipos = signal<Record<string, string[]>>({});

  //variable para almacenar los valores que mostrar en formulario en product.page
  public mostrarDatos = input<any>();

  //almacena los datos del formulario, para enviar al body del backend
  public formulario = new FormGroup({
    imagen: new FormControl<File | string | null>(null, Validators.required),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?!\s+$)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,25}$/),
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=(.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]){10})[\s\S]{10,500}$/),
    ]),
    beneficios: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^;]{10,100};\s*[^;]{10,100};\s*[^;]{10,100}$/),
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:[1-9]\d?(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/),
    ]),
    stock: new FormControl(57, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    id_categoria: new FormControl('', Validators.required),
    ingredientes: new FormControl([''], Validators.required),
    aroma: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
  });

  public errores = signal<any>({
    imagen: '',
    nombre: '',
    descripcion: '',
    beneficios: '',
    precio: '',
    stock: '',
    id_categoria: '',
    ingredientes: '',
    aroma: '',
    tipo: '',
  });

  borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' })); //setea los errores
  }

  public toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.formulario.value).forEach(([key, value]) => {
      if (key === 'ingredientes') {
        this.ingredientesSeleccionados().forEach((item) => {
          formData.append('ingredientes[]', item);
        });
      } else if (key === 'beneficios' && typeof value === 'string') {
        value
          .split(';')
          .forEach((item) => formData.append('beneficios[]', item));
      } else if (typeof value === 'string') {
        formData.append(key, value.trim());
      } else if (value) {
        formData.append(key, value as any);
      }
    });
    return formData;
  }

  public close() {
    this.mostrarModal.set(false);
  }

  constructor() {
    this.categoriasServicio.obtener().subscribe({
      next: ({ categorias }: any) => {
        this.categorias.set(categorias); //almacena las categorias en la variable categorias
        const categoriasYTipos: Record<string, string[]> = {};

        categorias.forEach((categoria: any) => {
          const nombre = categoria.nombre.toLowerCase();

          if (nombre === 'jabones artesanales') {
            categoriasYTipos[categoria._id] = [
              'piel seca',
              'piel grasa',
              'piel mixta',
            ];
          } else if (nombre === 'velas artesanales') {
            categoriasYTipos[categoria._id] = [
              'decorativa',
              'aromatizante',
              'humidificación',
            ];
          }
        });

        this.categoriaYTipos.set(categoriasYTipos);
      },
    });

    effect(() => {
      if (this.categoriaSeleccionada()) {
        const tipos = this.categoriaYTipos()[this.categoriaSeleccionada()];

        const tipoPertenecienteACategoria = tipos.includes(
          this.formulario.value.tipo ?? '',
        );

        if (!tipoPertenecienteACategoria) {
          this.formulario.patchValue({ tipo: '' });
        }
      }
    });

    effect(() => {
      if (!this.mostrarModalExito() && this.tipoRespuesta() === 'exito') {
        this.mostrarModal.set(false);
      }
    });

    effect(() => {
      const dialog = this.modal()?.nativeElement;
      if (this.mostrarModal()) {
        dialog?.showModal?.();
        this.errores.set({
          imagen: '',
          nombre: '',
          descripcion: '',
          beneficios: '',
          precio: '',
          stock: '',
          id_categoria: '',
          ingredientes: '',
          aroma: '',
          tipo: '',
        });
      } else {
        dialog?.close?.();
      }
    });

    // Los efectos se ejecutan cuando cambian las señales, cuando no hay cambios, no se ejecutan
    effect(() => {
      if (this.acciones() !== 'Registrar') {
        const datos = this.mostrarDatos();
        this.formulario.patchValue({
          imagen: datos.imagen,
          nombre: datos.nombre,
          descripcion: datos.descripcion,
          beneficios: datos.beneficios.join(';'),
          precio: datos.precio.toString(),
          stock: datos.stock.toString(),
          id_categoria: datos.id_categoria?._id ?? datos.id_categoria, //?? verifica si es null o indefinido, y si es asi asigna lo de la derecha
          aroma: datos.aroma,
          tipo: datos.tipo,
          ingredientes: datos.ingredientes.map(
            (item: any) => item?._id ?? item,
          ),
        });

        // Cargar la imagen preview si existe
        if (datos.imagen) this.imagePreview = datos.imagen;

        this.ingredientesSeleccionados.set(
          datos.ingredientes.map((item: any) => item?._id ?? item), //almacena los ingredientes seleccionados
        );

        this.categoriaSeleccionada.set(
          datos.id_categoria?._id ?? datos.id_categoria,
        ); //almacena la categoria seleccionada

        if (this.acciones() === 'Visualizar') {
          this.formulario.disable();
        } else {
          this.formulario.enable();
        }
      } else if (this.acciones() === 'Registrar') {
        this.resetearFormulario();
        this.formulario.enable();
      }
    });
  }

  public resetearFormulario() {
    this.formulario.setValue({
      nombre: '',
      descripcion: '',
      beneficios: '',
      precio: '',
      stock: 1,
      imagen: null,
      id_categoria: '',
      ingredientes: [''],
      aroma: '',
      tipo: '',
    });
    this.imagePreview = null;
    this.ingredientesSeleccionados.set([]);
    this.categoriaSeleccionada.set('');
  }

  onSubmit() {
    const { beneficios } = this.formulario.value;
    const beneficiosArray = beneficios?.trim().split(';') || [];
    let invalidBeneficios = false;

    beneficiosArray.forEach((beneficio) => {
      const { length } = beneficio.trim();

      if (length < 10 || length > 100) invalidBeneficios = true;
    });

    const { length: lengthIngredientes } = this.ingredientesSeleccionados();

    if (
      this.formulario.invalid ||
      lengthIngredientes < 2 ||
      invalidBeneficios
    ) {
      this.errores.update((prev) => {
        const newErrors: any = {};
        Object.keys(prev).forEach((key) => {
          const campo = this.formulario.get(key);

          if (campo?.errors?.['required']) {
            newErrors[key] = 'Este campo es requerido';
          }
        });

        if (lengthIngredientes === 0) {
          newErrors.ingredientes = 'No has seleccionado ingredientes';
        }

        if (invalidBeneficios) {
          newErrors.beneficios =
            'Los tres beneficios deben tener entre 10 y 100 caracteres.';
        }

        return { ...prev, ...newErrors };
      });

      this.mostrarModalExito.set(true);
      this.tipoRespuesta.set('error');
      this.respuestaBack.set(
        'Por favor, completa todos los campos requeridos correctamente.',
      );
      return;
    }

    this.carga.set(true);
    const formData = this.toFormData();
    if (this.acciones() === 'Registrar') {
      this.servicioProductos()
        .registrar(formData) //envia el formulario al backend
        .subscribe({
          next: this.respuestaExitoBack,
          error: this.respuestadeErrorBack,
        })
        .add(() => {
          this.mostrarModalExito.set(true);
          this.carga.set(false);
        });
    } else if (this.acciones() === 'Actualizar') {
      //funcion para actualizar registro
      this.servicioProductos()
        .editar(this.idRegistro(), formData)
        .subscribe({
          next: this.respuestaExitoBack,
          error: this.respuestadeErrorBack,
        })
        .add(() => {
          this.mostrarModalExito.set(true);
          this.carga.set(false);
        });
    }
  }

  // funcion para almacenar los ingredientes seleccionados
  public seleccionarIngrediente(ingredienteId: string, event: any) {
    if (this.ingredientesSeleccionados().includes(ingredienteId)) {
      this.ingredientesSeleccionados.update((ingredientes) =>
        ingredientes.filter((id) => id !== ingredienteId),
      );
    } else if (this.ingredientesSeleccionados().length < 2) {
      this.ingredientesSeleccionados.update((ingredientes) => [
        ...ingredientes,
        ingredienteId,
      ]);
    } else {
      event.target.checked = false;
    }
  }

  //funcion para visualizacion prevvia de la imagen
  public imagePreview: string | ArrayBuffer | null = null;
  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => (this.imagePreview = reader.result);
      this.formulario.patchValue({
        imagen: file,
      });
      this.borrarError('imagen');
    }
  }

  public eliminarLetras(event: any) {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9.]/g, '');

    this.formulario.patchValue({ precio: numericValue });
    this.borrarError('precio');
  }

  private respuestadeErrorBack = ({ error }: { error: any }) => {
    const { details = [], msg } = error;

    if (details.length > 0) {
      details.forEach(({ path, msg }: any) => {
        this.errores.update((prev: any) => ({
          ...prev,
          [path]: msg,
        }));
      });
    }

    if (this.ingredientesSeleccionados().length === 0) {
      this.errores.update((prev: any) => ({
        ...prev,
        ingredientes: 'No has seleccionado ingredientes',
      }));
    }

    this.tipoRespuesta.set('error');
    this.respuestaBack.set(
      msg ?? 'Ocurrió un error inesperado, por favor intente más tarde.',
    );
  };

  private respuestaExitoBack = ({ msg }: any) => {
    this.tipoRespuesta.set('exito');
    this.respuestaBack.set(msg);
    this.resetearFormulario();
  };
}
