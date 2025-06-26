import { usuario } from "./usuario.interface";

export interface venta{
    cliente_id: usuario,
    _id: string,
    id_usuario: string,
    estado: string,
    id_producto: string,
    fecha: string,
    cantidad: number,
    total: number,
    nombre_usuario: string,
    nombre_producto: string,
    precio_producto: number
}