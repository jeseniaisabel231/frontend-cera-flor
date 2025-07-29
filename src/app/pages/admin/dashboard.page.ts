import { Component, inject, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from '../../../services/admin/graficas.service';
import { Presentation } from '../../components/admin/presentation.component';
import { Navegacion } from '../../components/navegacion.component';
@Component({
  imports: [Navegacion, Presentation, BaseChartDirective],
  template: `
    <div class="flex min-h-dvh w-full bg-[#efecff]">
      <navegacion></navegacion>
      <!-- Contenido principal -->

      <div class="grid w-full grid-cols-3 gap-4 border-l border-[#d0c9fe] p-6">
        <presentation titulo="Dashboard" class="col-span-3"></presentation>

        <div class="col-span-1 row-start-2 rounded-[18px] bg-white px-10 py-4">
          <h3 class="mb-2 text-center text-[17px] font-semibold">Clientes</h3>
          @if (!cargaClientes()) {
            <div class="mt-8 flex justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="41"
                viewBox="0 0 48 41"
                fill="none"
              >
                <path
                  d="M32.143 30.646v-2.158c2.912-1.624 5.286-5.67 5.286-9.719C37.429 12.27 37.429 7 29.5 7s-7.929 5.27-7.929 11.77c0 4.048 2.374 8.094 5.286 9.718v2.158C17.893 31.37 11 35.73 11 41h37c0-5.27-6.893-9.63-15.857-10.354"
                  fill="#3C3C3B"
                />
                <path
                  d="M13.506 32.499c2.283-1.478 5.123-2.6 8.248-3.285a15 15 0 0 1-1.672-2.411 14.8 14.8 0 0 1-1.918-7.188c0-3.515 0-6.836 1.263-9.554 1.226-2.636 3.432-4.27 6.573-4.883C25.302 2.053 23.442 0 18.494 0c-7.926 0-7.926 5.27-7.926 11.77 0 4.048 2.373 8.094 5.284 9.718v2.158C6.89 24.37 0 28.73 0 34h11.517a17 17 0 0 1 1.989-1.499z"
                  fill="#3C3C3B"
                />
              </svg>
              <p class="text-4xl font-bold" data-testid="total-clientes">
                {{ numeroUsuarios() }}
                <span class="ml-1 text-base font-normal">clientes</span>
              </p>
            </div>
          } @else {
            <div class="mt-8 flex animate-spin justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2c2c2c"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                  opacity=".5"
                />
                <path
                  fill="#2c2c2c"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                ></path>
              </svg>
            </div>
          }
        </div>

        <div class="col-span-1 row-start-2 rounded-[18px] bg-white px-10 py-4">
          <h3 class="mb-2 text-center text-[17px] font-semibold">Ventas</h3>
          @if (!cargaVentas()) {
            <div class="mt-8 flex justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="41"
                viewBox="0 0 38 41"
                fill="none"
              >
                <path
                  d="M37.146 12.575a2.9 2.9 0 0 0-2.07-.86h-5.845V10.25a10.26 10.26 0 0 0-2.997-7.248 10.22 10.22 0 0 0-14.468 0 10.26 10.26 0 0 0-2.997 7.248v1.464H2.923a2.92 2.92 0 0 0-2.067.858A2.93 2.93 0 0 0 0 14.642v19.769C0 37.98 3.014 41 6.577 41h24.846a6.6 6.6 0 0 0 4.611-1.88A6.36 6.36 0 0 0 38 34.524V14.643a2.9 2.9 0 0 0-.854-2.068m-11.159 9.572-8.185 10.25a1.46 1.46 0 0 1-1.117.55h-.023a1.46 1.46 0 0 1-1.111-.513l-3.508-4.107a1.464 1.464 0 0 1 2.222-1.904l2.36 2.763 7.08-8.869a1.462 1.462 0 0 1 2.595.753c.043.386-.069.774-.311 1.077zm.32-10.433H11.693V10.25a7.33 7.33 0 0 1 2.14-5.177 7.3 7.3 0 0 1 10.335 0 7.33 7.33 0 0 1 2.14 5.177z"
                  fill="#3C3C3B"
                />
              </svg>
              <p class="text-4xl font-bold" data-testid="total-ventas">
                {{ numeroVentas() }}
                <span class="ml-1 text-base font-normal">productos</span>
              </p>
            </div>
          } @else {
            <div class="mt-8 flex animate-spin justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2c2c2c"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                  opacity=".5"
                />
                <path
                  fill="#2c2c2c"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                ></path>
              </svg>
            </div>
          }
        </div>
        <div class="col-span-1 row-start-2 rounded-[18px] bg-white px-10 py-6">
          <h3 class="mb-2 text-center text-[17px] font-semibold">Productos</h3>
          @if (!cargaProductos()) {
            <div class="mt-8 flex justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
              >
                <path
                  d="M20.5 0C9.196 0 0 9.196 0 20.5S9.196 41 20.5 41 41 31.804 41 20.5 31.804 0 20.5 0m4.75 11.967 2.375 2.076-7.255 8.288-2.375-2.273zM14.185 29.038l-6.954-6.961 2.23-2.23 6.956 6.96zm6.407.078-7.035-7.04 2.231-2.229 4.648 4.653 10.953-12.533 2.375 2.076z"
                  fill="#3C3C3B"
                />
              </svg>
              <p class="text-4xl font-bold" data-testid="total-productos">
                {{ productosVendidos() }}
                <span class="text-base font-normal">productos activos</span>
              </p>
            </div>
          } @else {
            <div class="mt-8 flex animate-spin justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2c2c2c"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                  opacity=".5"
                />
                <path
                  fill="#2c2c2c"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                ></path>
              </svg>
            </div>
          }
        </div>
        <div class="col-span-3 row-span-4">
          <div class="grid grid-cols-5 gap-4">
            <div
              class="col-span-3 flex h-[340px] w-full justify-center rounded-[18px] bg-white p-4"
            >
              <canvas
                chartId="ingresos"
                baseChart
                [data]="datos()"
                [options]="opciones()"
                [type]="'line'"
                data-testid="ingresos-canvas"
              ></canvas>
            </div>
            <div
              class="col-span-2 flex h-[340px] w-full justify-center rounded-[18px] bg-white"
            >
              <div class="p-4">
                <canvas
                  chartId="productos"
                  baseChart
                  [data]="datosProductos()"
                  [options]="opcionesProductos()"
                  [type]="'doughnut'"
                  data-testid="productos-canvas"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardPage {
  public dashboardServicio = inject(DashboardService);
  public mostrar = signal<boolean>(true);

  // Datos para las gráficas
  public datosVentas = signal<any>({});
  public numeroUsuarios = signal<number>(0);
  public productosVendidos = signal<number>(0);
  public numeroVentas = signal<number>(0);
  public cargaGraficas = signal<boolean>(true);
  public cargaClientes = signal<boolean>(true);
  public cargaVentas = signal<boolean>(true);
  public cargaProductos = signal<boolean>(true);

  public datos = signal<any>({
    labels: [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ],
  });

  public opciones = signal<any>({
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'INGRESOS SEMANALES',
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            // context.formattedValue es el valor mostrado
            return 'Ingresos de $' + context.formattedValue;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          border: {
            dash: [50, 5], // Línea punteada en eje X
          }, // Línea punteada en eje X
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
        },
        ticks: {
          // Aquí agregas el prefijo de dólar
          callback: function (value: number | string) {
            return '$' + value;
          },
        },
      },
    },
  });

  public datosProductos = signal<any>({
    labels: ['Jabones Artesanales', 'Velas Artesanales'],
    datasets: [
      {
        label: 'Productos Vendidos',
        data: [Math.random() * 100, Math.random() * 100],
        backgroundColor: ['#3c3c3b', '#626260'],
      },
    ],
  });
  public opcionesProductos = signal<any>({
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'PRODUCTOS VENDIDOS',
        with: '200px',
      },
    },
  });

  constructor() {
    this.dashboardServicio
      .obtenerVentas()
      .subscribe({
        next: (data) => {
          const ventaSemanaPasada: number[] = [];
          const ventaSemanaActual: number[] = [];
          const productosVendidos: number[] = [];
          const categorias: string[] = [];
          const dias: string[] = [];

          data.ventasDiarias.forEach((element, index: number) => {
            const [dia, mes, anio] = element.fecha.split('/').map(Number);
            const fecha = new Date(anio, mes - 1, dia);
            const diaSemana = new Intl.DateTimeFormat('es-EC', {
              weekday: 'short',
            }).format(fecha);
            if (index < 7) {
              dias.push(diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1));
              ventaSemanaPasada.push(element.totalVentas);
            } else {
              ventaSemanaActual.push(element.totalVentas);
            }
          });

          this.datos.set({
            labels: dias,
            datasets: [
              {
                label: 'Semana Pasada',
                data: ventaSemanaPasada,
                fill: true,
                borderColor: '#626260',
                backgroundColor: 'rgba(255, 187, 120, 0.2)',
                tension: 0.18,
                borderDash: [5, 5],
              },
              {
                label: 'Semana Actual',
                data: ventaSemanaActual,
                fill: true,
                borderColor: '#3c3c3b',
                backgroundColor: 'rgba(44, 160, 44, 0.2)',
                tension: 0.18,
                borderDash: [5, 5],
              },
            ],
          });
          data.ventasPorCategoria.forEach((element) => {
            productosVendidos.push(element.vendidos);
            categorias.push(element.categoría);
          });
          this.datosProductos.set({
            labels: categorias,
            datasets: [
              {
                label: 'Productos Vendidos',
                data: productosVendidos,
                backgroundColor: ['#9F93E7', '#9fd6cf'],
              },
            ],
          });
        },
      })
      .add(() => this.cargaGraficas.set(false));

    this.dashboardServicio
      .obtenerProductos()
      .subscribe({
        next: (data) => {
          this.productosVendidos.set(data.totalProductos);
        },
      })
      .add(() => this.cargaProductos.set(false));
    this.dashboardServicio
      .obtenerUsuarios()
      .subscribe({
        next: (data) => {
          this.numeroUsuarios.set(data.totalClientes);
        },
      })
      .add(() => this.cargaClientes.set(false));
    this.dashboardServicio
      .obtenerTodasLasVentas()
      .subscribe({
        next: (data) => {
          this.numeroVentas.set(data.totalVentas);
        },
      })
      .add(() => this.cargaVentas.set(false));
  }
}
