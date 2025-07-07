import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './productDetails.component';
import { CarritoService } from '../../services/carrito.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { vi } from 'vitest';

const mockProduct = {
  _id: '1',
  nombre: 'Test Product',
  precio: 10,
  descripcion: 'Test Description',
  beneficios: ['Benefit 1', 'Benefit 2'],
  imagen: 'test.jpg',
  id_categoria: {
    nombre: 'Test Category'
  }
};

describe('ProductDetails Component', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let carritoService: CarritoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        provideHttpClient(),
        {
          provide: CarritoService,
          useValue: {
            agregarCarrito: () => of({}),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    carritoService = TestBed.inject(CarritoService);
    
    component.productoResource = signal({
        value: () => ({ producto: mockProduct }),
        isLoading: () => false,
    }) as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have responsive image classes', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.classList.contains('w-full')).toBe(true);
    expect(img.classList.contains('h-auto')).toBe(true);
    expect(img.classList.contains('md:h-100')).toBe(true);
    expect(img.classList.contains('md:w-100')).toBe(true);
  });

  it('should have responsive title font size', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.classList.contains('sm:text-2xl')).toBe(true);
    expect(title.classList.contains('md:text-3xl')).toBe(true);
  });

  it('should stack buttons vertically on small screens', () => {
    const buttonContainer = fixture.nativeElement.querySelector('.flex.flex-col.sm\\:flex-row.gap-4');
    expect(buttonContainer).toBeTruthy();
  });
});
