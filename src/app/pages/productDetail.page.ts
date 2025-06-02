import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { Headers } from '../components/header.component';
import { Footeer } from '../components/footer.component';
import { Card } from '../components/card.component';
import { ProductosService } from '../../services/admin/productos.service';
import { producto } from '../interfaces/producto.interface';
import { BarranavComponent } from '../components/barranav.component';
import { ProductDetailsComponent } from '../components/productDetails.component';
import { environment } from '../../environments/environment';
import { httpResource } from '@angular/common/http';

@Component({
  imports: [Headers, Footeer, Card, BarranavComponent, ProductDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <headers [(nuevaCantidad)]="nuevaCantidad"></headers>
    <main class="flex flex-col">
      <barranav rutaSeccionSeleccionada="catalogo"
        [rutaCategoriaSeleccionada]="productoResource.value()?.producto?.id_categoria.nombre"
        [rutaProductoSeleccionado]="productoResource.value()?.producto?.nombre"
        class="mb-4"
      ></barranav>
      <!-- Producto principal -->
      <section class="bg-green-100 rounded-2xl  py-10 ">
        <product-details [productoResource]="productoResource"></product-details>
      </section>

      <!-- Productos recomendados -->
      <section class="py-10">
        <div class="max-w-6xl mx-auto px-4">
          <h2
            class="text-center text-[20px] sm:text-2xl font-semibold mb-8 font-playfair"
          >
            Productos Recomendados
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            @for(producto of productos(); track producto._id){

            <card [producto]="producto" (emitirCantidad)="recibirCantidad($event)"></card>
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
  public producto_id = linkedSignal(() => this.id());
  public nuevaCantidad = signal(0);

  public serviceProductos = inject(ProductosService);
  public productos = signal<producto[]>([]);
  ngOnInit() {
    this.obtenerProductos(1);
    console.log('ID del producto:', this.producto_id());
  }
  private obtenerProductos(numeroPagina: number) {
    this.serviceProductos.obtener(numeroPagina).subscribe({
      next: (respuesta: any) => {
        console.log('Respuesta del backend:', respuesta);
        this.productos.set(respuesta.productos);
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }
  public productoResource = httpResource<any>(
    () => `${environment.urlApi}/api/productos/${this.id()}`,

    {
      defaultValue: {} as producto,
    }
  );
  recibirCantidad(cantidad: number) {
    this.nuevaCantidad.set(cantidad)
  }
}
