import { producto } from './producto.interface';
import { usuario } from './usuario.interface';

export interface venta {
  _id: string;
  cliente: Pick<usuario, '_id' | 'apellido' | 'email' | 'nombre'>;
  productos: productoInformacion[];
  total: number;
  fecha_venta: `${number}-${number}-${number}`;
  estado: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface productoInformacion {
  _id: string;
  producto_id: producto;
  cantidad: number;
  subtotal: number;
}

export interface ColumnasVenta {
  claves: (keyof venta)[]; // Claves de las propiedades del usuario como viene en el backend
  nombres: string[]; // Nombres formateados para mostrar en la tabla
}
