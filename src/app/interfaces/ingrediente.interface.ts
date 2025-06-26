import { categorias } from "./categoria.interface";

export interface ingrediente {
  _id: string;
  nombre: string;
  imagen: string;
  stock: number;
  id_categoria: categorias | string | string[];
  precio: number;
  tipo: string;
  createdAt?: string;
  updatedAt?: string;
}