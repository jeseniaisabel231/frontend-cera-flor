
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
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProductDetailPage } from './productDetail.page';
// import { ProductosService } from '../../services/admin/productos.service';
// import { of } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
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

// describe('ProductDetailPage', () => {
//   let component: ProductDetailPage;
//   let fixture: ComponentFixture<ProductDetailPage>;
//   let productosServiceMock: any;

//   beforeEach(async () => {
//     productosServiceMock = {
//       productos: vi.fn().mockReturnValue([]),
//     };

//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, HttpClientTestingModule, ProductDetailPage],
//       providers: [
//         { provide: ProductosService, useValue: productosServiceMock },
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: { paramMap: { get: () => '1' } }, // Mock ActivatedRoute
//             params: of({ id: '1' })
//           }
//         },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProductDetailPage);
//     component = fixture.componentInstance;
//     fixture.componentRef.setInput('id', '1');
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have an id', () => {
//     expect(component.id).toBe('1');
//   });

//   it('should call recibirCantidad method', () => {
//     vi.spyOn(component, 'recibirCantidad');
//     component.recibirCantidad(5);
//     expect(component.recibirCantidad).toHaveBeenCalledWith(5);
//     expect(component.cantidadProducto()).toBe(5);
//   });
// });
