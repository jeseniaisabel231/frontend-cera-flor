
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { producto } from '../../interfaces/producto.interface';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProductsPage } from './products.page';
// import { ProductosService } from '../../../services/admin/productos.service';
// import { CategoryService } from '../../../services/categorias.service';
// import { of } from 'rxjs';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule } from '@angular/forms';
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

// describe('ProductsPage', () => {
//   let component: ProductsPage;
//   let fixture: ComponentFixture<ProductsPage>;
//   let productosServiceMock: any;
//   let categoryServiceMock: any;

//   beforeEach(async () => {
//     productosServiceMock = {
//       datosBuscados: vi.fn().mockReturnValue([]),
//       filtro: vi.fn().mockReturnValue({ clave: 'nombre', valor: '' }),
//       carga: vi.fn().mockReturnValue(false),
//       eliminar: vi.fn().mockReturnValue(of({})),
//     };
//     categoryServiceMock = {
//       obtener: vi.fn().mockReturnValue(of({ categorias: [] })),
//     };

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, FormsModule, ProductsPage],
//       providers: [
//         { provide: ProductosService, useValue: productosServiceMock },
//         { provide: CategoryService, useValue: categoryServiceMock },
//         { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProductsPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call abrirFormRegistrar method', () => {
//     vi.spyOn(component, 'abrirFormRegistrar');
//     component.abrirFormRegistrar();
//     expect(component.abrirFormRegistrar).toHaveBeenCalled();
//     expect(component.mostrarModal()).toBe(true);
//     expect(component.accionAsignada()).toBe('Registrar');
//   });

//   it('should call abrirFormEditar method', () => {
//     const producto: producto = { _id: '1', nombre: 'Test', tipo: 'piel seca', imagen: '', precio: 10, stock: '10', id_categoria: { _id: '1', nombre: 'cat', descripcion: 'desc', imagen: '' }, descripcion: '', beneficios: '', caracteristicas: '', ingrediente: '', aroma: '' };
//     vi.spyOn(component, 'abrirFormEditar');
//     component.abrirFormEditar(producto);
//     expect(component.abrirFormEditar).toHaveBeenCalledWith(producto);
//     expect(component.mostrarModal()).toBe(true);
//     expect(component.accionAsignada()).toBe('Actualizar');
//   });

//   it('should call abrirModalEliminacion method', () => {
//     vi.spyOn(component, 'abrirModalEliminacion');
//     component.abrirModalEliminacion('1');
//     expect(component.abrirModalEliminacion).toHaveBeenCalledWith('1');
//     expect(component.mostrarModalConfirmacion()).toBe(true);
//   });

//   it('should call confirmarEliminacion method', () => {
//     vi.spyOn(component, 'confirmarEliminacion');
//     component.confirmarEliminacion();
//     expect(component.confirmarEliminacion).toHaveBeenCalled();
//   });
// });
