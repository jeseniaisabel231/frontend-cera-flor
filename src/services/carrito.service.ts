import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of, tap } from 'rxjs';
import { carrito } from '../app/interfaces/carrito.interface';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  public carrito = signal<carrito>({
    _id: '',
    cliente_id: '',
    productos: [],
    estado: '',
    total: 0,
  }); // Inicializa el carrito como un objeto vacío
  private http = inject(HttpClient);
  public serviceAuth = inject(AuthService);
  private urlBackend = environment.urlApi;
  public cantidadProductos = signal(0);

  obtenerCarrito() {
    if (!this.serviceAuth.estadoAutenticacion) {
      const carritoLocalString = localStorage.getItem('carrito');
      if (carritoLocalString) {
        const carritoLocal = JSON.parse(carritoLocalString) as carrito;
        this.carrito.set(carritoLocal);
        this.cantidadProductos.set(carritoLocal.productos?.length ?? 0);
      }
      return of({
        carrito: this.carrito(),
        msg: 'Carrito obtenido del almacenamiento local',
      }).pipe(
        tap(() => {
          const carritoLocalString = localStorage.getItem('carrito');
          if (carritoLocalString) {
            const carritoLocal = JSON.parse(carritoLocalString) as carrito;
            this.carrito.set(carritoLocal);
            this.cantidadProductos.set(carritoLocal.productos?.length ?? 0);
          }
        }),
      );
    }

    return this.http
      .get<any>(`${this.urlBackend}/api/carritos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((respuesta) => {
          this.carrito.set(respuesta.carrito);
          this.cantidadProductos.set(respuesta.carrito?.productos?.length || 0);
          console.log('Carrito obtenido:', this.carrito);
        }),
      );
  }
  agregarCarrito(producto: any, cantidad: number = 1) {
    if (!this.serviceAuth.estadoAutenticacion) {
      return of({
        carrito: this.carrito(),
        msg: 'Producto agregado al carrito local',
      }).pipe(
        tap(() => {
          console.log(this.carrito().productos);
          this.carrito.update((carritoActual) => {
            const productoExistente = carritoActual.productos.find(
              (item: any) => item.producto_id?._id === producto._id,
            );
            if (productoExistente) {
              // Si el producto ya existe, solo se incrementa la cantidad
              productoExistente.cantidad += cantidad;
              console.log(
                'Producto existente en el carrito local:',
                productoExistente,
              );
            } else {
              carritoActual.productos.push({
                producto_id: producto,
                cantidad,
              } as any); // TODO: Revisar el funcionamiento luego
              this.cantidadProductos.update((count) => count + 1); // Incrementa la cantidad de productos en el carrito
            }
            carritoActual.total += producto.precio * cantidad; // Actualiza el total del carrito
            localStorage.setItem('carrito', JSON.stringify(carritoActual));
            return carritoActual;
          });
        }),
      );
    }

    return this.http
      .put<any>(
        `${this.urlBackend}/api/carritos/agregar`,
        {
          producto_id: producto._id,
          cantidad,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        tap((respuesta) => {
          this.carrito.set(respuesta.carrito);
          console.log('Producto agregado al carrito:', respuesta);
          this.cantidadProductos.update(
            (cantidadActual) => cantidadActual + 1, // Incrementa la cantidad de productos en el carrito
          );
        }),
      );
  }
  vaciarCarrito() {
    if (!this.serviceAuth.estadoAutenticacion) {
      return of({
        carrito: this.carrito(),
        msg: 'Carrito local vaciado',
      }).pipe(
        tap(() => {
          this.carrito.set({} as carrito); // Resetea el carrito local
          this.cantidadProductos.set(0); // Resetea la cantidad de productos en el carrito
          localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local
        }),
      );
    }

    return this.http
      .delete<any>(`${this.urlBackend}/api/carritos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((respuesta) => {
          this.carrito.set({} as carrito);
          console.log('Carrito vaciado:', respuesta);
          this.cantidadProductos.set(0); // Resetea la cantidad de productos en el carrito
        }),
      );
  }
  eliminarCarrito(producto_id: string) {
    if (!this.serviceAuth.estadoAutenticacion) {
      const carritoActual = this.carrito();
      const productoIndice = carritoActual.productos.findIndex(
        (producto: any) => producto.producto_id._id === producto_id,
      )
      const productoEliminado = carritoActual.productos[productoIndice];
      carritoActual.productos.splice(productoIndice, 1); // Elimina el producto del carrito
      carritoActual.total -= 
        productoEliminado.producto_id.precio * productoEliminado.cantidad; // Actualiza el total del carrito
      localStorage.setItem('carrito', JSON.stringify(carritoActual)); // Actualiza el carrito en el almacenamiento local


      console.log('Producto eliminado del carrito local:', producto_id);
      return of({
        carrito: carritoActual,
        msg: 'Producto eliminado del carrito local',
      }).pipe(
        tap((respuesta) => {

          this.interceptarEliminarProducto(respuesta, producto_id);
        }),
      );
    }
    return this.http
      .put<any>(
        `${this.urlBackend}/api/carritos/eliminar`,
        { producto_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        tap((respuesta) => {
          this.interceptarEliminarProducto(respuesta, producto_id);
        }),
      );
  }

  modificarCantidadCarrito(producto_id: string, cantidad: number) {
    if (!this.serviceAuth.estadoAutenticacion) {
      return of({
        carrito: this.carrito(),
        msg: 'Cantidad modificada en el carrito local',
      }).pipe(
        tap(() => {
          this.carrito.update((carritoActual) => {
            const productoIndice = carritoActual.productos.findIndex(
              (producto: any) => producto.producto_id._id === producto_id,
            );
            if (productoIndice !== -1) {
              carritoActual.productos[productoIndice].cantidad += cantidad;
              carritoActual.total +=
                carritoActual.productos[productoIndice].producto_id.precio *
                cantidad; // Actualiza el total del carrito
            }
            localStorage.setItem('carrito', JSON.stringify(carritoActual));
            return carritoActual;
          });
        }),
      );
    }
    return this.http
      .put<any>(
        `${this.urlBackend}/api/carritos/modificar-cantidad`,
        { producto_id, cantidad },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        tap(() => {
          
          this.carrito.update((carritoActual) => {
            const indiceProducto = carritoActual.productos.findIndex(
              (producto: any) => producto.producto_id._id === producto_id,
            );
            if (indiceProducto !== -1) {
              carritoActual.productos[indiceProducto].cantidad += cantidad;
              carritoActual.total +=
                carritoActual.productos[indiceProducto].producto_id.precio *
                cantidad; // Actualiza el total del carrito
                console.log('Producto actualizado en el carrito:', carritoActual);
            }
            return carritoActual;
          });
        }),
      );
  }
  private interceptarEliminarProducto(respuesta: any, producto_id: string) {
    console.log('Producto eliminado del carrito:', respuesta);
    this.cantidadProductos.update(
      (cantidadProductos) => cantidadProductos - 1, // Decrementa la cantidad de productos en el carrito
    );
    this.carrito.update((carritoActual) => {
      const productoIndice = carritoActual.productos.findIndex(
        (producto: any) => producto.producto_id._id === producto_id,
      );
      if (productoIndice !== -1) {
        const productoEliminado = carritoActual.productos[productoIndice];
        carritoActual.total -=
          productoEliminado.producto_id.precio * productoEliminado.cantidad; // Actualiza el total del carrito
        carritoActual.productos.splice(productoIndice, 1); // Elimina el producto del carrito
      }
      return carritoActual;
    });
  }
}
