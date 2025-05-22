import { Component, inject, OnInit, signal } from '@angular/core';
import { Headers } from '../components/header.component';
import { Footeer } from '../components/footer.component';
import { Card } from '../components/card.component';
import { ProductosService } from '../../services/admin/productos.service';
import { producto } from '../interfaces/producto.interface';
import { BarranavComponent } from '../components/barranav.component';
import { ProductDetailsComponent } from '../components/productDetails.component';

@Component({
  imports: [Headers, Footeer, Card, BarranavComponent, ProductDetailsComponent],

  template: `
    <headers></headers>
    <main class="flex flex-col">
      <barranav></barranav>
      <!-- Producto principal -->
      <section class="bg-green-100 rounded-2xl  py-10 ">
        <product-details></product-details>
      </section>

      <!-- Productos recomendados -->
      <section class="py-10">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          @for(producto of productos; track producto._id){

          <card [producto]="producto"></card>
          }
        </div>
      </section>
    </main>
    <footeer></footeer>
  `,
})
export class ProductDetailPage {
  public serviceProductos = inject(ProductosService);
  public productosFiltrados: producto[] = [];
  public productos: producto[] = [];
  ngOnInit() {
    this.obtenerProductos(1);
  }
  private obtenerProductos(numeroPagina: number) {
    this.serviceProductos.obtener(numeroPagina).subscribe({
      next: (respuesta: any) => {
        console.log('Respuesta del backend:', respuesta);
        this.productos = respuesta.productos;
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }
}
