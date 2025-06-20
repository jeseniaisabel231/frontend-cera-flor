import { TitleCasePipe } from '@angular/common';
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
  imports: [TitleCasePipe],
  selector: 'app-modal',
  standalone: true,
  template: `
    <dialog
      #modal
      class="backdrop:bg-gris-600/25 m-auto w-full max-w-2xs rounded-[10px] bg-white text-[#3C3C3B] backdrop:backdrop-blur-[2px]"
    >
      <div
        class="mx-auto flex w-2/3 flex-col items-center justify-center rounded-lg py-5"
      >
        @if (tipo() === 'exito') {
          <div class="mb-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        } @else if (tipo() === 'error') {
          <div class="mb-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        } @else if (tipo() === 'confirmacion') {
          <div class="mb-4 text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              ></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        }
        <h3 class="mb-4 text-center text-xl font-bold">
          {{ titulo() | titlecase }}
        </h3>
        <p class="mb-6 flex items-center justify-center text-center">
          {{ mensaje() }}
        </p>

        <!-- Botones dinámicos -->
        <div class="flex gap-4">
          @if (tipo() === 'confirmacion') {
            <button
              (click)="confirmar.emit(); close()"
              class="rounded-[10px] bg-red-500 px-5 py-2 font-bold text-white transition-colors hover:bg-red-600"
            >
              Eliminar
            </button>
            <button
              (click)="close()"
              class="rounded-[10px] bg-gray-400 px-5 py-2 font-bold text-white transition-colors hover:bg-gray-500"
            >
              Cancelar
            </button>
          } @else if (tipo() === 'decidir') {

            <button
              (click)="realizarDecision(true)"
              class="rounded-[10px] bg-gray-400 px-5 py-2 font-bold text-white transition-colors hover:bg-gray-500"
            >
              Aceptar
            </button>
            <button
              (click)="realizarDecision(false)"
              class="rounded-[10px] bg-gray-400 px-5 py-2 font-bold text-white transition-colors hover:bg-gray-500"
            >
              Cancelar
            </button>
          } @else {
            <button
              (click)="close()"
              class="rounded-[10px] bg-[#9F93E7] px-5 py-2 font-bold text-white transition-colors hover:bg-[#8a7cd8]"
            >
              OK
            </button>
          }
        </div>
      </div>
    </dialog>
  `,
})
export class ModalAvisosComponent {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public titulo = input<string>('');
  public mensaje = input<string>('');
  public tipo = input<'exito' | 'error' | 'confirmacion' | 'decidir'>('exito');
  public confirmar = output<void>();
  public decision = output<boolean>();
  public reload = input<boolean>(false);
  //esta funcion se encarga de cerrar el modal
  public close() {
    this.mostrarModal.set(false);
    if (this.reload()) {
      window.location.reload();
    }
  }

  public realizarDecision(valor: boolean) {
    this.decision.emit(valor);
    this.close();
  }

  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
}
