import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductosService } from '../../services/admin/productos.service';
import { BarranavComponent } from '../components/barranav.component';
import { Card } from '../components/card.component';
import { Footeer } from '../components/footer.component';
import { Headers } from '../components/header.component';
import { ProductDetailsComponent } from '../components/productDetails.component';
import { producto } from '../interfaces/producto.interface';

@Component({
  imports: [Headers, Footeer, Card, BarranavComponent, ProductDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <headers></headers>
    <main class="flex flex-col">
      <barranav
        rutaSeccionSeleccionada="catalogo"
        [rutaCategoriaSeleccionada]="
          productoResource.value()?.producto?.id_categoria.nombre
        "
        [rutaProductoSeleccionado]="productoResource.value()?.producto?.nombre"
        class="mb-4"
      ></barranav>
      <!-- Producto principal -->
      <section class="rounded-2xl bg-green-100 py-10">
        <product-details
          [productoResource]="productoResource"
        ></product-details>
      </section>

      <!-- Productos recomendados -->
      <section class="py-10">
        <div class="mx-auto max-w-6xl px-4">
          <h2
            class="font-playfair mb-8 text-center text-[20px] font-semibold sm:text-2xl"
          >
            Productos Recomendados
          </h2>
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            @for (producto of recomendados(); track producto._id) {
              <card [producto]="producto"></card>
            }
          </div>
        </div>
      </section>
    </main>
    <footeer></footeer>
  `,
})
export class ProductDetailPage {
  public id = input.required(); //debe ser igual al param de la ruta
  public cantidadProducto = signal(0);
  public serviceProductos = inject(ProductosService);
  public recomendados = linkedSignal(() => {
    const id = this.id();
    if (id) {
      return this.serviceProductos
        .productos()
        .sort(
          () => Math.random() - 0.5, // Mezcla los productos aleatoriamente
        )
        .slice(0, 4);
    }
    return [];
  });

  public productoResource = httpResource<any>(
    () => `${environment.urlApi}/api/productos/${this.id()}`,
    {
      defaultValue: {} as producto,
    },
  );

  recibirCantidad(cantidad: number) {
    this.cantidadProducto.set(cantidad);
  }
}
