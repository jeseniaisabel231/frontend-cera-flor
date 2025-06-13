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
import { IngredientesService } from '../../../services/admin/ingredients.service';
import { Actions } from './modal.component';
import { ModalAvisosComponent } from './modalavisos.component';

@Component({
  selector: 'form-ingredients',
  template: `
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto rounded-[10px] bg-white text-[#3C3C3B] backdrop:backdrop-blur-[2px]"
    >
      <div class="flex items-center justify-between px-7 py-5">
        <h1 class="text-lg font-medium text-[#3C3C3B]">
          {{
            acciones() === 'Visualizar'
              ? 'Detalles Ingredientes'
              : 'Agregar Ingrediente'
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
            Imagen del ingrediente

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

        <!-- Nombre -->
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">
              Nombre del ingrediente:
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
              class="w-full rounded-lg border p-2 focus:outline-none"
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
          
          <select
            class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
            formControlName="tipo"
            [class]=""
            [value]="formulario.value.tipo"
          >
            <option selected value="" disabled hidden>
              Selecciona un tipo
            </option>
            @if (formulario.value.tipo === '6823a6c096655bcbe4971062') {
              <option value="seca">Moldes</option>
              <option value="grasa">Esencia</option>
              <option value="mixta">Aroma</option>
              <option value="mixta">Color</option>
            } @else if (formulario.value.tipo === '680fd248f613dc80267ba5d7') {
              <option value="seca">Piel seca</option>
              <option value="grasa">Piel grasa</option>
              <option value="mixta">Piel mixta</option>
            }
          </select>
          <div class="mt-4">
            <label class="mb-1 block text-sm font-medium">Precio</label>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">$</span>
              <input
                type="number"
                placeholder="Ej: 5.50"
                class="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                formControlName="precio"
                (input)="borrarError('precio')"
              />
            </div>
          </div>
          <!-- <select
            class="focus:ring-morado-400 w-full rounded-lg border border-gray-300 p-2 text-gray-600 focus:ring-2 focus:outline-none"
            formControlName="id_categoria"
            [class]=""
            [value]="formulario.value.tipo"
          >
            <option selected value="" disabled hidden>
              Selecciona una categoría
            </option>
            <option value="680fd248f613dc80267ba5d7">Jabón artesanal</option>
            <option value="6823a6c096655bcbe4971062">Vela artesanal</option>
            <option value="6823a6c096655bcbe4971062">Todos</option>
          </select> -->
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
              class="h-10 w-auto rounded-full bg-indigo-400 px-6 text-white hover:bg-indigo-500"
            >
              {{ acciones() }} productos
            </button>
          }

          <button
            type="button"
            class="rounded-full bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
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
        [mostrarModal]="mostrarModalExito()"
        [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
        [mensaje]="respuestaBack()"
        [tipo]="tipoRespuesta()"
        (closed)="cerraTodo()"
      ></app-modal>
    </dialog>
  `,
  imports: [ModalAvisosComponent, ReactiveFormsModule],
})
export class FormIngredientsComponent {
  public servicioIngredientes = inject(IngredientesService);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public ingredientes = signal<any[]>([]);
  public ingredientesSeleccionados = signal<string[]>([]);
  public mostrarModalExito = signal(false);
  public mostrarModal = model<boolean>(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public alerta = viewChild<ElementRef<HTMLDialogElement>>('alerta');
  public mostrarDatos = input<any>();
  public acciones = input.required<Actions>();
  public idRegistro = input<string>();
  public cambioEmitir = output<any>();
  public imagePreview: string | ArrayBuffer | null = null;

  public formulario = new FormGroup({
    imagen: new FormControl<File | null>(null, Validators.required),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$'),
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ]),
    stock: new FormControl(57, Validators.required),
    tipo: new FormControl('', Validators.required),
  });
  public errores = signal<any>({
    nombre: '',
    precio: '',
    stock: '',
    tipo: '',
  });
  borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' })); //setea los errores
  }
  public close() {
    this.mostrarModal.set(false);
    this.alerta()?.nativeElement.close(); //cierra el modal de alerta
  }
  cerraTodo() {
    this.mostrarModalExito.set(false);
    if (this.tipoRespuesta() === 'exito') {
      this.close(); // Solo cerramos el formulario si fue éxito
    }
  }
  onSubmit() {
    const formData = this.toFormData(); //convierte el
    if (this.acciones() === 'Registrar') {
      this.servicioIngredientes
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
      this.servicioIngredientes
        .editar(this.idRegistro()!, this.formulario?.value)
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
  constructor() {
    //llama al servicio de ingredientes
    this.servicioIngredientes.obtener().subscribe({
      next: (ingredientes: any) => {
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
        this.formulario.patchValue({
          imagen: datos.imagen,
          nombre: datos.nombre,
          precio: datos.precio.toString(),
          stock: datos.stock.toString(),
          tipo: datos.tipo,
        });

        // Cargar la imagen preview si existe
        if (datos.imagen) {
          this.imagePreview = datos.imagen;
        }

        this.ingredientesSeleccionados.set(
          datos.ingredientes.map((item: any) => item?._id ?? item), //almacena los ingredientes seleccionados
        );
        if (this.acciones() === 'Visualizar') {
          this.formulario.disable();
        } else {
          this.formulario.enable();
        }
      } else if (this.acciones() === 'Registrar') {
        this.formulario.setValue({
          nombre: '',
          precio: '',
          stock: 1,
          imagen: null,
          tipo: '',
        });
        this.formulario.enable();
        this.imagePreview = null;
      }
    });
  }
}
