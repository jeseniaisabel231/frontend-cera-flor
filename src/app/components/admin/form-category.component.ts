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
import { CategoryService } from '../../../services/categorias.service';
import { ModalAvisosComponent } from './modalavisos.component';

@Component({
  selector: 'form-category',
  imports: [ReactiveFormsModule, ModalAvisosComponent],
  template: `
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto w-3/4 rounded-[10px] bg-white text-[#3C3C3B] backdrop:backdrop-blur-[2px] lg:w-1/2"
    >
      <div class="flex items-center justify-between px-7 py-5">
        <h1 class="text-lg font-medium text-[#3C3C3B]">Actualizar categoría</h1>
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
        <div class="h-full">
          <label for="foto" class="flex flex-col gap-1">
            <span>
              Imagen de la categoría
              <strong>(tamaño máximo: 2MB)</strong>
            </span>
            <div
              class="flex h-47 flex-col items-center justify-center rounded-xl border border-gray-300"
            >
              @if (imagePreview !== null) {
                <img
                  [src]="imagePreview"
                  alt="imagen de la categoría"
                  class="h-full w-full rounded-xl object-cover"
                />
              } @else {
                <div class="flex cursor-pointer flex-col items-center gap-2">
                  <svg
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
              />
            </div>
          </label>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label class="block text-sm font-medium">
              Nombre de la categoría:
              <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. Jabones Artesanales"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none disabled:bg-gray-100"
              [value]="formulario.value.nombre"
              disabled
            />
          </div>
          <div class="flex flex-col gap-1">
            @let descripcionInvalida =
              formulario.get('descripcion')?.invalid &&
              formulario.get('descripcion')?.value;

            <label class="block text-sm font-medium">
              Descripción
              <span class="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe la categoría..."
              rows="4"
              class="placeholder-gris-200 w-full rounded-lg border p-2 focus:outline-none"
              formControlName="descripcion"
              data-testid="input-descripcion"
            ></textarea>

            @if (descripcionInvalida) {
              <span class="text-sm text-red-500">
                La descripción debe tener al menos 10 caracteres y un máximo de
                500.
              </span>
            }
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-4 pb-4 md:col-span-2">
          <button
            class="h-10 w-auto cursor-pointer rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
            data-testid="actualizar-categoria"
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
              Actualizar categoría
            }
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-[15px] bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
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
export class FormCategoryComponent {
  public serviceCategorias = inject(CategoryService);
  public carga = signal(false);
  public mostrarModal = model<boolean>(false);
  public idRegistro = input<string>();
  public mostrarDatos = input<any>();
  public mostrarModalExito = signal(false);
  public tipoRespuesta = signal<'exito' | 'error'>('exito');
  public respuestaBack = signal('');
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public imagePreview: string | ArrayBuffer | null = null;

  public formulario = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=(.*[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]){10})[\s\S]{10,500}$/),
    ]),
    imagen: new FormControl<File | string | null>(null),
  });

  constructor() {
    effect(() => {
      const dialog = this.modal()?.nativeElement;
      if (this.mostrarModal()) {
        dialog?.showModal?.();
        const {
          nombre = '',
          descripcion = '',
          imagen = null,
        } = this.mostrarDatos() || {};
  
        this.formulario.patchValue({
          nombre,
          descripcion,
          imagen,
        });
        this.imagePreview = imagen;
      } else {
        dialog?.close?.();
      }
    });

    effect(() => {
      if (!this.mostrarModalExito() && this.tipoRespuesta() === 'exito') {
        this.mostrarModal.set(false);
      }
    });
  }

  public close() {
    this.mostrarModal.set(false);
  }

  public onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => (this.imagePreview = reader.result);
      this.formulario.patchValue({ imagen: file });
    }
  }

  public toFormData(): FormData {
    const formData = new FormData();
    Object.entries(this.formulario.value).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as any);
      }
    });
    return formData;
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.tipoRespuesta.set('error');
      this.respuestaBack.set(
        'Por favor, completa todos los campos requeridos.',
      );
      this.mostrarModalExito.set(true);
      return;
    }

    this.carga.set(true);
    const formData = this.toFormData();

    this.serviceCategorias
      .actualizarCategoria(this.idRegistro()!, formData)
      .subscribe({
        next: (res) => {
          this.tipoRespuesta.set('exito');
          this.respuestaBack.set('Categoría actualizada exitosamente.');
          this.mostrarModalExito.set(true);
        },
        error: (err) => {
          this.tipoRespuesta.set('error');
          this.respuestaBack.set(
            err.error.message || 'Ocurrió un error al actualizar la categoría.',
          );
          this.mostrarModalExito.set(true);
        },
      })
      .add(() => this.carga.set(false));
  }
}
