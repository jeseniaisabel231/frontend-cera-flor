import { TitleCasePipe } from '@angular/common';
import {
  Component,
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
      class="backdrop:bg-gris-600/25 m-auto rounded-[10px] bg-white text-[#3C3C3B] backdrop:backdrop-blur-[2px]"
    >
      <div class="flex items-center justify-between px-7 py-5">
        <h1 class="text-lg font-medium text-[#3C3C3B]">
          {{
            acciones() === 'Visualizar'
              ? 'Detalles del producto'
              : 'Agregar producto'
          }}
        </h1>
        <button (click)="close()" class="focus:outline-none">
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
          <label for="foto" class="mb-2">
            Imagen del producto

            <div
              class="flex h-47 flex-col items-center justify-center rounded-xl border border-gray-300"
            >
              @if (imagePreview !== null) {
                <img
                  [src]="imagePreview"
                  alt=""
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
                (change)="onFileChange($event)"
              />
            </div>
          </label>
        </div>

        <!-- Nombre y descripción -->
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">
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
              placeholder="Ej: Jabón de avena y miel"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
              formControlName="nombre"
              (input)="borrarError('nombre')"
            />
            @if (errores().nombre) {
              <small class="text-red-600">Este campo es obligatorio.</small>
            } @else if (nombreInvalido) {
              <small class="text-red-600">
                <div class="w-[215px]">
                  El nombre es requerido y debe tener al menos 3 caracteres.
                </div>
              </small>
            }
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">
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
              placeholder="Describe 3 de sus beneficios (separados por coma)..."
              rows="4"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
              formControlName="beneficios"
              (input)="borrarError('beneficios')"
            ></textarea>
            @if (errores().beneficios) {
              <small class="text-red-600">Este campo es obligatorio.</small>
            } @else if (beneficiosInvalido) {
              <small class="text-red-600">
                <div class="w-[215px]">
                  El campo beneficios es requerido y debe contener solo letras,
                  números y caracteres especiales como: . , ; : ! ? ( ) -
                </div>
              </small>
            }
          </div>
        </div>

        <div class="col-span-2 mt-4">
          <label class="mb-1 block text-sm font-medium">
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
          ></textarea>
          @if (errores().descripcion) {
            <small class="text-red-600">Este campo es obligatorio.</small>
          } @else if (descripcionInvalido) {
            <small class="text-red-600">
              La descripción es requerida y debe tener al menos 3 caracteres.
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
          />
          @if (errores().stock) {
            <small class="text-red-600">Este campo es obligatorio.</small>
          } @else if (stockInvalido) {
            <small class="text-red-600">
              El stock es requerido y debe ser un número entre 1 y 100.
            </small>
          }
        </div>

        <!-- Categoría y precio -->
        <div class="mt-4">
          <label class="mb-1 block text-sm font-medium">
            Categoría
            <span class="text-red-500">*</span>
          </label>
          @let categoriaInvalido =
            (formulario.get('id_categoria')?.invalid &&
              categoriaSeleccionada()) ||
            errores().id_categoria;

          <select
            class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
            formControlName="id_categoria"
            (change)="
              categoriaSeleccionada.set(
                formulario.get('id_categoria')?.value ?? ''
              )
            "
            [class]="
              categoriaInvalido
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
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
        </div>

        @let precioInvalido =
          (formulario.get('precio')?.invalid &&
            formulario.get('precio')?.value) ||
          errores().precio;

        <div class="mt-4">
          <label class="mb-1 block text-sm font-medium">Precio</label>
          <div class="flex items-center gap-2">
            <span class="text-gray-600">$</span>
            <input
              type="number"
              placeholder="Ej: 5.50"
              class="placeholder-gris-200 w-full [appearance:textfield] rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              formControlName="precio"
              (input)="borrarError('precio')"
            />
          </div>
          @if (errores().precio) {
            <small class="text-red-600">Este campo es obligatorio.</small>
          } @else if (precioInvalido) {
            <small class="text-red-600">
              El precio es requerido y debe ser un número válido (Ejm: 2.34).
            </small>
          }
        </div>

        <!-- Ingredientes -->
        @if (categoriaSeleccionada()) {
          <div class="mt-6 md:col-span-2">
            <p class="mb-3 text-lg font-medium">
              Características del producto
              <span class="text-red-500">*</span>
            </p>

            <div class="mb-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <fieldset>
                <label class="mb-1 block text-sm font-medium">
                  Selecciona
                  <strong class="text-bold">dos</strong>
                  ingredientes
                  <span class="text-red-500">*</span>
                </label>

                <div class="grid grid-cols-1 gap-2 pl-2 text-sm">
                  @for (ingrediente of ingredientes(); track ingrediente) {
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
                      />
                      {{ ingrediente?.nombre }}
                    </label>
                  }
                </div>
              </fieldset>

              <!-- Aroma y tipo de piel -->
              <div class="grid grid-cols-1 gap-4">
                <fieldset>
                  <label class="mb-1 block font-medium">
                    Aroma
                    <span class="text-red-500">*</span>
                  </label>
                  @let aromaInvalido =
                    (formulario.get('aroma')?.invalid &&
                      formulario.get('aroma')?.value) ||
                    errores().aroma;
                  <input
                    class="focus:ring-morado-400 placeholder-gris-200 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
                    formControlName="aroma"
                    placeholder="Ej: Vainilla"
                    [class]="
                      aromaInvalido
                        ? 'border-red-500 focus:ring-0 focus:outline-none'
                        : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
                    "
                  />
                </fieldset>
                @if (errores().aroma) {
                  <small class="text-red-600">Este campo es obligatorio.</small>
                } @else if (aromaInvalido) {
                  <small class="text-red-600">
                    El campo aroma es requerido y debes escoger un aroma.
                  </small>
                }
                <fieldset>
                  <label class="mb-1 block font-medium">
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
                  <small class="text-red-600">Este campo es obligatorio.</small>
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
              class="h-10 w-auto rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
            >
              {{ acciones() }} productos
            </button>
          }

          <button
            type="button"
            class="rounded-[15px] bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
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
  public categorias = signal<any[]>([]); //se inicializa como un arreglo vacio
  public categoriaSeleccionada = signal<string>('');

  public ingredientes = signal<any[]>([]);
  public ingredientesSeleccionados = signal<string[]>([]);
  public mostrarModalExito = signal(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public alerta = viewChild<ElementRef<HTMLDialogElement>>('alerta');
  public mostrarModal = model<boolean>(false);
  public servicioProductos = input<any>();
  public acciones = input.required<Actions>();
  //variable para emitir el cambio
  public idRegistro = input<string>();
  public categoriaYTipos = signal<Record<string, string[]>>({});

  //variable para almacenar los valores que mostrar en formulario en product.page
  public mostrarDatos = input<any>();

  //almacena los datos del formulario, para enviar al body del backend
  public formulario = new FormGroup({
    imagen: new FormControl<File | null>(null, Validators.required),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$'),
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    beneficios: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\s*[^,]+?\s*,\s*[^,]+?\s*,\s*[^,]+?\s*$/),
    ]),
    // Expresión regular para permitir letras, números y caracteres especiales
    precio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{1,2}(\.\d{1,2})?$/),
    ]),
    stock: new FormControl(57, Validators.required),
    id_categoria: new FormControl('', Validators.required),
    ingredientes: new FormControl([''], Validators.required),
    aroma: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
  }); //devuelve un objeto con los datos del formulario

  public errores = signal<any>({
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

  //metodo para borrar errores del cuando se escribe un nuevo valor
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
        value.split(',').forEach((item) => {
          formData.append('beneficios[]', item.trim());
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });
    return formData;
  }

  public close() {
    this.mostrarModal.set(false);
  }
  constructor() {
    //llama al servicio de ingredientes
    this.ingredientesServicio.obtener().subscribe(({ ingredientes }: any) => {
      const esencias = ingredientes.filter(
        (ingrediente: any) => ingrediente.tipo === 'esencia',
      );

      this.ingredientes.set(esencias);
    });
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
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
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
          beneficios: datos.beneficios,
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
        if (datos.imagen) {
          this.imagePreview = datos.imagen;
        }

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
  cerraTodo() {
    this.mostrarModalExito.set(false);
    if (this.tipoRespuesta() === 'exito') {
      this.close(); // Solo cerramos el formulario si fue éxito
    }
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
  }

  //funcion que verifica que haciion hace el boton
  onSubmit() {
    const formData = this.toFormData(); //convierte el formulario a FormData
    //vaciat lo errores
    //fun cion para crear un registro
    if (this.acciones() === 'Registrar') {
      this.servicioProductos()
        .registrar(formData) //envia el formulario al backend
        .subscribe({
          next: ({ msg }: { msg: any }) => {
            this.tipoRespuesta.set('exito');
            this.mostrarModalExito.set(true);
            this.respuestaBack.set(msg);
            this.resetearFormulario(); //resetea el formulario
          },
          //funcion para manejar errores
          //si el backend devuelve un error, se setea en el objeto errores
          error: ({ error }: { error: any }) => {
            console.error('Error al crear el registro:', error);
            this.tipoRespuesta.set('error');
            this.mostrarModalExito.set(true);
            this.respuestaBack.set(error.msg);
          },
        });
    } else if (this.acciones() === 'Actualizar') {
      //funcion para actualizar registro
      this.servicioProductos()
        .editar(this.idRegistro(), formData)
        .subscribe({
          next: ({ msg }: any) => {
            this.tipoRespuesta.set('exito');
            this.respuestaBack.set(msg);
            this.resetearFormulario(); //resetea el formulario
          },
          error: ({ error: { msg } }: any) => {
            this.tipoRespuesta.set('error');
            this.respuestaBack.set(msg);
          },
        })
        .add(() => {
          this.mostrarModalExito.set(true);
        });
    }
  }

  // funcion para almacenar los ingredientes seleccionados
  public seleccionarIngrediente(ingredienteId: string, event: any) {
    if (this.ingredientesSeleccionados().includes(ingredienteId)) {
      // verifica si el ingrediente ya fue seleccionado
      this.ingredientesSeleccionados.update(
        (ingredientes) => ingredientes.filter((id) => id !== ingredienteId), // si fue seleccionado lo elimina
      );
    } else if (this.ingredientesSeleccionados().length < 2) {
      // verifica si hay menos de 2 ingredientes seleccionados
      this.ingredientesSeleccionados.update((ingredientes) => [
        ...ingredientes, // agregar los ingredientes anteriores
        ingredienteId, // agrega el nuevo ingrediente
      ]);
    } else {
      event.target.checked = false; // deselecciona el checkbox porque ya hay 2 seleccionados
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
    }
  }
}
