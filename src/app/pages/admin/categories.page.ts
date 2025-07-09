import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/categorias.service';
import { FormCategoryComponent } from '../../components/admin/form-category.component';
import { Actions } from '../../components/admin/modal.component';
import { Presentation } from '../../components/admin/presentation.component';
import { Navegacion } from '../../components/navegacion.component';
import { categorias } from '../../interfaces/categoria.interface';

@Component({
  imports: [Navegacion, FormCategoryComponent, Presentation, FormsModule],
  template: `
    <main class="flex min-h-dvh w-full bg-[#efecff]">
      <navegacion></navegacion>
      <section
        class="flex h-full w-full flex-col gap-4 border-l border-[#d0c9fe] p-6"
      >
        <presentation titulo="Categorías" class="col-span-5"></presentation>
        <article
          class="col-span-2 grid w-full grid-cols-2 gap-10 overflow-auto rounded-[18px] bg-white px-10 py-6 shadow-md"
        >
          @for (
            categoria of serviceCategorias.categorias();
            track categoria._id
          ) {
            <div
              class="mx-auto flex max-h-110 flex-col justify-between rounded-xl border border-gray-300"
              data-testid="tarjeta-categoria"
            >
              <div class="max-h-3/5">
                <figure
                  class="overflow-hidden border-b border-gray-300 h-full"
                >
                  <img
                    [src]="categoria.imagen"
                    [alt]="categoria.nombre"
                    class="h-full w-full rounded-t-md object-cover"
                  />
                </figure>
                <div class="flex flex-col justify-between p-4">
                  <h3
                    class="overflow-hidden text-lg font-bold text-ellipsis"
                  >
                    {{ categoria.nombre }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ categoria.descripcion }}
                  </p>
                </div>
              </div>
              <div class="flex items-center justify-center gap-2 px-4 pb-4">
                <button
                  class="h-10 w-auto cursor-pointer rounded-2xl bg-indigo-400 px-4 text-white hover:bg-indigo-500"
                  (click)="abrirFormEditar(categoria)"
                  title="Editar producto"
                  data-testid="editar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712m-2.218 5.93-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32z"
                    />
                    <path
                      d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          }
        </article>
      </section>
    </main>
    <form-category
      [(mostrarModal)]="mostrarModal"
      [mostrarDatos]="datosFormulario()"
      [idRegistro]="idParaEditar()"
      data-testid="formulario-categoria"
    ></form-category>
  `,
})
export class CategoriesPage {
  public serviceCategorias = inject(CategoryService);
  public mostrarModal = signal<boolean>(false);
  public idParaEditar = signal<string>('');
  public datosFormulario = signal<categorias | null>(null);

  public abrirFormEditar(datos: categorias) {
    this.idParaEditar.set(datos._id);
    this.datosFormulario.set(datos);
    this.mostrarModal.set(true);
  }
}
