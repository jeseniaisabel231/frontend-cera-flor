import { Component, input } from '@angular/core';
//import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'switch',
  template: `
    <div class="flex items-center">
      <label
        class="pointer-events-none relative inline-flex cursor-pointer items-center"
      >
        <input type="checkbox" [checked]="estado()" class="peer sr-only" disabled/>
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
  public estado = input();
}
