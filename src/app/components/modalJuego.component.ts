import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div
        class="animate-pop-up mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 text-center shadow-2xl"
      >
        <h2>Aviso del juego</h2>
        <p class="mb-4 text-gray-600">
          {{ text() }}
        </p>
        @if (imagen()) {
          <img [src]="imagen()" alt="" />
        }
        <div class="flex justify-center gap-4">
          @if (imagen()) {
            <button
              (click)="confirm.emit()"
              class="rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              Añadir carrito
            </button>
            <button
              (click)="confirm.emit()"
              class="rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              Cancelar
            </button>
          } @else {
            <button
              (click)="confirm.emit()"
              class="rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              Aceptar
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-pop-up {
        animation: popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }

      @keyframes popUp {
        0% {
          transform: scale(0.95) translateY(10px);
          opacity: 0;
        }
        100% {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ModalJuegoComponent {
  public confirm = output<void>();
  public text = input<string>('');
  public imagen = input<string>('');
}
