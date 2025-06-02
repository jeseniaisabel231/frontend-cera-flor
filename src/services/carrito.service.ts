import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { carrito } from '../app/interfaces/carrito.interface';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: carrito = {} as carrito; // Inicializa el carrito como un objeto vacío
  private http = inject(HttpClient);
  public serviceAuth = inject(AuthService);
  private urlBackend = environment.urlApi;
  public cantidadProductos = 0;

  obtenerCarrito() {
    if (!this.serviceAuth.estadoAutenticacion) {
      const carritoLocalString = localStorage.getItem('carrito');
      const carritoLocal = carritoLocalString
        ? JSON.parse(carritoLocalString)
        : {
            productos: [],
          };
      this.carrito = carritoLocal;
      this.cantidadProductos = carritoLocal.productos?.length ?? 0;
      console.log('Service Carrito local obtenido :', this.carrito);
      return of({
        carrito: this.carrito,
        msg: 'Carrito obtenido del almacenamiento local',
      });
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
          this.carrito = respuesta.carrito;
          this.cantidadProductos = respuesta.carrito?.productos?.length || 0;
          console.log('Carrito obtenido:', this.carrito);
        }),
      );
  }
  agregarCarrito(producto: any, cantidad: number = 1) {
    if (!this.serviceAuth.estadoAutenticacion) {
      console.log(this.carrito.productos);
      this.carrito.productos.push({ producto_id: producto, cantidad } as any); // TODO: Revisar el funcionamiento luego
      this.cantidadProductos += 1; // Incrementa la cantidad de productos en el carrito
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      return of({
        carrito: this.carrito,
        msg: 'Producto agregado al carrito local',
      });
    }

    return this.http
      .put<any>(
        `${this.urlBackend}/api/carritos/agregar`,
        {
          producto_id: producto.producto_id._id,
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
          this.carrito = respuesta.carrito;
          console.log('Producto agregado al carrito:', respuesta);
          this.cantidadProductos = this.cantidadProductos + 1; // Incrementa la cantidad de productos en el carrito
        }),
      );
  }
  vaciarCarrito() {
    if (!this.serviceAuth.estadoAutenticacion) {
      this.carrito = {} as carrito; // Resetea el carrito local
      this.cantidadProductos = 0; // Resetea la cantidad de productos en el carrito
      localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local
      return of({
        carrito: this.carrito,
        msg: 'Carrito local vaciado',
      });
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
          this.carrito = {} as carrito;
          console.log('Carrito vaciado:', respuesta);
          this.cantidadProductos = 0; // Resetea la cantidad de productos en el carrito
        }),
      );
  }
  eliminarCarrito(producto_id: string) {
    if (!this.serviceAuth.estadoAutenticacion) {
      const productosActualizados = this.carrito.productos.filter(
        (producto: any) => producto.producto_id._id !== producto_id,
      );
      this.carrito.productos = productosActualizados;
      this.cantidadProductos -= 1; // Decrementa la cantidad de productos en el carrito
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      console.log('Producto eliminado del carrito local:', producto_id);
      return of({
        carrito: this.carrito,
        msg: 'Producto eliminado del carrito local',
      });
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
          console.log('Producto eliminado del carrito:', respuesta);
          this.cantidadProductos -= 1; // Decrementa la cantidad de productos en el carrito
          const productosActualizados = this.carrito.productos.filter(
            (producto: any) => producto.producto_id._id !== producto_id,
          );
          this.carrito.productos = productosActualizados;
        }),
      );
  }
  modificarCantidadCarrito(producto_id: string, cantidad: number) {
    if (!this.serviceAuth.estadoAutenticacion) {
      const indiceProducto = this.carrito.productos.findIndex(
        (producto: any) => producto.producto_id._id === producto_id,
      );
      console.log('Índice del producto encontrado:', indiceProducto);
      if (indiceProducto !== -1) {
        this.carrito.productos[indiceProducto].cantidad += cantidad;
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        console.log(
          'Cantidad del producto modificada en el carrito local:',
          this.carrito,
        );
      }
      return of({
        carrito: this.carrito,
        msg: 'Cantidad del producto modificada en el carrito local',
      });
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
        tap((respuesta) => {
          console.log(
            'Cantidad del producto modificada en el carrito:',
            respuesta,
          );
          const indiceProducto = this.carrito.productos.findIndex(
            (producto: any) => producto.producto_id._id === producto_id,
          );
          console.log('Índice del producto encontrado:', indiceProducto);
          if (indiceProducto !== -1) {
            this.carrito.productos[indiceProducto].cantidad += cantidad;
          }
        }),
      );
  }
}
