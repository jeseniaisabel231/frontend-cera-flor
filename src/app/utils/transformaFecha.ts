export function transformaFecha(fecha: string): string {
    if(!fecha) return 'No registrada';
    const fechaObj = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(fechaObj);
}