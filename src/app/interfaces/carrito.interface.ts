import { producto } from "./producto.interface";

export interface carrito {
  _id: string;
  cliente_id: string;
  productos:carritoProducto[];
  estado: string;
  total: number;
}
export interface carritoProducto {
  producto_id: producto;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  disponible: number;
}
