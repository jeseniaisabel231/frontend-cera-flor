import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { IngredientesService } from '../../services/admin/ingredients.service';
import { Headers } from '../components/header.component';
@Component({
  template: `
    <headers></headers>
    <main class="flex flex-col text-center">
      <div class="w-full">
        <img
          src="tallerJuego.jpg"
          alt=""
          class="h-[80vh] w-full object-cover contrast-50"
        />
        
        <div cdkDropListGroup class="flex flex-wrap">
          <!-- Primer contenedor (To do) -->
          <div
            class="mr-[25px] mb-[25px] inline-block w-[400px] max-w-full align-top"
          >
            <h2 class="mb-2 text-xl font-semibold">To do</h2>
            <div
              cdkDropList
              [cdkDropListData]="imgIngredientes"
              class="min-h-[60px] overflow-hidden rounded border border-gray-300 bg-white"
              (cdkDropListDropped)="drop($event)"
            >
              @for (item of imgIngredientes; track $index) {
                <img
                  class="flex size-50 cursor-move flex-row items-center justify-between border-b border-gray-300 bg-white p-[20px_10px] text-sm text-black/87"
                  [src]="item.imagen"
                  cdkDrag
                />
              }
            </div>
          </div>

          <!-- Segundo contenedor (Done) -->
          <div
            class="mr-[25px] mb-[25px] inline-block w-[400px] max-w-full align-top"
          >
            <h2 class="mb-2 text-xl font-semibold">Done</h2>
            <div
              cdkDropList
              [cdkDropListData]="ingredientesSeleccionados"
              class="min-h-[60px] overflow-hidden rounded border border-gray-300 bg-white"
              (cdkDropListDropped)="drop($event)"
            >
              @for (item of ingredientesSeleccionados; track item) {
                <img
                  class="flex size-50 cursor-move flex-row items-center justify-between border-b border-gray-300 bg-white p-[20px_10px] text-sm text-black/87"
                  [src]="item.imagen"
                  cdkDrag
                />
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .example-container {
        width: 400px;
        max-width: 100%;
        margin: 0 25px 25px 0;
        display: inline-block;
        vertical-align: top;
      }

      .example-list {
        border: solid 1px #ccc;
        min-height: 60px;
        background: white;
        border-radius: 4px;
        overflow: hidden;
        display: block;
      }

      .example-box {
        padding: 20px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        cursor: move;
        background: white;
        font-size: 14px;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow:
          0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14),
          0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .example-box:last-child {
        border: none;
      }

      .example-list.cdk-drop-list-dragging
        .example-box:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
  imports: [Headers, CdkDropListGroup, CdkDropList, CdkDrag],
})
export class WorkshopGamePage {
  public imgIngredientes: any[] = [];
  public ingredientesSeleccionados: any[] = [];
  public servicioIngredientes = inject(IngredientesService);

  constructor() {
    this.servicioIngredientes.obtener().subscribe(({ ingredientes }) => {
      this.imgIngredientes = ingredientes;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
