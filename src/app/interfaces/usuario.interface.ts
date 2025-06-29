export interface usuario {
  _id: string;
  nombre: string;
  apellido: string;
  imagen?: string;
  email: string;
  genero: string;
  estado: string;
  telefono?: string;
  direccion?: string;
  cedula?: string;
  fecha_nacimiento?: string;
}

export interface ColumnasUsuario {
  claves: (keyof usuario)[]; // Claves de las propiedades del usuario como viene en el backend
  nombres: string[]; // Nombres formateados para mostrar en la tabla
}