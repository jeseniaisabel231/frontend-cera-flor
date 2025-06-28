import {
  Component,
  effect,
  ElementRef,
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
import { Actions } from './modal.component';
import { ModalAvisosComponent } from './modalavisos.component';

@Component({
  selector: 'formprom',
  imports: [ReactiveFormsModule, ModalAvisosComponent],
  template: `
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto w-3/4 rounded-[10px] bg-white text-[#3C3C3B] backdrop:backdrop-blur-[2px] md:w-1/3"
    >
      <div class="flex items-center justify-between px-7 pt-5">
        <h1 class="mb-6 text-lg font-medium text-[#3C3C3B]">
           {{
            acciones() === 'Registrar'
              ? 'Registrar promoción'
              : acciones() === 'Actualizar'
                ? 'Actualizar promoción'
                : 'Detalles de la promoción'
          }}
        </h1>
        <button (click)="close()" class="mb-6 focus:outline-none">
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
        @let imagenInvalida =
          (formulario.get('imagen')?.invalid &&
            formulario.get('imagen')?.value) ||
          errores().imagen;
        <div class="col-span-1 mb-4 h-full">
          <label for="foto" class="">
            <span>
              Imagen de la promoción
              <strong>(tamaño máximo: 2MB)</strong>
            </span>

            <div
              class="flex h-47 flex-col items-center justify-center rounded-xl border border-gray-300"
            >
              @if (imagePreview !== null) {
                <img
                  [src]="imagePreview"
                  alt="imagen de la promoción"
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

        <!-- Título y descripción -->
        @let nombreInvalido =
          (formulario.get('nombre')?.invalid &&
            formulario.get('nombre')?.value) ||
          errores().nombre;

        <div class="col-span-2 w-full gap-6">
          <!-- Título -->
          <div>
            <label class="mb-1 block text-sm font-medium" for="titulo">
              Título de la promoción:
            </label>
            <input
              type="text"
              id="titulo"
              class="focus:ring-morado-400 placeholder-gris-200 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:outline-none"
              placeholder="Ej: 20% de descuento en jabones"
              formControlName="nombre"
            />

            @if (errores().nombre) {
              <small class="text-red-600">
                {{ errores().nombre }}
              </small>
            } @else if (nombreInvalido) {
              <small class="text-red-600">
                El título debe contener al menos 3 letras y como máximo 30 caracteres.
              </small>
            }
          </div>
        </div>

        <!-- Botón -->
        <div class="mt-6 flex justify-end gap-4 pb-4 md:col-span-2">
          <button
            class="h-10 w-auto rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
          >
            {{ acciones() }} promoción
          </button>
          <button
            type="button"
            class="rounded-[15px] bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
            (click)="close()"
          >
            Cancelar
          </button>
        </div>
      </form>
      <app-modal
        [(mostrarModal)]="mostrarModalExito"
        [titulo]="tipoRespuesta() === 'exito' ? 'Éxito' : 'Error'"
        [mensaje]="respuestaBack()"
        [tipo]="tipoRespuesta()"
      ></app-modal>
    </dialog>
  `,
})
export class FormProm {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public mostrarModalExito = signal(false);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public servicioPromocion = input<any>();
  public acciones = input.required<Actions>();
  public idRegistro = input<string>();
  public mostrarDatos = input<any>();

  public formulario = new FormGroup({
    imagen: new FormControl<File | null>(null, Validators.required),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=(.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]){3})[\s\S]{3,30}$/),
    ]),
  });

  public errores = signal({
    nombre: '',
    imagen: '',
  });

  public toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.formulario.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    return formData;
  }

  public close() {
    this.mostrarModal.set(false);
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
      } else {
        this.modal()?.nativeElement.close();
      }
    });

    effect(() => {
      if (this.acciones() !== 'Registrar') {
        const datos = this.mostrarDatos();
        this.formulario.patchValue({
          nombre: datos.nombre,
          imagen: datos.imagen,
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
        this.resetearFormulario();
        this.formulario.enable();
      }
    });
  }

  onSubmit() {
    const formData = this.toFormData();

    if (this.acciones() === 'Registrar') {
      this.servicioPromocion()
        .registrar(formData)
        .subscribe({
          next: this.respuestaExitoBack,
          error: this.respuestadeErrorBack,
        })
        .add(() => this.mostrarModalExito.set(true));
    } else if (this.acciones() === 'Actualizar') {
      this.servicioPromocion()
        .editar(this.idRegistro(), formData)
        .subscribe({
          next: this.respuestaExitoBack,
          error: this.respuestadeErrorBack,
        })
        .add(() => this.mostrarModalExito.set(true));
    }
  }

  borrarError(campo: string) {
    this.errores.update((prev) => ({ ...prev, [campo]: '' })); //setea los errores
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
      this.borrarError('imagen');
    }
  }

  public resetearFormulario() {
    this.formulario.setValue({
      nombre: '',
      imagen: null,
    });
    this.imagePreview = null;
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
