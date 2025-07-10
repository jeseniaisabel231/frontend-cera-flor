import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { CarritoService } from '../../services/carrito.service';
import { routes } from '../app.routes';
import { Card } from '../components/card.component';
import { ShoppingCardPage } from './shoppingCart.page';

describe('Página de carrito de compras', () => {
  let component: ShoppingCardPage;
  let fixture: ComponentFixture<ShoppingCardPage>;

  let productComponent: Card;
  let productFixture: ComponentFixture<Card>;

  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjVlNjE5NDQ5MmFmNzkyZmFmYjQ1MCIsIm5vbWJyZSI6Ikplc2VuaWEgSXNhYmVsIiwiaWF0IjoxNzUyMDkwMjI5LCJleHAiOjE3NTIxNzY2Mjl9.Rl2IUYzycLZ_qV8Rr5T7qh28tMRchjKLgCtZPJ9ebFQ',
    );
    TestBed.configureTestingModule({
      imports: [ShoppingCardPage, Card],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ShoppingCardPage);
    component = fixture.componentInstance;

    productFixture = TestBed.createComponent(Card);
    productComponent = productFixture.componentInstance;

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Debería cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería agregar un producto al carrito', () => {
    productFixture.componentRef.setInput('producto', mockProductData);

    productFixture.detectChanges();

    const botonAgregar = productFixture.nativeElement.querySelector(
      '[data-testid="boton-agregar"]',
    );
    expect(botonAgregar).toBeTruthy();

    botonAgregar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    productFixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/carritos/agregar`,
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      producto_id: mockProductData._id,
      cantidad: 1,
      tipo_producto: 'normal',
    });

    fixture.detectChanges();
  });

  it('Deberían cargar los productos en el carrito', () => {
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/carritos`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCartResponse);

    fixture.detectChanges();

    const productos = fixture.nativeElement.querySelectorAll(
      '[data-testid="producto-carrito"]',
    );
    expect(productos.length).toBeGreaterThan(0);

    productos.forEach((producto: HTMLElement, index: number) => {
      const nombreProducto = producto.querySelector(
        '[data-testid="nombre-producto"]',
      ) as HTMLElement;

      expect(nombreProducto.textContent?.trim().toLocaleLowerCase()).toContain(
        mockCartResponse.carrito.productos[index].producto.nombre.toLowerCase(),
      );

      const precioProducto = producto.querySelector(
        '[data-testid="precio-producto"]',
      ) as HTMLElement;

      expect(precioProducto.textContent).toContain(
        `$ ${mockCartResponse.carrito.productos[index].precio_unitario}`,
      );
    });
  });

  it('Debería eliminar un producto del carrito', () => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/carritos`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCartResponse);

    fixture.detectChanges();

    const producto = fixture.nativeElement.querySelector(
      '[data-testid="producto-carrito"]',
    );

    expect(producto).toBeTruthy();

    const botonEliminar = producto.querySelector(
      '[data-testid="eliminar-producto"]',
    ) as HTMLButtonElement;

    expect(botonEliminar).toBeTruthy();

    botonEliminar!.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector(
      '[data-testid="modal-confirmacion"]',
    );

    const botonConfirmar = modal.querySelector(
      '[data-testid="boton-eliminar"]',
    ) as HTMLButtonElement;

    expect(botonConfirmar).toBeTruthy();

    botonConfirmar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

    const reqEliminar = httpTestingController.expectOne(
      `${environment.urlApi}/api/carritos/eliminar`,
    );

    expect(reqEliminar.request.method).toBe('PUT');
    expect(reqEliminar.request.body).toEqual({
      producto_id: mockCartResponse.carrito.productos[0].producto_id,
      tipo_producto: 'normal',
    });

    reqEliminar.flush({ message: 'Producto eliminado del carrito' });
  });
});

const mockProductData = {
  _id: '6859a9526f45c817c850cf89',
  nombre: 'Vela Mar',
  descripcion:
    'Formulada con eucalipto y menta, esta vela es perfecta para liberar las vías respiratorias. Su aroma fresco y penetrante crea un espacio limpio y revitalizante.',
  beneficios: [
    'Descongestiona de forma natural',
    'Refresca el ambiente',
    'Estimula la respiración profunda',
  ],
  ingredientes: [
    {
      _id: '68546ffa2f866ebc585d9877',
      nombre: 'limón',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364154/ingredientes/yesmkjz8uryjntxpmvui.png',
      stock: 93,
      precio: 3,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:15:54.699Z',
      updatedAt: '2025-07-06T20:15:57.168Z',
    },
    {
      _id: '685471662f866ebc585d98aa',
      nombre: 'menta ii',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
      stock: 85,
      precio: 3,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:21:58.702Z',
      updatedAt: '2025-07-07T01:17:53.340Z',
    },
  ],
  aroma: 'mieeel',
  tipo: 'aromatizante',
  precio: 2.34,
  imagen:
    'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751404300/productos/mddyhbfb6x4cn2uhdkvm.jpg',
  stock: 65,
  descuento: 0,
  id_categoria: {
    _id: '6823a6c096655bcbe4971062',
    nombre: 'Velas artesanales',
    descripcion:
      'Velas hechas a mano con cera natural y aceites esenciales.nklnlk',
    imagen:
      'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355759/categorias/dsf4c9zrot7cfloyzdd7.jpg',
    createdAt: '2025-05-13T20:08:32.798Z',
    updatedAt: '2025-07-07T17:01:49.263Z',
  },
  activo: true,
  createdAt: '2025-06-23T19:21:54.672Z',
  updatedAt: '2025-07-06T22:01:11.374Z',
};

const mockCartResponse = {
  carrito: {
    _id: '6865e6194492af792fafb452',
    cliente_id: '6865e6194492af792fafb450',
    total: 4.9,
    estado: 'pendiente',
    fecha_creacion: '2025-07-03T02:08:25.365Z',
    createdAt: '2025-07-03T02:08:25.366Z',
    updatedAt: '2025-07-09T23:34:59.629Z',
    __v: 126,
    productos: [
      {
        producto_id: '686706dc5e92f6237d49c3e4',
        tipo_producto: 'normal',
        cantidad: 2,
        precio_unitario: 2.45,
        subtotal: 4.9,
        _id: '686efbb19a7f66d29c970074',
        producto: {
          _id: '686706dc5e92f6237d49c3e4',
          nombre: 'Jabon de te verde',
          descripcion:
            'Té Verde Vital transforma la rutina de limpieza en un instante de frescura. Con té verde como único ingrediente activo y un aroma herbal fresco, este jabón artesanal es apto para todo tipo de piel. Su fórmula suave purifica en profundidad sin resecar, dejando la piel equilibrada y revitalizada. Su formato compacto de 6cm × 6 cm y grosor de 2.5 cm lo hace cómodo y práctico para el uso cotidiano.',
          beneficios: [
            'Antioxidante natural que ofrece un escudo protector contra los radicales libres.',
            '\r\nLimpieza delicada que purifica sin alterar el balance de la piel.',
            '\r\nExplosión herbal que activa los sentidos con su frescura revitalizante.',
          ],
          ingredientes: [
            '685471a72f866ebc585d98b4',
            '6850cddf5a5a9def06fe66be',
          ],
          aroma: 'menta',
          tipo: 'piel seca',
          precio: 2.45,
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582428/productos/r8tk8owx5awlrxwmlivz.jpg',
          stock: 96,
          descuento: 0,
          id_categoria: '680fd248f613dc80267ba5d7',
          activo: true,
          createdAt: '2025-07-03T22:40:28.625Z',
          updatedAt: '2025-07-08T05:30:43.379Z',
        },
      },
    ],
  },
};
