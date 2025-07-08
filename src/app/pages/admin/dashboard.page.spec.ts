
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { signal, output } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DashboardPage } from './dashboard.page';
// import { DashboardService } from '../../../services/admin/graficas.service';
// import { of } from 'rxjs';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BaseChartDirective } from 'ng2-charts';
// import { ActivatedRoute } from '@angular/router';
// import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
// import { signal, output } from '@angular/core';

// class MockModalAvisosComponent {
//   mostrarModal = signal(false);
//   titulo = signal('');
//   mensaje = signal('');
//   tipo = signal('exito');
//   confirmar = output();
//   decision = output();
//   reload = signal(false);
//   close = vi.fn();
//   realizarDecision = vi.fn();
// }

// describe('DashboardPage', () => {
//   let component: DashboardPage;
//   let fixture: ComponentFixture<DashboardPage>;
//   let dashboardServiceMock: any;

//   beforeEach(async () => {
//     dashboardServiceMock = {
//       obtenerVentas: vi.fn().mockReturnValue(of({ ventasDiarias: [], ventasPorCategoria: [] })),
//       obtenerProductos: vi.fn().mockReturnValue(of({ totalProductos: 0 })),
//       obtenerUsuarios: vi.fn().mockReturnValue(of({ totalClientes: 0 })),
//       obtenerTodasLasVentas: vi.fn().mockReturnValue(of({ totalVentas: 0 })),
//     };

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, DashboardPage, BaseChartDirective],
//       providers: [
//         { provide: DashboardService, useValue: dashboardServiceMock },
//         { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(DashboardPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call dashboardService methods on init', () => {
//     expect(dashboardServiceMock.obtenerVentas).toHaveBeenCalled();
//     expect(dashboardServiceMock.obtenerProductos).toHaveBeenCalled();
//     expect(dashboardServiceMock.obtenerUsuarios).toHaveBeenCalled();
//     expect(dashboardServiceMock.obtenerTodasLasVentas).toHaveBeenCalled();
//   });
// });
