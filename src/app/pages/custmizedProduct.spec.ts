// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { signal } from '@angular/core';
// import { of } from 'rxjs';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { CustmizedProductPage } from './custmizedProduct.page';
// import { PersonalizationService } from '../../services/personalization.service';
// import { productoPersonalizado } from '../interfaces/personalizacion.interface';

// // Mock dependencies
// vi.mock('../../services/personalization.service');
// vi.mock('../components/header.component', () => ({
//   Headers: { template: '<div>Headers</div>' }
// }));
// vi.mock('../components/barranav.component', () => ({
//   BarranavComponent: { template: '<div>Barranav</div>' }
// }));
// vi.mock('../components/loading.component', () => ({
//   Loading: { template: '<div>Loading</div>' }
// }));
// vi.mock('../components/admin/modalavisos.component', () => ({
//   ModalAvisosComponent: { template: '<div>Modal Avisos</div>' }
// }));
// vi.mock('../components/modalResumenProducto.component', () => ({
//   ModalResumenProductoComponent: { template: '<div>Modal Resumen</div>' }
// }));

// describe('CustmizedProductPage', () => {
//   let component: CustmizedProductPage;
//   let fixture: ComponentFixture<CustmizedProductPage>;
//   let mockPersonalizationService: any;

//   const mockProducto: productoPersonalizado = {
//     _id: '123',
//     id_categoria: '680fd248f613dc80267ba5d7',
//     tipo_producto: 'personalizado',
//     imagen: 'test-image.jpg',
//     aroma: 'lavanda',
//     precio: 25.99,
//     updatedAt: new Date('2023-01-01'),
//     ingredientes: [
//       { tipo: 'esencia', nombre: 'lavanda' },
//       { tipo: 'esencia', nombre: 'eucalipto' }
//     ]
//   } as productoPersonalizado;

//   beforeEach(async () => {
//     mockPersonalizationService = {
//       carga: signal(false),
//       productosPersonalizados: signal([mockProducto]),
//       eliminarPersonalizacion: vi.fn().mockReturnValue(of({}))
//     };

//     await TestBed.configureTestingModule({
//       imports: [CustmizedProductPage],
//       providers: [
//         { provide: PersonalizationService, useValue: mockPersonalizationService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(CustmizedProductPage);
//     component = fixture.componentInstance;
//   });

//   describe('Component Initialization', () => {
//     it('should create', () => {
//       expect(component).toBeTruthy();
//     });

//     it('should initialize with default values', () => {
//       expect(component.mostrarResumen()).toBe(false);
//       expect(component.mostrarModal()).toBe(false);
//       expect(component.idEliminar()).toBe('');
//       expect(component.datos()).toEqual({} as productoPersonalizado);
//     });

//     it('should inject PersonalizationService', () => {
//       expect(component.servicePersonalizacion).toBeDefined();
//     });
//   });

//   describe('Template Rendering', () => {
//     it('should render loading component when carga is true', () => {
//       mockPersonalizationService.carga.set(true);
//       fixture.detectChanges();

//       const loadingElement = fixture.nativeElement.querySelector('loading');
//       expect(loadingElement).toBeTruthy();
//     });

//     it('should render products list when products exist', () => {
//       mockPersonalizationService.carga.set(false);
//       fixture.detectChanges();

//       const productArticles = fixture.nativeElement.querySelectorAll('article');
//       expect(productArticles.length).toBe(1);
//     });

//     it('should render empty state when no products exist', () => {
//       mockPersonalizationService.carga.set(false);
//       mockPersonalizationService.productosPersonalizados.set([]);
//       fixture.detectChanges();

//       const emptyMessage = fixture.nativeElement.querySelector('.col-span-2 p');
//       expect(emptyMessage?.textContent?.trim()).toBe('No tienes productos personalizados por el momento');
//     });

//     it('should render correct product category for jabones', () => {
//       fixture.detectChanges();

//       const categoryElement = fixture.nativeElement.querySelector('small');
//       expect(categoryElement?.textContent?.trim()).toBe('Jabones Artesanales');
//     });

//     it('should render correct product category for velas', () => {
//       const velaProducto = { ...mockProducto, id_categoria: 'other-category' };
//       mockPersonalizationService.productosPersonalizados.set([velaProducto]);
//       fixture.detectChanges();

