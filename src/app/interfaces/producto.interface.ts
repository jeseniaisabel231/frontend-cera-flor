export interface producto{
    _id: string,
    id_categoria : {_id:string, descripcion: string, imagen: string, nombre: string},
    nombre: string,
    descripcion: string,
    beneficios: string,
    caracteristicas: string,
    precio: number,
    stock: string,
    imagen: string,
    ingrediente: string,
    tipo: 'piel seca' | 'piel grasa' | 'piel mixta' | 'decorativa' | 'aromatizante' | 'humidificación',
    aroma: string,
}