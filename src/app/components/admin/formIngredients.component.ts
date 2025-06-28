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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IngredientesService } from '../../../services/admin/ingredients.service';
import { CategoryService } from '../../../services/categorias.service';
import { categorias } from '../../interfaces/categoria.interface';
import { Actions } from './modal.component';
import { ModalAvisosComponent } from './modalavisos.component';

@Component({
  selector: 'form-ingredients',
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
                ? 'Detalles del ingrediente'
                : acciones() === 'Actualizar'
                  ? 'Actualizar ingrediente'
                  : 'Registrar ingrediente'
            }}
          </h1>
          @if (acciones() !== 'Visualizar') {
            <small class="text-[#806bff]">
              Recuerde no dejar espacios en blanco al derecho y al reves de cada
              campo.
            </small>
          }
        </div>
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

        @let imagenInvalida =
          (formulario.get('imagen')?.invalid &&
            formulario.get('imagen')?.value) ||
          errores().imagen;

        <div class="h-full">
          @if (formulario.get('tipo')?.value !== 'color') {
            <label for="foto" class="mb-2">
              <span>
                Imagen del ingrediente
                <strong>(tamaño máximo: 2MB)</strong>
              </span>

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
                    alt="Imagen del ingrediente"
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
                  (change)="onFileChange($event)"
                />
              </div>
            </label>
          } @else {
            <label class="mb-2 block text-sm font-medium">
              Seleccione el color
              <span class="text-red-500">*</span>
            </label>
            <input
              #inputColor
              type="color"
              class="focus:ring-morado-400 h-50 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
              [class]="
                imagenInvalida
                  ? 'border-red-500 focus:ring-0 focus:outline-none'
                  : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
              "
              [value]="color()"
              (input)="color.set(inputColor.value); borrarError('imagen')"
              (change)="generarImagenCircularDesdeColor()"
            />
          }
          @if (errores().imagen) {
            <small class="text-red-600">
              {{ errores().imagen }}
            </small>
          } @else if (imagenInvalida) {
            <small class="text-red-600">
              La imagen debe ser un archivo de imagen válido (JPG, PNG, GIF).
            </small>
          }
        </div>

        <!-- Nombre -->
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">
              Nombre del ingrediente
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
              placeholder="Ej. Vainilla"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
              formControlName="nombre"
              (input)="borrarError('nombre')"
            />
            @if (errores().nombre) {
              <small class="text-red-600">
                {{ errores().nombre }}
              </small>
            } @else if (nombreInvalido) {
              <small class="text-red-600">
                <div class="w-[215px]">
                  El nombre debe contener entre 3 y 25 caracteres alfabéticos.
                </div>
              </small>
            }
          </div>

          @let tipoInvalido =
            (formulario.get('tipo')?.invalid &&
              formulario.get('tipo')?.value) ||
            errores().tipo;

          <div>
            <label class="mb-1 block text-sm font-medium">Tipo:</label>
            <select
              #selectTipo
              class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
              formControlName="tipo"
              [class]="
                tipoInvalido
                  ? 'border-red-500 focus:ring-0 focus:outline-none'
                  : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
              "
              (change)="borrarError('tipo'); alCambiarTipo(selectTipo.value)"
            >
              <option selected value="" disabled hidden>
                Selecciona un tipo de ingrediente
              </option>

              <option value="molde">Moldes</option>
              <option value="esencia">Esencia</option>
              <option value="aroma">Aroma</option>
              <option value="color">Color</option>
            </select>

            @if (errores().tipo) {
              <small class="text-red-600">
                {{ errores().tipo }}
              </small>
            } @else if (tipoInvalido) {
              <small class="text-red-600">
                Debes seleccionar un tipo de ingrediente.
              </small>
            }
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
                placeholder="Ej. 5.50"
                class="placeholder-gris-200 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                formControlName="precio"
                [class]="
                  precioInvalido
                    ? 'border-red-500 focus:ring-0 focus:outline-none'
                    : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
                "
                (input)="eliminarLetras($event)"
              />
            </div>

            @if (errores().precio) {
              <small class="text-red-600">
                {{ errores().precio }}
              </small>
            } @else if (
              precioInvalido || formulario.get('precio')?.value == '0'
            ) {
              <small class="text-red-600">
                El precio debe ser un número entre 1 y 100, con un máximo de dos
                decimales.
              </small>
            }
          </div>

          @let categoriaInvalida =
            (formulario.get('id_categoria')?.invalid &&
              formulario.get('id_categoria')?.value) ||
            errores().id_categoria;

          <label class="mb-1 block text-sm font-medium">Categoría:</label>

          <select
            class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 p-2 text-gray-600 focus:ring-2 focus:outline-none"
            formControlName="id_categoria"
            [class]="
              categoriaInvalida
                ? 'border-red-500 focus:ring-0 focus:outline-none'
                : 'focus:ring-morado-400 border-gray-300 focus:ring-1'
            "
            (change)="borrarError('id_categoria')"
          >
            <option selected value="" disabled hidden>
              Selecciona una categoría
            </option>
            @for (categoria of categorias; track categoria._id) {
              <option [value]="categoria._id">
                {{ categoria.nombre }}
              </option>
            }
            <option value="ambas">Ambas categorías</option>
          </select>

          @if (errores().id_categoria) {
            <small class="text-red-600">
              {{ errores().id_categoria }}
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

        <!-- Botones -->
        <div class="mt-6 flex justify-end gap-4 pb-4 md:col-span-2">
          @if (acciones() !== 'Visualizar') {
            <button
              class="h-10 w-auto rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
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
                {{ acciones() }} ingrediente
              }
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
  imports: [ModalAvisosComponent, ReactiveFormsModule, FormsModule],
})
export class FormIngredientsComponent {
  public servicioIngredientes = inject(IngredientesService);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public mostrarModalExito = signal(false);
  public mostrarModal = model<boolean>(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarDatos = input<any>();
  public acciones = input.required<Actions>();
  public idRegistro = input<string>();
  public imagePreview: string | ArrayBuffer | null = null;
  public serviceCategorias = inject(CategoryService);
  public categorias: categorias[] = [];
  public idsCategorias = signal<string[]>([]);
  public color = signal<string>('');
  public tipoAnterior = signal<'color' | 'otro'>('otro');
  public tipo = signal<string>('');
  public carga = signal<boolean>(false);

  public formulario = new FormGroup({
    imagen: new FormControl<File | null>(null, Validators.required),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?!\s+$)[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,25}$/),
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:[1-9]\d?(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/),
    ]),
    stock: new FormControl(57, Validators.required),
    tipo: new FormControl('', Validators.required),
    id_categoria: new FormControl('', Validators.required),
  });

  public errores = signal<any>({
    imagen: '',
    nombre: '',
    precio: '',
    stock: '',
    tipo: '',
    id_categoria: '',
  });

  borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' })); //setea los errores
  }
  public close() {
    this.mostrarModal.set(false);
  }

  onSubmit() {
    this.carga.set(true);
    const formData = this.toFormData(); //convierte el
    if (this.acciones() === 'Registrar') {
      this.servicioIngredientes
        .registrar(formData)
        .subscribe({
          next: this.respuestaExitoBack,
          error: this.respuestadeErrorBack,
        })
        .add(() => {
          this.mostrarModalExito.set(true);
          this.carga.set(false);
        });
    } else if (this.acciones() === 'Actualizar') {
      this.servicioIngredientes
        .editar(this.idRegistro()!, formData)
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
  public toFormData(): FormData {
    const formData = new FormData();

    Object.entries(this.formulario.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'imagen') {
          if (value instanceof File) {
            formData.append(key, value, value.name);
          }
        } else if (key === 'id_categoria') {
          if (value === 'ambas') {
            // Si la categoría es "ambas", agregar los IDs de las categorías
            this.idsCategorias().forEach((id) => {
              formData.append('id_categoria[]', id);
            });
          } else if (typeof value === 'string' && value) {
            // Si es un string y no está vacío, agregarlo directamente
            formData.append('id_categoria', value);
          }
        } else {
          // Convertir números a string
          const finalValue =
            typeof value === 'number' ? value.toString() : value;
          formData.append(key, finalValue as any);
        }
      }
    });
    return formData;
  }
  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.formulario.patchValue({
          imagen: file,
        });
        this.borrarError('imagen');
      };
      reader.readAsDataURL(file);
    }
  }
  constructor() {
    effect(() => {
      if (!this.mostrarModalExito() && this.tipoRespuesta() === 'exito') {
        this.mostrarModal.set(false);
      }
    });

    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
        this.errores.set({
          imagen: '',
          nombre: '',
          precio: '',
          stock: '',
          tipo: '',
          id_categoria: '',
        });
      } else {
        this.modal()?.nativeElement.close();
      }
    });

    effect(() => {
      const tipoAnterior = this.tipoAnterior();
      if (tipoAnterior === 'color') {
        this.color.set('#000000');
      } else if (tipoAnterior === 'otro') {
        this.generarImagenCircularDesdeColor();
      }
      this.imagePreview = null; // Limpiar la imagen preview si el tipo anterior era 'color'
      this.formulario.patchValue({
        imagen: null,
      });
    });

    effect(() => {
      const tipo = this.tipo();
      if (tipo === 'color') {
        this.color.set('#000000');
        this.generarImagenCircularDesdeColor();
      }
    });

    effect(() => {
      if (this.acciones() !== 'Registrar' && this.mostrarDatos()) {
        const datos = this.mostrarDatos();

        const categorias = datos.id_categoria;

        this.formulario.patchValue({
          nombre: datos.nombre,
          precio: datos.precio.toString(),
          stock: datos.stock.toString(),
          tipo: datos.tipo,
          id_categoria: categorias.length === 1 ? categorias[0] : 'ambas',
        });

        // Cargar la imagen preview si existe
        if (datos.imagen) {
          this.imagePreview = datos.imagen;
        } else {
          this.imagePreview = null;
        }

        if (datos.tipo === 'color') {
          this.servicioIngredientes
            .extraerColorDominante(datos.imagen)
            .subscribe(({ color }) => {
              this.color.set(color);
            });
        }

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

  alCambiarTipo(tipo: string) {
    this.tipo.update((prev) => {
      if (prev !== tipo) {
        this.tipoAnterior.set(prev === 'color' ? 'color' : 'otro');
      }
      return tipo;
    });
    this.borrarError('tipo');
  }

  public eliminarLetras(event: any) {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9.]/g, '');

    // input.value = numericValue;
    this.formulario.patchValue({ precio: numericValue });
    this.borrarError('precio');
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.serviceCategorias.obtener().subscribe({
      next: (respuesta: any) => {
        this.categorias = respuesta.categorias;
        this.idsCategorias.set(
          this.categorias.map((categoria: categorias) => categoria._id),
        ); //almacena los ids de las categorias
      },
    });
  }
  public resetearFormulario() {
    this.formulario.setValue({
      nombre: '',
      precio: '',
      stock: 1,
      imagen: null,
      tipo: '',
      id_categoria: '',
    });

    this.imagePreview = null;
    this.color.set('');
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

    if (!this.formulario.value.id_categoria) {
      this.errores.update((prev: any) => ({
        ...prev,
        id_categoria: 'Debes seleccionar una categoría.',
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

  generarImagenCircularDesdeColor() {
    if (this.color()) {
      const size = 200; // tamaño del lienzo (ancho y alto)
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Limpia fondo (transparente)
        ctx.clearRect(0, 0, size, size);

        // Dibuja un círculo relleno con el color seleccionado
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI); // círculo centrado
        ctx.fillStyle = this.color(); // usa el color seleccionado
        ctx.fill();
        ctx.closePath();

        // Convertir a Blob y luego a File
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'color-circle.png', {
              type: 'image/png',
            });
            this.formulario.patchValue({
              imagen: file, // Actualiza el campo de imagen con el nuevo archivo
            });
          }
        }, 'image/png');
      }
    }
  }
}
