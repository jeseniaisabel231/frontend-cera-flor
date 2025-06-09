import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions } from './modal.component';
import { ToastComponent } from '../toast.component';
import { IngredientesService } from '../../../services/admin/ingredients.service';
import { ModalAvisosComponent } from './modalavisos.component';

@Component({
  selector: 'formulario',
  imports: [ReactiveFormsModule, ModalAvisosComponent],
  template: `
    <dialog
      #modal
      class="m-auto bg-white backdrop:bg-gris-600/25 backdrop:backdrop-blur-[2px] rounded-[10px] text-[#3C3C3B]"
    >
      <div class="flex items-center py-5 justify-between px-7">
        <h1 class="text-lg text-[#3C3C3B] font-medium">
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
        class="grid grid-cols-1 md:grid-cols-2 gap-x-4 py-2 px-7"
        (ngSubmit)="onSubmit()"
        [formGroup]="formulario"
      >
        <!-- Subir foto -->

        <div class="h-full">
          <label for="foto" class="mb-2">
            Imagen del producto

            <div
              class="flex flex-col items-center border border-gray-300  rounded-xl h-47 justify-center"
            >
              @if(imagePreview !== null) {

              <img
                [src]="imagePreview"
                alt=""
                class="w-full h-full rounded-xl object-cover"
              />
              }@else {

              <div class="flex flex-col items-center gap-2 cursor-pointer">
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
            <label class="block text-sm font-medium mb-1">
              Nombre del producto:
              <span class="text-red-500">*</span>
            </label>
            @let nombreInvalido = formulario.get('nombre')?.invalid &&
            formulario.get('nombre')?.value || errores().nombre;

            <input
              [class]="
                nombreInvalido
                  ? 'border-red-500 focus:outline-none focus:ring-0'
                  : 'border-gray-300  focus:ring-morado-400 focus:ring-1 '
              "
              type="text"
              placeholder="Ej: Jabón de avena y miel"
              class="w-full border rounded-lg p-2 focus:outline-none"
              formControlName="nombre"
              (input)="borrarError('nombre')"
            />
            @if(errores().nombre) {

            <small class="text-red-600">Este campo es obligatorio.</small>
            }@else if (nombreInvalido) {
            <small class="text-red-600">
              <div class="w-[215px]">
                El nombre es requerido y debe tener al menos 3 caracteres.
              </div>
            </small>
            }
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">
              Beneficios
              <span class="text-red-500">*</span>
            </label>

            @let beneficiosInvalido = formulario.get('beneficios')?.invalid &&
            formulario.get('beneficios')?.value || errores().beneficios;

            <textarea
              [class]="
                beneficiosInvalido
                  ? 'border-red-500 focus:outline-none focus:ring-0'
                  : 'border-gray-300  focus:ring-morado-400 focus:ring-1 '
              "
              placeholder="Describe 3 de sus beneficios..."
              rows="4"
              class="w-full border rounded-lg p-2 focus:outline-none "
              formControlName="beneficios"
              (input)="borrarError('beneficios')"
            ></textarea>
            @if(errores().beneficios) {
            <small class="text-red-600">Este campo es obligatorio.</small>
            }@else if (beneficiosInvalido) {
            <small class="text-red-600">
              <div class="w-[215px]">
                El campo beneficios es requerido y debe contener solo letras,
                números y caracteres especiales como: . , ; : ! ? ( ) -
              </div>
            </small>
            }
          </div>
        </div>

        <div class="mt-4 col-span-2">
          <label class="block text-sm font-medium mb-1">
            Descripción
            <span class="text-red-500">*</span>
          </label>
          @let descripcionInvalido = formulario.get('descripcion')?.invalid &&
          formulario.get('descripcion')?.value || errores().descripcion;

          <textarea
            [class]="
              descripcionInvalido
                ? 'border-red-500 focus outline-none focus:ring-0'
                : 'border-gray-300  focus:ring-morado-400 focus:ring-1 '
            "
            placeholder="Describe aroma, textura, beneficios o forma artesanal..."
            rows="4"
            class="w-full border rounded-lg p-2 focus:outline-none "
            formControlName="descripcion"
            (input)="borrarError('descripcion')"
          ></textarea>
          @if(errores().descripcion) {
          <small class="text-red-600">Este campo es obligatorio.</small>
          }@else if(descripcionInvalido) {
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
            @let stockInvalido = formulario.get('stock')?.invalid &&
            formulario.get('stock')?.value || errores().stock;

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
          @if( errores().stock) {
          <small class="text-red-600">Este campo es obligatorio.</small>

          }@else if(stockInvalido) {
          <small class="text-red-600">
            El stock es requerido y debe ser un número entre 1 y 100.
          </small>
          }
        </div>

        <!-- Categoría y precio -->
        <div class="mt-4">
          <label class="block text-sm font-medium mb-1">
            Categoría
            <span class="text-red-500">*</span>
          </label>
          @let categoriaInvalido = formulario.get('id_categoria')?.invalid &&
          formulario.get('id_categoria')?.value || errores().id_categoria;

          <select
            class="text-gray-600 w-full border border-gray-300  rounded-lg p-2 focus:outline-none  focus:ring-2  focus:ring-morado-400"
            formControlName="id_categoria"
            [class]="
              categoriaInvalido
                ? 'border-red-500 focus:outline-none focus:ring-0'
                : 'border-gray-300  focus:ring-morado-400 focus:ring-1 '
            "
            [value]="formulario.value.id_categoria"
          >
            <option selected value="" disabled hidden>
              Selecciona una categoría
            </option>
            <option value="680fd248f613dc80267ba5d7">Jabón artesanal</option>
            <option value="6823a6c096655bcbe4971062">Vela artesanal</option>
          </select>
          <small class="text-red-700 font-medium"></small>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium mb-1">Precio</label>
          <div class="flex items-center gap-2">
            <span class="text-gray-600">$</span>
            <input
              type="number"
              placeholder="Ej: 5.50"
              class="w-full border border-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              formControlName="precio"
              (input)="borrarError('precio')"
            />
          </div>
        </div>
        @if(errores().id_categoria) {
        <small class="text-red-600">Este campo es obligatorio.</small>
        }@else if( categoriaInvalido) {
        <small class="text-red-600">
          El campo categoría es requerido y debe ser un número entre 1 y 100.
        </small>
        }

        <!-- Ingredientes -->
        @if(formulario.get('id_categoria')?.value !== '') {

        <div class="md:col-span-2 mt-6">
          <p class="text-lg font-medium mb-3">
            Características del producto
            <span class="text-red-500">*</span>
          </p>

          <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <fieldset>
              <label class="block text-sm font-medium mb-1">
                Selecciona dos ingredientes
                <span class="text-red-500">*</span>
              </label>
              @let ingredientesInvalido =
              formulario.get('ingredientes')?.invalid &&
              formulario.get('ingredientes')?.value || errores().ingredientes;

              <div class="grid grid-cols-1 gap-2 text-sm pl-2">
                @for(ingrediente of ingredientes(); track ingrediente) {

                <label>
                  <input
                    type="checkbox"
                    class="mr-1 accent-morado-600"
                    (change)="seleccionarIngrediente(ingrediente._id, $event)"
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
            @if(ingredientesSeleccionados().length > 2) {
            <small class="text-red-600">
              Solo puedes seleccionar hasta 2 ingredientes.
            </small>
            }@else if(ingredientesInvalido) {
            <small class="text-red-600">
              <div class="w-[215px]">
                El campo ingredientes es requerido y debes seleccionar al menos
                1 ingrediente.
              </div>
            </small>
            }

            <!-- Aroma y tipo de piel -->
            <div class="grid grid-cols-1 gap-4">
              <fieldset>
                <label class="block  font-medium mb-1">
                  Aroma
                  <span class="text-red-500">*</span>
                </label>
                @let aromaInvalido = formulario.get('aroma')?.invalid &&
                formulario.get('aroma')?.value || errores().aroma;
                <input
                  class="w-full border rounded-lg p-2 border-gray-300   focus:outline-none focus:ring-2  focus:ring-morado-400"
                  formControlName="aroma"
                  placeholder="Ej: Vainilla"
                  [class]="
                    aromaInvalido
                      ? 'border-red-500 focus:outline-none focus:ring-0'
                      : 'border-gray-300  focus:ring-morado-400 focus:ring-1 '
                  "
                />
              </fieldset>
              @if(errores().aroma) {
              <small class="text-red-600">Este campo es obligatorio.</small>
              }@else if(aromaInvalido){
              <small class="text-red-600">
                El campo aroma es requerido y debes escoger un aroma.
              </small>
              }
              <fieldset>
                <label class="block font-medium mb-1">
                  Tipo
                  <span class="text-red-500">*</span>
                </label>
                @let tipoInvalido = formulario.get('tipo')?.invalid &&
                formulario.get('tipo')?.value || errores().tipo;
                <select
                  class="w-full border rounded-lg p-2 border-gray-300   focus:outline-none focus:ring-2  focus:ring-morado-400"
                  formControlName="tipo"
                  [class]="
                    tipoInvalido
                      ? 'border-red-500 focus:outline-none focus:ring-0'
                      : 'border-gray-300  focus:ring-morado-400 focus:ring-1 '
                  "
                  [value]="formulario.value.tipo"
                >
                  <option selected value="" disabled hidden>
                    Selecciona un tipo
                  </option>
                  @if(formulario.value.id_categoria
                  ==='6823a6c096655bcbe4971062') {
                  <option value="seca">Relajante</option>
                  <option value="grasa">Decorativa</option>
                  <option value="mixta">Aromatica</option>
                  }@else if(formulario.value.id_categoria
                  ==='680fd248f613dc80267ba5d7') {

                  <option value="seca">Piel seca</option>
                  <option value="grasa">Piel grasa</option>
                  <option value="mixta">Piel mixta</option>
                  }
                </select>
                <small class="text-red-700 font-medium"></small>
              </fieldset>
              @if(errores().tipo) {
              <small class="text-red-600">Este campo es obligatorio.</small>
              }@else if(tipoInvalido){
              <small class="text-red-600">
                El campo tipo es requerido y debes escoger un tipo de piel
              </small>
              }
            </div>
          </div>
        </div>
        }

        <!-- Botones -->
        <div class="md:col-span-2 flex justify-end gap-4 mt-6 pb-4">
          @if(acciones() !== 'Visualizar') {

          <button
            class="bg-indigo-400 text-white px-6 h-10 rounded-full hover:bg-indigo-500 w-auto"
          >
            {{ acciones() }}
          </button>
          }

          <button
            type="button"
            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            (click)="close()"
          >
            @if(acciones() === 'Visualizar') { Cerrar } @else { Cancelar }
          </button>
        </div>
      </form>
      <!-- Al final de tu template, después del cierre del </dialog> principal -->
      <app-modal
        [mostrarModal]="mostrarModalExito()"
        [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
        [mensaje]="respuestaBack()"
        [tipo]="tipoRespuesta()"
        (closed)="cerraTodo()"
      ></app-modal>
    </dialog>
  `,
})
export class FormProducto {
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  //para ingrdientes
  public ingredientesServicio = inject(IngredientesService);
  //crear una variable para almacenar todos los ingredientes
  public ingredientes = signal<any[]>([]);

