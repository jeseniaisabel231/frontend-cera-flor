export interface VentaDiaria {
  fecha: string;
  totalVentas: number;
}

export interface VentaPorCategoria {
  categoría: string;
  vendidos: number;
}

export interface GraficaVentas {
  numeroClientes: number;
  ventasDiarias: VentaDiaria[];
  ventasPorCategoria: VentaPorCategoria[];
}
