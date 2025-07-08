
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ShoppingCardPage } from './shoppingCart.page';
// import { CarritoService } from '../../services/carrito.service';
// import { CategoryService } from '../../services/categorias.service';
// import { of } from 'rxjs';
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

// describe('ShoppingCardPage', () => {
//   let component: ShoppingCardPage;
//   let fixture: ComponentFixture<ShoppingCardPage>;
//   let carritoServiceMock: any;
//   let categoryServiceMock: any;

//   beforeEach(async () => {
//     carritoServiceMock = {
//       carrito: vi.fn().mockReturnValue({ productos: [], total: 0 }),
//       vaciarCarrito: vi.fn().mockReturnValue(of({})),
//       modificarCantidadCarrito: vi.fn().mockReturnValue(of({})),
//       eliminarCarrito: vi.fn().mockReturnValue(of({})),
//       carga: vi.fn().mockReturnValue(false),
//     };
//     categoryServiceMock = {
//       categorias: vi.fn().mockReturnValue([]),
//     };

//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, HttpClientTestingModule, ShoppingCardPage],
//       providers: [
//         { provide: CarritoService, useValue: carritoServiceMock },
//         { provide: CategoryService, useValue: categoryServiceMock },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ShoppingCardPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call incrementarCantidad method', () => {
//     vi.spyOn(component, 'incrementarCantidad');
//     component.incrementarCantidad('1', 'normal');
//     expect(component.incrementarCantidad).toHaveBeenCalledWith('1', 'normal');
//   });

//   it('should call decrementarCantidad method', () => {
//     vi.spyOn(component, 'decrementarCantidad');
//     const producto = { producto_id: '1', cantidad: 2, tipo_producto: 'normal', producto: {} as any, precio_unitario: 10, subtotal: 20, disponible: 10 };
//     component.decrementarCantidad(producto, 'normal');
//     expect(component.decrementarCantidad).toHaveBeenCalledWith(producto, 'normal');
//   });

//   it('should call mostrarModalEliminar method', () => {
//     vi.spyOn(component, 'mostrarModalEliminar');
//     component.mostrarModalEliminar('1', 'normal');
//     expect(component.mostrarModalEliminar).toHaveBeenCalledWith('1', 'normal');
//     expect(component.mostrarModal()).toBe(true);
//   });

//   it('should call desicionModalVaciar method with true', () => {
//     vi.spyOn(component, 'desicionModalVaciar');
//     component.desicionModalVaciar(true);
//     expect(component.desicionModalVaciar).toHaveBeenCalledWith(true);
//   });

//   it('should call desicionModalVaciar method with false', () => {
//     vi.spyOn(component, 'desicionModalVaciar');
//     component.desicionModalVaciar(false);
//     expect(component.desicionModalVaciar).toHaveBeenCalledWith(false);
//   });
// });
