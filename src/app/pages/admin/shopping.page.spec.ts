
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ShoppingPage } from './shopping.page';
// import { VentasService } from '../../../services/admin/ventas.service';
// import { of } from 'rxjs';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
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

// describe('ShoppingPage', () => {
//   let component: ShoppingPage;
//   let fixture: ComponentFixture<ShoppingPage>;
//   let ventasServiceMock: any;

//   beforeEach(async () => {
//     ventasServiceMock = {
//       datosBuscados: vi.fn().mockReturnValue([]),
//       filtro: vi.fn().mockReturnValue(''),
//       carga: vi.fn().mockReturnValue(false),
//       busqueda: ''
//     };

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, FormsModule, ShoppingPage],
//       providers: [
//         { provide: VentasService, useValue: ventasServiceMock },
//         { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ShoppingPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have defined columns', () => {
//     expect(component.columnasTabla).toBeDefined();
//     expect(component.columnasTabla.claves.length).toBe(5);
//     expect(component.columnasTabla.nombres.length).toBe(5);
//   });
// });
