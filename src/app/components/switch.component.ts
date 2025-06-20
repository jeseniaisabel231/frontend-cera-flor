import { Component, effect, input, model, output } from '@angular/core';
//import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'switch',
  template: `
    <div
      class="flex items-center"
      [title]="
        verificarTipo() === 'venta'
          ? 'Pendiente o finalizado'
          : 'Activo o inactivo'
      "
      (click)="emitirCambioEvento()"
    >
      <label
        class="pointer-events-none relative inline-flex cursor-pointer items-center"
      >
        <input type="checkbox" [checked]="estado()" class="peer sr-only" />
        <div
          class="bg-gris-200 peer peer-checked:bg-morado-600 h-6 w-11 rounded-full"
        ></div>
        <span
          class="absolute inset-y-0 left-1 my-auto h-4 w-4 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:left-2 peer-checked:translate-x-full"
        ></span>
      </label>
    </div>
  `,
  styles: [],
})
export class SwitchComponent {
  public estado = model();
  public servicio = input<any>();
  public id = input<any>();
  public verificarTipo = input<string>();
  public emitirCambio = output<string>();
  public decision = model<boolean>();
  public idPorCambiar = input<string>('');

  constructor() {
    effect(() => {
      if (this.decision()) {
        this.cambiarEstado(this.idPorCambiar());
        this.decision.set(false);
      }
    });
  }

  public eliminarUsuario(id: string) {
    this.servicio()
      .eliminarEstado(id)
      .subscribe({
        next: () => {
          this.estado.set(!this.estado());
        },
        error: (error: any) => {
          console.error('Error al eliminar el usuario:', error);
        },
      });
  }
  activarUsuario(id: string) {
    this.servicio()
      .activarEstado(id)
      .subscribe({
        next: () => {
          this.estado.set(!this.estado());
        },
        error: (error: any) => {
          console.error('Error al activar el usuario:', error);
        },
      });
  }

  cambiarEstado(id: string) {
    if (this.verificarTipo() === 'venta') {
      this.servicio().editar(id, this.estado() ? 'pendiente' : 'finalizado').subscribe({});
      return;
    }

    if (this.estado()) {
      this.eliminarUsuario(id);
    } else {
      this.activarUsuario(id);
    }
  }

  emitirCambioEvento() {
    this.emitirCambio.emit(this.id());
  }
}
