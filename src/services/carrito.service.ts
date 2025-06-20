import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { carrito, carritoProducto } from '../app/interfaces/carrito.interface';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  public carrito: carrito = {
    _id: '',
    cliente_id: '',
    productos: [],
    estado: '',
    total: 0,
  };
  private http = inject(HttpClient);
  private urlBackend = environment.urlApi;
  public serviceAuth = inject(AuthService);
  public cantidadProductos = 0;

  constructor() {
    this.obtenerCarrito().subscribe({
      next: ({ carrito }) => {
        this.carrito = carrito;
        this.cantidadProductos = carrito?.productos?.length ?? 0; // Inicializa la cantidad de productos
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      },
    })
  }

  get obtenerCantidadProductos() {
    return this.cantidadProductos;
  }

  obtenerCarrito() {
    if (!this.serviceAuth.estadoAutenticacion) {
      const carritoLocalString = localStorage.getItem('carrito');

      if (carritoLocalString) {
        const carritoLocal = JSON.parse(carritoLocalString) as carrito;
        this.carrito = carritoLocal;
        this.cantidadProductos = carritoLocal.productos.length ?? 0;
      }

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
        tap(({ carrito }) => {
          this.carrito = carrito;
          this.cantidadProductos = carrito?.productos?.length ?? 0; // Actualiza la cantidad de productos
        }),
      );
  }
  agregarCarrito(producto: any, cantidad: number = 1) {
    if (!this.serviceAuth.estadoAutenticacion) {
      const productoExistente = this.carrito.productos.find(
        (item: any) => item.producto_id?._id === producto._id,
      );

      if (productoExistente) {
        // Si el producto ya existe, solo se incrementa la cantidad
        productoExistente.cantidad += cantidad;
      } else {
        this.carrito.productos.push({
          producto_id: producto,
          cantidad,
        } as carritoProducto); // TODO: Revisar el funcionamiento luego
        this.cantidadProductos += 1; // Incrementa la cantidad de productos en el carrito
      }
      this.carrito.total += producto.precio * cantidad; // Actualiza el total del carrito
      localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Guarda el carrito actualizado en el almacenamiento local

      return of({
        carrito: this.carrito,
        msg: 'Producto agregado al carrito local',
      });
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
        tap(({ carrito }) => {
          this.carrito = carrito; // Actualiza el carrito con la respuesta del backend
          this.cantidadProductos = carrito?.productos?.length ?? 0; // Actualiza la cantidad de productos
        }),
      );
  }
  vaciarCarrito() {
    if (!this.serviceAuth.estadoAutenticacion) {
      this.carrito = {
        _id: '',
        cliente_id: '',
        productos: [],
        estado: '',
        total: 0,
      }; // Resetea el carrito local
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
        tap(() => {
          this.carrito = {
            _id: '',
            cliente_id: '',
            productos: [],
            estado: '',
            total: 0,
          }; // Resetea el carrito
          this.cantidadProductos = 0; // Resetea la cantidad de productos en el carrito
        }),
      );
  }
  eliminarCarrito(producto_id: string) {
    if (!this.serviceAuth.estadoAutenticacion) {
      const productoIndice = this.carrito.productos.findIndex(
        (producto: any) => producto.producto_id._id === producto_id,
      );
      const productoEliminado = this.carrito.productos[productoIndice];

      this.carrito.productos.splice(productoIndice, 1); // Elimina el producto del carrito

      this.carrito.total -=
        productoEliminado.producto_id.precio * productoEliminado.cantidad; // Actualiza el total del carrito

      localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualiza el carrito en el almacenamiento local

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
          this.cantidadProductos -= 1; // Decrementa la cantidad de productos en el carrito
          const productoIndice = this.carrito.productos.findIndex(
            (producto: any) => producto.producto_id._id === producto_id,
          );
          if (productoIndice !== -1) {
            const productoEliminado = this.carrito.productos[productoIndice];
            this.carrito.total -=
              productoEliminado.producto_id.precio * productoEliminado.cantidad; // Actualiza el total del carrito
            this.carrito.productos.splice(productoIndice, 1); // Elimina el producto del carrito
          }
        }),
      );
  }

  modificarCantidadCarrito(producto_id: string, cantidad: number) {
    if (!this.serviceAuth.estadoAutenticacion) {
      const productoIndice = this.carrito.productos.findIndex(
        (producto: any) => producto.producto_id._id === producto_id,
      );

      if (productoIndice !== -1) {
        const productoExistente = this.carrito.productos[productoIndice];

        this.carrito.productos[productoIndice].cantidad += cantidad;
        this.carrito.total += productoExistente.producto_id.precio * cantidad; // Actualiza el total del carrito
      }

      localStorage.setItem('carrito', JSON.stringify(this.carrito)); // Actualiza el carrito en el almacenamiento local

      return of({
        carrito: this.carrito,
        msg: 'Cantidad modificada en el carrito local',
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
        tap(() => {
          const indiceProducto = this.carrito.productos.findIndex(
            (producto: any) => producto.producto_id._id === producto_id,
          );
          if (indiceProducto !== -1) {
            const productoExistente = this.carrito.productos[indiceProducto];

            this.carrito.productos[indiceProducto].cantidad += cantidad;
            this.carrito.total +=
              productoExistente.producto_id.precio * cantidad; // Actualiza el total del carrito
          }
        }),
      );
  }
}
