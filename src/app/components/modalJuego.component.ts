import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div
        class="animate-pop-up mx-4 flex w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 text-center shadow-2xl"
      >
        <h2 class="mb-3 text-xl font-bold text-purple-700">Aviso del juego</h2>
        <p class="mb-4 text-gray-600" [innerHTML]="text()"></p>
        @if (imagen()) {
          <img [src]="imagen()" alt="" />
        }
        <div class="mt-4 flex justify-center gap-4">
          @if (imagen()) {
            <button
              routerLink="/productos-personalizados"
              class="h-10 w-auto cursor-pointer rounded-[15px] bg-indigo-400 px-6 text-white hover:bg-indigo-500"
            >
              Ver mis personalizaciones
            </button>
            <button
              (click)="confirm.emit()"
              class="cursor-pointer rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              Continuar creando
            </button>
          } @else {
            <button
              (click)="confirm.emit()"
              class="cursor-pointer rounded-full bg-[#806bff] px-6 py-2.5 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#816bffc6] focus:ring-2 focus:ring-gray-300 focus:outline-none"
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
