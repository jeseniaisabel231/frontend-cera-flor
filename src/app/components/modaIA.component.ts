import {
  Component,
  effect,
  ElementRef,
  model,
  signal,
  viewChild,
} from '@angular/core';
@Component({
  selector: 'app-modal-ia',
  template: `
    <dialog
      #modal
      class="m-auto h-[45%] w-3/4 max-w-2xl rounded-xl bg-[#190c40] p-4 outline-none backdrop:bg-gray-600/25 backdrop:backdrop-blur-[2px]"
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <h2 class="mb-3 text-xl font-extrabold text-purple-700">
          Recomendación en camino
        </h2>

        <img
          class="w-1/3"
          src="https://i.pinimg.com/originals/e3/3d/ff/e33dffe14c05041b40e936901320b154.gif"
        />

        <span class="text-white">
          {{ textoActual() }}
        </span>
      </div>
    </dialog>
  `,
})
export class ModaIAComponent {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model(false);

  public contador = signal(0);
  public textos = signal([
    'Consultando sus compras recientes...',
    'Analizando sus preferencias...',
    'Escogiendo ingredientes en base a sus gustos...',
    'Revisando su historial de navegación...',
    'Procesando y cargando datos, espere un momento, por favor...',
    'Recomendación de Inteligencia Artificial en camino...',
    '¡Estamos casi listos! Gracias por su paciencia...',
  ]);

  public textoActual = signal(this.textos()[this.contador()]);

  constructor() {
    effect(() => {
      const dialog = this.modal()?.nativeElement;
      if (this.mostrarModal()) {
        dialog?.showModal?.();
      } else {
        dialog?.close?.();
      }
    });

    setInterval(() => {
      this.contador.update((c) => (c + 1) % this.textos().length);
      this.textoActual.set(this.textos()[this.contador()]);
    }, 2500);
  }
}
