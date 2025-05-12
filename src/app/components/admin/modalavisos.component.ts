import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <dialog
      #modal
      class="m-auto bg-white backdrop:bg-gris-600/25 backdrop:backdrop-blur-[2px] rounded-[10px] text-[#3C3C3B] max-w-2xs w-full"
    >
      <div class="flex flex-col  items-center justify-center py-5 rounded-lg w-2/3 mx-auto">
        <h3 class="text-xl font-bold mb-4">{{ title() }}</h3>
        <p class="mb-6">{{ message() }}</p>
        <button
          (click)="close()"
          class="w-full bg-[#9F93E7] text-white py-2 rounded-[15px] hover:bg-[#8a7cd8] transition-colors"
        >
          {{ closeButtonText() }}
        </button>
      </div>
    </dialog>
  `,
})
export class ModalAvisosComponent {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public visible = model<boolean>(false);
  public title = input<string>('');
  public message = input<string>('');
  public closeButtonText = input<string>('OK');

  //public closed = output<void>();
  //esta funcion se encarga de cerrar el modal
  public close() {
    this.visible.set(false);
  }
  constructor() {
    effect(() => {
      if (this.visible()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
}
