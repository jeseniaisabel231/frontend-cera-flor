import { categorias } from './categoria.interface';
import { ingrediente } from './ingrediente.interface';
export interface personalizacion {
  _id: string
  cliente_id: string
  ingredientes: ingrediente[]
  id_categoria: categorias
  precio: number
  imagen: string
  aroma: string
  tipo_producto: 'piel grasa' | 'piel seca' | 'piel mixta' | 'decorativa' | 'aromatizante' | 'humidificación';
  createdAt?: Date;
  updatedAt?: Date;
}