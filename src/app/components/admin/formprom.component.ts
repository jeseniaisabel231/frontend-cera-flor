import {
  Component,
  effect,
  ElementRef,
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

@Component({
  selector: 'formprom',
  imports: [ReactiveFormsModule],
  template: `
    <dialog
      #modal
      class="m-auto bg-white backdrop:bg-gris-600/25 backdrop:backdrop-blur-[2px] rounded-[10px] text-[#3C3C3B]"
    >
      <div class="flex items-center pt-5 justify-between px-7">
        <h1 class="text-lg text-[#3C3C3B] font-medium mb-6">
          Agregar promoción
        </h1>
        <button (click)="close()" class="focus:outline-none mb-6">
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

      <!-- Imagen + info -->
      <form
        class="grid grid-cols-1 px-7"
        (ngSubmit)="onSubmit()"
        [formGroup]="formulario"
      >
        <div class="col-span-1 h-full mb-4">
          <label for="foto" class="">
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
          <small class="text-red-700 font-medium">{{ errores().imagen }}</small>
        </div>

        <!-- Título y descripción -->
        <div class="col-span-2 gap-6 w-full">
          
          <!-- Título -->
          <div>
            <label class="block text-sm font-medium mb-1" for="titulo">
              Título de la promoción:
            </label>
            <input
              type="text"
              id="titulo"
              class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-morado-400"
              placeholder="Ej: 20% de descuento en jabones"
              formControlName="nombre"
            />
            <small class="text-red-700 font-medium">
              {{ errores().nombre }}
            </small>
          </div>
          
        </div>

        <!-- Botón -->
        <div class="md:col-span-2 flex justify-end gap-4 mt-6 pb-4">
          <button
            class="bg-indigo-400 text-white px-6 h-10 rounded-full hover:bg-indigo-500 w-auto"
          >
            Guardar promoción
          </button>
          <button
            type="button"
            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition"
            (click)="close()"
          >
            Cancelar
          </button>
        </div>
      </form>
    </dialog>
  `,
})
export class FormProm {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public alerta = viewChild<ElementRef<HTMLDialogElement>>('alerta');
  public mostrarModal = model<boolean>(false);

  public formulario = new FormGroup({
    imagen: new FormControl<File | null>(null),
    nombre: new FormControl(''),
    createdAt: new FormControl(''),
  });

  public toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.formulario.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    return formData;
  }

  public servicioPromocion = input<any>();

  public acciones = input.required<Actions>();

  //objeto que almacena los eerores del formulario
  public errores = signal({
    nombre: '',
    imagen: '',
  });

  public cambioEmitir = output<any>();

  public idRegistro = input<string>();

  //variable para almacenar los valores que mostrar en formulario en product.page
  public mostrarDatos = input<any>();

  public close() {
    this.mostrarModal.set(false);
    this.alerta()?.nativeElement.close();
  }
  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }

      // Aquí manejamos la carga de datos cuando es para visualizar/editar
      if (this.mostrarDatos() && this.acciones() !== 'Registrar') {
        const datos = this.mostrarDatos();
        this.formulario.patchValue({
          nombre: datos.nombre,
          imagen: datos.imagen,
          createdAt: datos.createdAt,
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
        if (this.mostrarDatos()) {
          console.log(this.mostrarDatos());
          this.formulario.setValue({
            nombre: '',
            imagen: null,
            createdAt: '',
          });
        }
        this.formulario.reset();
        this.formulario.enable();
        this.imagePreview = null; // Reiniciar la vista previa de la imagen
      }
    });
  }

  onSubmit() {
    console.log(this.formulario?.value);
    if (this.formulario?.invalid) {
      alert('Formulario inválido');
      return;
    }
    const formData = this.toFormData(); //convierte el formulario a FormData
    //vaciat lo errores
    this.errores.set({
      nombre: '',
      imagen: '',
    });

    //fun cion para crear un registro
    if (this.acciones() === 'Registrar') {
      this.servicioPromocion()
        .registrar(formData) //envia el formulario al backend
        .subscribe({
          next: () => {
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
          },
        });
    } else if (this.acciones() === 'Actualizar') {
      //funcion para actualizar registro
      this.servicioPromocion()
        .editar(this.idRegistro(), this.formulario?.value)
        .subscribe({
          next: (registroActualizado: any) => {
            this.cambioEmitir.emit(registroActualizado); //emite el evento de cambio
            this.formulario?.reset(); //borra los datos almacenad en registrar formulario
            this.close();
          },
          error: ({ error }: { error: any }) => {
            alert(error.response);
          },
        });
    }
  }

  //Funcion que permite visualizar una imagen previa de la promocion
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
