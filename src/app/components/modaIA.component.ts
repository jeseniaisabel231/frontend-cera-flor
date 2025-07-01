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
      class="m-auto h-[45%] w-3/4 max-w-2xl rounded-lg bg-[#190c40] p-4 outline-none backdrop:bg-gray-600/25 backdrop:backdrop-blur-[2px]"
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <h2 class="mb-3 text-xl font-bold text-purple-700">
          Recomendacion en camino
        </h2>

        <img
          class="w-1/3"
          src="https://i.pinimg.com/originals/e3/3d/ff/e33dffe14c05041b40e936901320b154.gif"
          alt=""
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
    'Cargando recomendaciones...',
    'Consultando sus compras recientes...',
    'Analizando sus preferencias...',
    'Buscando ingredientes populares...',
    'Inteligencia artificial en acción...',
    'Recomendaciones personalizadas en camino...',
  ]);

  public textoActual = signal(this.textos()[this.contador()]);

  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });

    setInterval(() => {
      this.contador.update((c) => (c + 1) % this.textos().length);
      this.textoActual.set(this.textos()[this.contador()]);
    }, 3000);
  }
}