//       const categoryElement = fixture.nativeElement.querySelector('small');
//       expect(categoryElement?.textContent?.trim()).toBe('Velas Artesanales');
//     });

//     it('should render correct product type for personalizado', () => {
//       fixture.detectChanges();

//       const titleElement = fixture.nativeElement.querySelector('h2');
//       expect(titleElement?.textContent?.trim()).toBe('Producto personalizado');
//     });

//     it('should render correct product type for IA', () => {
//       const iaProducto = { ...mockProducto, tipo_producto: 'ia' };
//       mockPersonalizationService.productosPersonalizados.set([iaProducto]);
//       fixture.detectChanges();

//       const titleElement = fixture.nativeElement.querySelector('h2');
//       expect(titleElement?.textContent?.trim()).toBe('Producto producto con IA');
//     });
//   });

//   describe('User Interactions', () => {
//     it('should call mostrarModalResumen when product is clicked', () => {
//       const spy = vi.spyOn(component, 'mostrarModalResumen');
//       fixture.detectChanges();

//       const productArticle = fixture.nativeElement.querySelector('article');
//       productArticle.click();

//       expect(spy).toHaveBeenCalledWith(mockProducto);
//     });

//     it('should call mostrarModalEliminar when delete button is clicked', () => {
//       const spy = vi.spyOn(component, 'mostrarModalEliminar');
//       fixture.detectChanges();

//       const deleteButton = fixture.nativeElement.querySelector('button[title="Eliminar producto"]');
//       deleteButton.click();

//       expect(spy).toHaveBeenCalledWith(mockProducto._id);
//     });

//     it('should stop propagation when delete button is clicked', () => {
//       const spy = vi.spyOn(component, 'mostrarModalResumen');
//       fixture.detectChanges();

//       const deleteButton = fixture.nativeElement.querySelector('button[title="Eliminar producto"]');
//       deleteButton.click();

//       expect(spy).not.toHaveBeenCalled();
//     });
//   });

//   describe('Modal Management', () => {
//     it('should set mostrarResumen to true and datos when mostrarModalResumen is called', () => {
//       component.mostrarModalResumen(mockProducto);

//       expect(component.mostrarResumen()).toBe(true);
//       expect(component.datos()).toEqual(mockProducto);
//     });

//     it('should set idEliminar and mostrarModal when mostrarModalEliminar is called', () => {
//       component.mostrarModalEliminar('test-id');

//       expect(component.idEliminar()).toBe('test-id');
//       expect(component.mostrarModal()).toBe(true);
//     });

//     it('should call eliminarPersonalizacion when recibirDecision is called with true', () => {
//       component.idEliminar.set('test-id');
//       component.recibirDecision(true);

//       expect(mockPersonalizationService.eliminarPersonalizacion).toHaveBeenCalledWith('test-id');
//     });

//     it('should not call eliminarPersonalizacion when recibirDecision is called with false', () => {
//       component.recibirDecision(false);

//       expect(mockPersonalizationService.eliminarPersonalizacion).not.toHaveBeenCalled();
//     });
//   });

//   describe('Helper Methods', () => {
//     it('should return correct essences from obtenerTipo', () => {
//       const ingredientes = [
//         { tipo: 'esencia', nombre: 'lavanda' },
//         { tipo: 'esencia', nombre: 'eucalipto' },
//         { tipo: 'colorante', nombre: 'azul' }
//       ];

//       const result = component.obtenerTipo(ingredientes, 'esencia');
//       expect(result).toBe('lavanda, eucalipto');
//     });

//     it('should return empty string when no matching ingredients', () => {
//       const ingredientes = [
//         { tipo: 'colorante', nombre: 'azul' }
//       ];

//       const result = component.obtenerTipo(ingredientes, 'esencia');
//       expect(result).toBe('');
//     });

//     it('should handle empty ingredients array', () => {
//       const result = component.obtenerTipo([], 'esencia');
//       expect(result).toBe('');
//     });
//   });

//   describe('Service Integration', () => {
//     it('should subscribe to eliminarPersonalizacion observable', () => {
//       const subscribeSpy = vi.fn();
//       mockPersonalizationService.eliminarPersonalizacion.mockReturnValue({
//         subscribe: subscribeSpy
//       });

//       component.idEliminar.set('test-id');
//       component.recibirDecision(true);

//       expect(subscribeSpy).toHaveBeenCalled();
//     });
//   });
// });