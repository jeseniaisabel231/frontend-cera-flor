import { producto } from "./producto.interface";

export interface carrito {
  _id: string;
  cliente_id: string;
  productos:carritoProducto[];
  estado: string;
  total: number;
}
export interface carritoProducto {
  producto: producto;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  disponible: number;
  producto_id: string;
}
