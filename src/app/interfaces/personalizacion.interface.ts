import { ingrediente } from './ingrediente.interface';

export interface productoPersonalizado {
  _id: string;
  cliente_id: string;
  ingredientes: ingrediente[];
  id_categoria: string;
  precio: number;
  aroma: string;
  createdAt: string;
  updatedAt: string;
  imagen: string;
}
