import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of, tap } from 'rxjs';
import { carrito, carritoProducto } from '../app/interfaces/carrito.interface';
import { decodificarToken } from '../app/utils/decodificarToken';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private http = inject(HttpClient);
  private urlBackend = environment.urlApi;
  private estaAutenticado = decodificarToken()?.exp * 1000 > Date.now();

  public carga = signal<boolean>(true);
  public cantidadProductos = signal<number>(0);
  public carrito = signal<carrito>({
    _id: '',
    cliente_id: '',
    productos: [],
    estado: '',
    total: 0,
  });

  constructor() {
    this.obtenerCarrito()
      .subscribe()
      .add(() => this.carga.set(false));
  }

  obtenerCarrito() {
    if (!this.estaAutenticado) {
      const carritoLocalString = localStorage.getItem('carrito');

      if (carritoLocalString && carritoLocalString !== 'undefined') {
        const carritoLocal = JSON.parse(carritoLocalString);
        this.carrito.set(carritoLocal);
        this.cantidadProductos.set(carritoLocal?.productos?.length ?? 0);
      }

      return of({
        carrito: this.carrito(),
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
          this.carrito.set(carrito);
          this.cantidadProductos.set(carrito?.productos?.length ?? 0);
        }),
      );
  }

  agregarCarrito(
    producto: any,
    cantidad: number = 1,
    estaAutenticado: boolean = this.estaAutenticado,
    tipo_producto: string = 'normal',
  ) {
    const productoExistente = this.carrito().productos.find(
      (item: any) => item.producto_id === producto._id,
    );

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      this.carrito.update((carrito) => ({
        ...carrito,
        productos: [
          ...carrito.productos,
          {
            producto_id: producto._id,
            cantidad,
            precio_unitario: producto.precio,
            producto,
          } as carritoProducto,
        ],
      }));
      this.cantidadProductos.update((count) => count + 1); // Incrementa la cantidad de productos en el carrito
    }
    this.carrito.update((carrito) => ({
      ...carrito,
      total: carrito.total + producto.precio * cantidad, // Actualiza el total del carrito
    }));

    if (!estaAutenticado) {
      localStorage.setItem(
        'cantidadProductos',
        this.cantidadProductos().toString(),
      );

      localStorage.setItem('carrito', JSON.stringify(this.carrito()));

      return of({
        carrito: this.carrito(),
        msg: 'Producto agregado al carrito local',
      });
    }

    return this.http.put<any>(
      `${this.urlBackend}/api/carritos/agregar`,
      {
        producto_id: producto._id,
        cantidad,
        tipo_producto,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
  vaciarCarrito() {
    if (!this.estaAutenticado) {
      this.carrito.set({
        _id: '',
        cliente_id: '',
        productos: [],
        estado: '',
        total: 0,
      });
      this.cantidadProductos.set(0);
      localStorage.removeItem('carrito');

      return of({
        carrito: this.carrito(),
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
          this.carrito.set({
            _id: '',
            cliente_id: '',
            productos: [],
            estado: '',
            total: 0,
          });
          this.cantidadProductos.set(0);
        }),
      );
  }
  eliminarCarrito(producto_id: string, tipo_producto: string = 'normal') {
    if (!this.estaAutenticado) {
      const productoEliminado = this.carrito().productos.find(
        (producto: any) => producto.producto_id === producto_id,
      );

      this.carrito.update((carrito) => ({
        ...carrito,
        productos: carrito.productos.filter(
          (producto: any) => producto.producto_id !== producto_id,
        ),
        total:
          carrito.total -
          (productoEliminado?.precio_unitario ?? 0) *
            (productoEliminado?.cantidad ?? 1),
      }));

      this.cantidadProductos.update((count) => count - 1);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      return of({
        carrito: this.carrito(),
        msg: 'Producto eliminado del carrito local',
      });
    }

    return this.http
      .put<any>(
        `${this.urlBackend}/api/carritos/eliminar`,
        { producto_id, tipo_producto },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        tap((respuesta) => {
          this.carrito.update((carrito) => ({
            ...carrito,
            productos: carrito.productos.filter(
              (producto: any) => producto.producto_id !== producto_id,
            ),
            total: respuesta.carrito.total,
          }));
          this.cantidadProductos.update((count) => count - 1);
        }),
      );
  }

  modificarCantidadCarrito(
    producto_id: string,
    cantidad: number,
    tipo_producto: string = 'normal',
  ) {
    if (!this.estaAutenticado) {
      const producto = this.carrito().productos.find(
        (producto: any) => producto.producto_id === producto_id,
      );

      if (producto) {
        this.carrito.update((carrito) => ({
          ...carrito,
          productos: carrito.productos.map((item: any) =>
            item.producto_id === producto_id
              ? {
                  ...item,
                  cantidad: item.cantidad + cantidad,
                  precio_unitario: item.precio_unitario,
                  tipo_producto,
                }
              : item,
          ),
          total: carrito.total + producto.precio_unitario * cantidad,
        }));
      }

      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      return of({
        carrito: this.carrito(),
        msg: 'Cantidad modificada en el carrito local',
      });
    }
    return this.http
      .put<any>(
        `${this.urlBackend}/api/carritos/modificar-cantidad`,
        { producto_id, cantidad, tipo_producto },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(
        tap((respuesta) => {
          const producto = this.carrito().productos.find(
            (producto: any) => producto.producto_id === producto_id,
          );

          if (producto) {
            this.carrito.update((carrito) => ({
              ...carrito,
              productos: carrito.productos.map((item: any) =>
                item.producto_id === producto_id
                  ? {
                      ...item,
                      cantidad: item.cantidad + cantidad,
                      precio_unitario: item.precio_unitario,
                    }
                  : item,
              ),
              total: respuesta.carrito.total,
            }));
          }
        }),
      );
  }
}
