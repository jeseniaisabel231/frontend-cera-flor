import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';
import { ProductosService } from '../../services/admin/productos.service';
import { CategoryService } from '../../services/categorias.service';
import { routes } from '../app.routes';
import { CatalogPage } from './catalog.page';
import { provideRouter } from '@angular/router';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('Página de Catálogo', () => {
  let component: CatalogPage;
  let fixture: ComponentFixture<CatalogPage>;
  let productService: ProductosService;
  let categoryService: CategoryService;

  const mockCategorias = [
    {
      _id: '1',
      nombre: 'Jabones Artesanales',
      imagen: 'jabon.jpg',
      descripcion: 'Jabones hechos a mano con ingredientes naturales.',
    },
    {
      _id: '2',
      nombre: 'Velas Artesanales',
      imagen: 'vela.jpg',
      descripcion: 'Velas aromáticas hechas a mano con cera natural.',
    },
  ];

  const mockProductos = [
    {
      _id: '1',
      nombre: 'Jabón de Lavanda',
      precio: 15.99,
      descripcion: 'Jabón natural de lavanda',
      imagen: 'jabon-lavanda.jpg',
      stock: 10,
      id_categoria: { nombre: 'Jabones Artesanales' },
    },
    {
      _id: '2',
      nombre: 'Vela de Vainilla',
      precio: 25.99,
      descripcion: 'Vela aromática de vainilla',
      imagen: 'vela-vainilla.jpg',
      stock: 5,
      id_categoria: { nombre: 'Velas Artesanales' },
    },
  ];

  // Mock de ActivatedRoute
  const mockActivatedRoute = {
    queryParams: of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogPage],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
        provideRouter(routes),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductosService);
    categoryService = TestBed.inject(CategoryService);

    // Mock del signal titulo para evitar errores de template
    vi.spyOn(component, 'titulo').mockReturnValue('categoria-test');

    // Mock console methods
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('Debería crearse la página de catálogo', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inicializar con valores por defecto', () => {
    expect(component.productos).toEqual([]);
    expect(component.categorias).toEqual([]);
    // Cambiado: El componente se inicializa con carga = false por defecto
    expect(component.carga()).toBe(false);
    expect(component.errorCarga()).toBe(false);
    expect(component.cantidadProducto()).toBe(0);
  });

  it('Debería cargar categorías al inicializar', () => {
    const spy = vi.spyOn(categoryService, 'obtener').mockReturnValue(
      of({ categorias: mockCategorias })
    );

    component.cargarCategorias();

    expect(spy).toHaveBeenCalled();
    expect(component.categorias).toEqual(mockCategorias);
  });

  it('Debería obtener productos y filtrarlos por categoría', () => {
    const spy = vi.spyOn(productService, 'obtener').mockReturnValue(
      of({ productos: mockProductos })
    );

    // Mock título signal
    vi.spyOn(component, 'titulo').mockReturnValue('jabones-artesanales');

    component.obtenerProductos(1, 20);

    expect(spy).toHaveBeenCalledWith(1, 20);
    expect(component.carga()).toBe(false);
    expect(component.errorCarga()).toBe(false);
    // Corrección: usar .length en lugar de toBeLessThan
    expect(component.productos.length).toBe(1);
    expect(component.productos[0].nombre).toBe('Jabón de Lavanda');
  });

  it('Debería manejar errores al cargar productos', () => {
    const spy = vi.spyOn(productService, 'obtener').mockReturnValue(
      throwError(() => new Error('Error de red'))
    );

    component.obtenerProductos(1, 20);

    expect(spy).toHaveBeenCalledWith(1, 20);
    expect(component.carga()).toBe(false);
    expect(component.errorCarga()).toBe(true);
  });

  it('Debería retornar banner por defecto para categoría desconocida', () => {
    vi.spyOn(component, 'titulo').mockReturnValue('categoria-desconocida');

    const banner = component.getBannerImage();

    expect(banner).toBe('bannerJA.png');
  });

  it('Debería retornar banner de jabones para categoría jabones-artesanales', () => {
    vi.spyOn(component, 'titulo').mockReturnValue('jabones-artesanales');

    const banner = component.getBannerImage();

    expect(banner).toBe('bannerJA.png');
  });

  it('Debería retornar banner de velas para categoría velas-artesanales', () => {
    vi.spyOn(component, 'titulo').mockReturnValue('velas-artesanales');

    const banner = component.getBannerImage();

    expect(banner).toBe('bannerVA.png');
  });

  it('Debería actualizar la cantidad de productos', () => {
    const cantidad = 5;

    component.recibirCantidad(cantidad);

    expect(component.cantidadProducto()).toBe(cantidad);
  });

  it('Debería manejar título vacío o null', () => {
    vi.spyOn(component, 'titulo').mockReturnValue(null);

    const banner = component.getBannerImage();

    expect(banner).toBe('bannerJA.png');
  });

  it('Debería establecer carga como false cuando no hay categoría seleccionada', () => {
    const mockQueryParams = of({});
    vi.spyOn(component.rutaActiva, 'queryParams', 'get').mockReturnValue(mockQueryParams);

    component.ngOnInit();

    expect(component.carga()).toBe(false);
  });

  it('Debería llamar a obtenerProductos cuando hay categoría en queryParams', () => {
    const mockQueryParams = of({ categoria: 'jabones-artesanales' });
    vi.spyOn(component.rutaActiva, 'queryParams', 'get').mockReturnValue(mockQueryParams);
    const spy = vi.spyOn(component, 'obtenerProductos');

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(1, 20);
  });

  it('Debería renderizar mensaje de error cuando errorCarga es true', () => {
    // Asegurar que titulo() retorna un valor válido
    vi.spyOn(component, 'titulo').mockReturnValue('categoria-test');
    
    component.errorCarga.set(true);
    component.carga.set(false);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.text-red-500');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent.trim()).toBe('Error al cargar los productos');
  });

  it('Debería renderizar mensaje cuando no hay productos', () => {
    // Asegurar que titulo() retorna un valor válido
    vi.spyOn(component, 'titulo').mockReturnValue('categoria-test');
    
    component.productos = [];
    component.carga.set(false);
    component.errorCarga.set(false);
    fixture.detectChanges();

    const emptyMessage = fixture.nativeElement.querySelector('.col-span-full');
    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage.textContent.trim()).toBe('No se encontraron productos');
  });
});