  public ingredientesSeleccionados = signal<string[]>([]);

  public mostrarModalExito = signal(false); //

  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public alerta = viewChild<ElementRef<HTMLDialogElement>>('alerta');
  public mostrarModal = model<boolean>(false);
  public servicioProductos = input<any>();

  public acciones = input.required<Actions>();

  //objeto que almacena los eerores del formulario

  //variable para emitir el cambio
  public cambioEmitir = output<any>();

  public idRegistro = input<string>();

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
    descripcion: new FormControl('', Validators.required),
    beneficios: new FormControl('', Validators.required),
    precio: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
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
        console.log(formData.getAll('ingredientes[]'));
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
    this.alerta()?.nativeElement.close(); //cierra el modal de alerta
  }
  constructor() {
    //llama al servicio de ingredientes
    this.ingredientesServicio.obtener().subscribe({
      next: (ingredientes: any) => {
        console.log('Estos son los ingredientes', ingredientes);
        this.ingredientes.set(ingredientes.ingredientes);
      },
      error: (error: any) => {
        console.error('Error al obtener los ingredientes:', error);
      },
    });

    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
    effect(() => {
      if (this.acciones() !== 'Registrar') {
        const datos = this.mostrarDatos();
        console.log(datos);
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
            (item: any) => item?._id ?? item
          ),
        });
        console.log(this.formulario.value);

        // Cargar la imagen preview si existe
        if (datos.imagen) {
          this.imagePreview = datos.imagen;
        }

        this.ingredientesSeleccionados.set(
          datos.ingredientes.map((item: any) => item?._id ?? item) //almacena los ingredientes seleccionados
        );
        console.log(this.ingredientesSeleccionados());
        if (this.acciones() === 'Visualizar') {
          this.formulario.disable();
        } else {
          this.formulario.enable();
        }
      } else if (this.acciones() === 'Registrar') {
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
        console.log('Es esooo', this.formulario.value);
        this.formulario.enable();
        this.imagePreview = null;
      }
    });
  }
  cerraTodo() {
    this.mostrarModalExito.set(false);
    if (this.tipoRespuesta() === 'exito') {
      this.close(); // Solo cerramos el formulario si fue éxito
    }
  }

  //funcion que verifica que haciion hace el boton
  onSubmit() {
    console.log(this.formulario?.value);
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
            this.formulario?.reset();
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
        .editar(this.idRegistro(), this.formulario?.value)
        .subscribe({
          next: (registroActualizado: any) => {
            this.cambioEmitir.emit(registroActualizado);
            this.mostrarModalExito.set(true);
            this.tipoRespuesta.set('exito');
            this.respuestaBack.set(registroActualizado.msg);
            this.formulario?.reset();
          },
          error: ({ error }: { error: any }) => {
            console.error('Error al actualizar el registro:', error);
            this.tipoRespuesta.set('error');
            this.mostrarModalExito.set(true);
            this.respuestaBack.set(error.msg);
          },
        });
    }
  }

  // funcion para almacenar los ingredientes seleccionados
  public seleccionarIngrediente(ingredienteId: string, event: any) {
    if (this.ingredientesSeleccionados().includes(ingredienteId)) {
      // verifica si el ingrediente ya fue seleccionado
      this.ingredientesSeleccionados.update(
        (ingredientes) => ingredientes.filter((id) => id !== ingredienteId) // si fue seleccionado lo elimina
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
    console.log(this.ingredientesSeleccionados());
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
