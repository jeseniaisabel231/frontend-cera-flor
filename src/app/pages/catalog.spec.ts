import 'zone.js/testing';
import 'zone.js/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { routes } from '../app.routes';
import { CatalogPage } from './catalog.page';
import { ProductosService } from '../../services/admin/productos.service';
import { CategoryService } from '../../services/categorias.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { vi } from 'vitest';

const mockCategorias = [
  { _id: '1', nombre: 'jabones artesanales', imagen: 'jabon.jpg', descripcion: '...' },
  { _id: '2', nombre: 'velas artesanales', imagen: 'vela.jpg', descripcion: '...' },
];

const mockProductos = [
  { _id: '1', nombre: 'Jabón de Lavanda', precio: 10, id_categoria: { _id: '1' }, tipo: 'piel seca' },
  { _id: '2', nombre: 'Jabón de Avena', precio: 12, id_categoria: { _id: '1' }, tipo: 'piel grasa' },
  { _id: '3', nombre: 'Vela de Vainilla', precio: 20, id_categoria: { _id: '2' }, tipo: 'aromatizante' },
];

describe('CatalogPage', () => {
  let component: CatalogPage;
  let fixture: ComponentFixture<CatalogPage>;
  let productosService: ProductosService;
  let categoriaService: CategoryService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        {
          provide: ProductosService,
          useValue: {
            productos: signal(mockProductos),
            carga: signal(false),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            categorias: signal(mockCategorias),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService);
    categoriaService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products based on category from route params', fakeAsync(() => {
    (activatedRoute.queryParams as any) = of({ categoria: 'jabones-artesanales' });
    
    fixture.destroy();
    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;
    tick(); 
    fixture.detectChanges();

    expect(component.titulo()).toBe('jabones-artesanales');
    expect(component.productosTipo().length).toBe(2);
    expect(component.productosTipo()[0].nombre).toBe('Jabón de Lavanda');
  }));

  it('should filter products by type when filter changes', fakeAsync(() => {
    (activatedRoute.queryParams as any) = of({ categoria: 'jabones-artesanales' });
    fixture.destroy();
    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();

    component.filtroProductos.set('piel grasa');
    tick();
    fixture.detectChanges();
    
    expect(component.productosTipo().length).toBe(1);
    expect(component.productosTipo()[0].nombre).toBe('Jabón de Avena');
  }));

  it('should sort products by price ascending', fakeAsync(() => {
    (activatedRoute.queryParams as any) = of({ categoria: 'jabones-artesanales' });
    fixture.destroy();
    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();

    component.filtroPrecio.set('precio_asc');
    tick();
    fixture.detectChanges();

    const prices = component.productosTipo().map(p => p.precio);
    expect(prices).toEqual([10, 12]);
  }));

  it('should sort products by price descending', fakeAsync(() => {
    (activatedRoute.queryParams as any) = of({ categoria: 'jabones-artesanales' });
    fixture.destroy();
    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();

    component.filtroPrecio.set('precio_desc');
    tick();
    fixture.detectChanges();
    
    const prices = component.productosTipo().map(p => p.precio);
    expect(prices).toEqual([12, 10]);
  }));

  it('should get the correct banner image', () => {
    (component as any).titulo = signal('velas-artesanales');
    expect(component.getBannerImage()).toBe('bannerVA.png');

    (component as any).titulo = signal('jabones-artesanales');
    expect(component.getBannerImage()).toBe('bannerJA.png');
    
    (component as any).titulo = signal('unknown-category');
    expect(component.getBannerImage()).toBe('bannerJA.png');
  });

  it('should navigate to default category if no category in route', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    (activatedRoute.queryParams as any) = of({});

    fixture.destroy();
    fixture = TestBed.createComponent(CatalogPage);
    component = fixture.componentInstance;

    expect(navigateSpy).toHaveBeenCalledWith(['/catalogo'], {
      queryParams: { categoria: 'jabones-artesanales' },
    });
  });
});