import {
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
//import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'switch',
  template: `
    <div class="flex items-center"  [title]="verificarTipo() === 'venta' ? 'Pendiente o finalizado' : 'Activo o inactivo'">
      <label class="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          [checked]="estado()"
          (change)="cambiarEstado()"
          class="sr-only peer"
        />
        <div
          class="w-11 h-6 bg-gris-200 rounded-full peer peer-checked:bg-morado-600"
        ></div>
        <span
          class="absolute inset-y-0 my-auto left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out peer-checked:translate-x-full peer-checked:left-2"
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

  cambiarEstado() {
    if (this.verificarTipo() === 'venta') {
      this.servicio()
        .editar(this.id(), this.estado() ? 'pendiente' : 'finalizado')

        .subscribe({});
      return;
    }
    if (this.estado()) {
      this.eliminarUsuario(this.id());
    } else {
      this.activarUsuario(this.id());
    }
  }
}
