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
import Swal from 'sweetalert2';
import { ToastComponent } from '../toast.component';
import { IngredientesService } from '../../../services/admin/ingredients.service';

@Component({
  selector: 'formulario',
  imports: [ReactiveFormsModule, ToastComponent],
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
                class="w-full h-full rounded-xl"
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
          <small class="text-red-700 font-medium">{{ errores().imagen }}</small>
        </div>

        <!-- Nombre y descripción -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Nombre del producto:
            </label>
            <input
              type="text"
              placeholder="Ej: Jabón de avena y miel"
              class="w-full border border-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-morado-400"
              formControlName="nombre"
            />
            <small class="text-red-700 font-medium">
              {{ errores().nombre }}
            </small>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              placeholder="Describe aroma, textura, beneficios o forma artesanal..."
              rows="4"
              class="w-full border border-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2  focus:ring-morado-400"
              formControlName="descripcion"
            ></textarea>
            <small class="text-red-700 font-medium">
              {{ errores().descripcion }}
            </small>
          </div>
        </div>

        <div class="mt-4 col-span-2">
          <label class="block text-sm font-medium mb-1">Beneficios</label>
          <textarea
            placeholder="Describe 3 de sus beneficios..."
            rows="4"
            class="w-full border border-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2  focus:ring-morado-400"
            formControlName="beneficios"
          ></textarea>
          <small class="text-red-700 font-medium">
            {{ errores().beneficios }}
          </small>
        </div>

        <div class="col-span-2 mt-4 flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <label for="">Stock:</label>
            <span>{{ formulario.value.stock }}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            formControlName="stock"
            class="accent-indigo-400"
          />
          <small class="text-red-700 font-medium">{{ errores().stock }}</small>
        </div>

        <!-- Categoría y precio -->
        <div class="mt-4">
          <label class="block text-sm font-medium mb-1">Categoría</label>
          <select
            class="text-gray-600 w-full border border-gray-300  rounded-lg p-2 focus:outline-none  focus:ring-2  focus:ring-morado-400"
            formControlName="id_categoria"
          >
            <option selected value="No hay categoria" disabled hidden>
              Selecciona una categoría
            </option>
            <option value="680fd248f613dc80267ba5d7">Jabón artesanal</option>
            <option value="68128844e4d236cfe51a6fd6">Vela artesanal</option>
          </select>
          <small class="text-red-700 font-medium">
            {{ errores().id_categoria }}
          </small>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium mb-1">Precio</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              placeholder="Ej: 5.50"
              class="w-full border border-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              formControlName="precio"
              (input)="validarPrecio($event)"
            />
            <span class="text-gray-600">$</span>
          </div>
          <small class="text-red-700 font-medium">{{ errores().precio }}</small>
        </div>

        <!-- Ingredientes -->
        @if(formulario.value.id_categoria !== null){

        <div class="md:col-span-2 mt-6">
          <p class="text-lg font-medium mb-3">Características del producto</p>

          <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <fieldset>
              <label class="block text-sm font-medium mb-1">
                Selecciona dos ingredientes
              </label>

              <div class="grid grid-cols-1 gap-2 text-sm pl-2">
                @for(ingrediente of ingredientes(); track ingrediente) {

                <label>
                  <input type="checkbox" class="mr-1" />
                  {{ ingrediente?.nombre }}
                </label>
                }
              </div>
              <small class="text-red-700 font-medium">
                {{ errores().id_categoria }}
              </small>
            </fieldset>

            <!-- Aroma y tipo de piel -->
            <div class="grid grid-cols-1 gap-4">
              <fieldset>
                <label class="block  font-medium mb-1">Aroma</label>
                <select
                  class="w-full border rounded-lg p-2 border-gray-300   focus:outline-none focus:ring-2  focus:ring-morado-400"
                  formControlName="aroma"
                >
                  <option selected value="" disabled hidden>
                    Selecciona un aroma
                  </option>

                  @if(formulario.value.id_categoria ===
                  '68128844e4d236cfe51a6fd6') {
                  <option value="vainilla">Vainilla v</option>
                  <option value="lavanda">Lavanda v</option>
                  <option value="citrico">Cítrico v</option>
                  }@else if(formulario.value.id_categoria ===
                  '680fd248f613dc80267ba5d7') {

                  <option value="vainilla">Vainilla</option>
                  <option value="lavanda">Lavanda</option>
                  <option value="citrico">Cítrico</option>
                  }
                  <!-- Agrega más opciones si deseas -->
                </select>
                <small class="text-red-700 font-medium">
                  {{ errores().aroma }}
                </small>
              </fieldset>
              <fieldset>
                <label class="block font-medium mb-1">Tipo</label>
                <select
                  class="w-full border rounded-lg p-2 border-gray-300   focus:outline-none focus:ring-2  focus:ring-morado-400"
                  formControlName="tipo"
                >
                  @if(formulario.value.id_categoria
                  ==='68128844e4d236cfe51a6fd6') {
                  <option selected value="" disabled hidden>
                    Selecciona un tipo de vela
                  </option>
                  <option value="seca">Relajacion</option>
                  <option value="grasa">Decorativo</option>
                  <option value="mixta">Humificacion</option>
                  }@else if(formulario.value.id_categoria
                  ==='680fd248f613dc80267ba5d7') {
                  <option selected value="" disabled hidden>
                    Selecciona un tipo de piel
                  </option>
                  <option value="seca">Piel seca</option>
                  <option value="grasa">Piel grasa</option>
                  <option value="mixta">Piel mixta</option>
                  }
                </select>
                <small class="text-red-700 font-medium">
                  {{ errores().tipo }}
                </small>
              </fieldset>
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
      <toast-component
        [exitoso]="false"
        [mensajes]="mensajes()"
        [(abierto)]="abierto"
      ></toast-component>
    </dialog>
  `,
})
export class FormProducto {
  public exitoso = signal(false);
  public mensajes = signal(['']);
  public abierto = signal(false);
  //para ingrdientes
  public ingredientesServicio = inject(IngredientesService);
  //crear una variable para almacenar todos los ingredientes
  public ingredientes = signal<any[]>([]);

  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public alerta = viewChild<ElementRef<HTMLDialogElement>>('alerta');
  public mostrarModal = model<boolean>(false);

  //almacena los datos del formulario, para enviar al body del backend
  public formulario = new FormGroup({
    imagen: new FormControl<File | null>(null, Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    beneficios: new FormControl([''], Validators.required),
    descuento: new FormControl('4', Validators.required),
    precio: new FormControl('', Validators.required),
    stock: new FormControl(1, Validators.required),
    id_categoria: new FormControl('No hay categoria', Validators.required),
    ingredientes: new FormControl(['Vainilla', 'Lavanda'], Validators.required),
    aroma: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
  }); //devuelve un objeto con los datos del formulario

  public toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.formulario.value).forEach(([key, value]) => {
      if (value instanceof Array) {
        value.forEach((item) => {
          console.log('Este es el item', item);
          formData.append(key + '[]', item);
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });
    return formData;
  }

  public servicioProductos = input<any>();

  public acciones = input.required<Actions>();

  //objeto que almacena los eerores del formulario
  public errores = signal({
    nombre: '',
    descripcion: '',
    beneficios: '',
    precio: '',
    stock: '',
    imagen: '',
    id_categoria: '',
    ingredientes: '',
    aroma: '',
    tipo: '',
  });

  //variable para emitir el cambio
  public cambioEmitir = output<any>();

  public idRegistro = input<string>();

  //variable para almacenar los valores que mostrar en formulario en product.page
  public mostrarDatos = input<any>();

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
        this.errores.set({
          nombre: '',
          descripcion: '',
          beneficios: '',
          precio: '',
          stock: '',
          imagen: '',
          id_categoria: '',
          ingredientes: '',
          aroma: '',
          tipo: '',
        });
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }

      // Aquí manejamos la carga de datos cuando es para visualizar/editar
      if (this.mostrarDatos() && this.acciones() !== 'Registrar') {
        const datos = this.mostrarDatos();
        this.formulario.patchValue({
          nombre: datos.nombre,
          descripcion: datos.descripcion,
          beneficios: datos.beneficios,
          precio: datos.precio.toString(),
          stock: datos.stock.toString(),
          id_categoria: datos.id_categoria._id,
          aroma: datos.aroma,
          tipo: datos.tipo,
        });

        // Cargar la imagen preview si existe
        if (datos.imagen) {
          this.imagePreview = datos.imagen;
        }

        // Deshabilitar campos si es solo visualización
        if (this.acciones() === 'Visualizar') {
          this.formulario.disable();
        } else {
          this.formulario.enable();
        }
      } else if (this.acciones() === 'Registrar') {
        this.formulario.setValue({
          nombre: '',
          descripcion: '',
          beneficios: [''],
          precio: '',
          stock: 1,
          imagen: null,
          id_categoria: '',
          ingredientes: [''],
          aroma: '',
          tipo: '',
          descuento: '5',
        });
        this.formulario.enable();
        this.imagePreview = null;
      }
    });
  }

  //funcion que verifica que haciion hace el boton
  onSubmit() {
    console.log(this.formulario?.value);
    // if (this.formulario?.invalid) {
    //   this.exitoso.set(false);
    //   this.mensajes.set(['Por favor completa todos los campos']);
    //   this.abierto.set(true);

    //   return;
    // }
    const formData = this.toFormData(); //convierte el formulario a FormData
    //vaciat lo errores
    this.errores.set({
      nombre: '',
      descripcion: '',
      beneficios: '',
      precio: '',
      stock: '',
      imagen: '',
      id_categoria: '',
      ingredientes: '',
      aroma: '',
      tipo: '',
    });

    this.formulario
      .get('beneficios')
      ?.setValue(
        this.formulario.get('beneficios')?.value?.toString()?.split(',') ?? []
      );

    //fun cion para crear un registro
    if (this.acciones() === 'Registrar') {
      this.servicioProductos()
        .registrar(formData) //envia el formulario al backend
        .subscribe({
          next: (registroCreado: any) => {
            this.cambioEmitir.emit(registroCreado);
            this.alerta()?.nativeElement.showModal(); //muestra el modal de alerta
            this.formulario?.reset(); //borra los datos almacenad en registrar formulario
          },
          //funcion para manejar errores
          //si el backend devuelve un error, se setea en el objeto errores
          error: ({ error }: { error: any }) => {
            const { details = [] } = error;
            details.forEach((detail: any) => {
              const { path, msg } = detail;
              this.errores.update((prev) => ({ ...prev, [path]: msg })); //setea los errores
            });
            console.log(error);
            this.exitoso.set(false);
            this.mensajes.set([error.msg]);
            this.abierto.set(true);
          },
        });
    } else if (this.acciones() === 'Actualizar') {
      //funcion para actualizar registro
      this.servicioProductos()
        .editar(this.idRegistro(), this.formulario?.value)
        .subscribe({
          next: (registroActualizado: any) => {
            this.cambioEmitir.emit(registroActualizado);
            alert('El registro se ha actualizado correctamente');
            this.formulario?.reset(); //borra los datos almacenad en registrar formulario
            this.close();
          },
          error: ({ error }: { error: any }) => {
            alert(error.response);
          },
        });
    }
  }

  public get twoCheckboxSelected(): boolean {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;
    let count = 0;
    for (const checkbox of checkboxes) {
      if (count === 2 && !checkbox.checked) {
        return true; // Si ya hay 2 seleccionados, no es necesario seguir contando
      } else if (checkbox.checked) {
        count++;
      }
    }
    return false; // Si no hay 2 seleccionados, devuelve false
  }

  //checkbox
  // public obtenerIngredientes(): string[] {
  //   const ingredientesSeleccionados: string[] = [];

  //   const checkboxes = document.querySelectorAll(
  //     'input[type="checkbox"]'
  //   ) as NodeListOf<HTMLInputElement>;
  //   checkboxes.forEach((checkbox) => {
  //     //verifica si el checkbox esta seleccionado

  //     if (checkbox.checked) {
  //       ingredientesSeleccionados.push(checkbox.id);
  //     }
  //   });
  //   this.formulario.get('ingredientes')?.setValue(ingredientesSeleccionados);
  //   return ingredientesSeleccionados;
  // }
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

  public validarPrecio(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = parseFloat(input.value);

    // Si el valor es negativo, lo corrige a 0
    if (valor < 0) {
      valor = 0;
    }

    // Actualiza el valor del campo en el formulario
    this.formulario.get('precio')?.setValue(valor.toString());
  }
}
