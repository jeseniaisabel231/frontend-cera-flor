import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'toast-component',
  template: `
    @if (abierto()) {
      <div
        class="fixed bottom-8 sm:right-8 p-2 rounded-lg text-sm font-semibold flex flex-col border-l-4 z-99999"
        [class]="
          exitoso()
            ? 'bg-emerald-100 text-emerald-400 border-emerald-400 dark:bg-emerald-900'
            : 'bg-red-100 text-red-400 border-red-400 dark:bg-red-900'
        "
        [class.animate-slide-in-bottom]="cerrarAnimacion()"
        [class.animate-slide-out-top]="!cerrarAnimacion()"
      >
        @for (item of mensajes(); track $index) {
          <span>{{ emoji() }} {{ item }}</span>
        }
      </div>
    }
  `,
})
export class ToastComponent {
  public readonly exitoso = input.required<boolean>();
  public readonly mensajes = input.required<string[]>();
  public readonly abierto = model.required<boolean>();
  public readonly cerrarAnimacion = signal<boolean>(false);
  public readonly emoji = computed(() => (this.exitoso() ? '✅' : '⛔'));

  constructor() {
    effect(() => {
      if (this.abierto()) {
        this.cerrarAnimacion.set(true);
        
        setTimeout(() => {
          this.cerrarAnimacion.set(false);
          setTimeout(() => this.abierto.set(false), 640);
        }, 5000);
      }
    });
  }
}