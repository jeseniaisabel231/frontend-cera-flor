import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { routes } from '../../app.routes';
import { ProductsPage } from './products.page';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDNjNTFmYmJjNTU2NmIzZjJiMWU0MSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzUyMDE3NzI2LCJleHAiOjE3NTIwMjEzMjZ9.EcFCwy3v1kG8ARdQiwK0Kvr6igZSSQaNPcQLYvkhRo8';

describe('Página de administración de productos', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', token);

    TestBed.configureTestingModule({
      imports: [ProductsPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;

    const reqCategorias = httpTestingController.match(
      `${environment.urlApi}/api/categorias`,
    );

    reqCategorias.forEach((req) => {
      expect(req.request.method).toBe('GET');
      req.flush(mockCategoriesResponse);
    });

    fixture.detectChanges();

    const reqProductos = httpTestingController.expectOne(
      `${environment.urlApi}/api/productos?page=1&limit=100`,
    );

    expect(reqProductos.request.method).toBe('GET');
    reqProductos.flush(mockProductsResponse);

    fixture.detectChanges();

    const reqIngredientes = httpTestingController.expectOne(
      `${environment.urlApi}/api/ingredientes?page=1&limit=100`,
    );

    expect(reqIngredientes.request.method).toBe('GET');
    reqIngredientes.flush(mockIngredientsResponse);
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Deberían cargar las tarjetas de productos', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll(
      'div[data-testid="tarjeta-producto"]',
    );

    expect(tarjetas.length).toBe(mockProductsResponse.totalProductos);

    tarjetas.forEach((tarjeta: any, index: number) => {
      const producto = mockProductsResponse.productos[index];
      expect(tarjeta.querySelector('h3').textContent).toContain(
        producto.nombre,
      );
      expect(tarjeta.querySelector('span').textContent).toContain(
        `$ ${producto.precio}`,
      );
      expect(tarjeta.querySelector('img').src).toContain(producto.imagen);
    });
  });

  it('Debería crear un nuevo producto', () => {
    const botonRegistrar = fixture.nativeElement.querySelector(
      '[data-testid="registrar-producto"]',
    );

    expect(botonRegistrar).toBeTruthy();

    botonRegistrar.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    const formulario = fixture.nativeElement.querySelector(
      '[data-testid="formulario-producto"]',
    );

    expect(formulario).toBeTruthy();

    const imagenInput = formulario.querySelector(
      '[data-testid="input-imagen"]',
    ) as HTMLInputElement;

    const nombreInput = formulario.querySelector(
      '[data-testid="input-nombre"]',
    ) as HTMLInputElement;

    const beneficiosInput = formulario.querySelector(
      '[data-testid="input-beneficios"]',
    ) as HTMLTextAreaElement;

    const descripcionInput = formulario.querySelector(
      '[data-testid="input-descripcion"]',
    ) as HTMLTextAreaElement;

    const stockInput = formulario.querySelector(
      '[data-testid="input-stock"]',
    ) as HTMLInputElement;

    const categoriaSelect = formulario.querySelector(
      '[data-testid="select-categoria"]',
    ) as HTMLSelectElement;

    const precioInput = formulario.querySelector(
      '[data-testid="input-precio"]',
    ) as HTMLInputElement;

    categoriaSelect.value = mockCategoriesResponse.categorias[0]._id;
    categoriaSelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    const ingredientesCheckboxes = formulario.querySelectorAll(
      '[data-testid="input-ingrediente"]',
    ) as NodeListOf<HTMLInputElement>;

    const aromaSelect = formulario.querySelector(
      '[data-testid="select-aroma"]',
    ) as HTMLSelectElement;

    const tipoSelect = formulario.querySelector(
      '[data-testid="select-tipo"]',
    ) as HTMLSelectElement;

     const fileList = { 0: { name: 'producto-imagen', size: 500001 } }

    const file = new File([''], 'producto-imagen.jpg', { type: 'image/jpeg' });

    nombreInput.value = 'Nuevo Producto';
    beneficiosInput.value =
      'Beneficio numero 1, Beneficio numero 2, Beneficio numero 3';
    descripcionInput.value =
      'Descripción del nuevo producto con ingredientes naturales';
    stockInput.value = '100';
    precioInput.value = '10.99';

    ingredientesCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('input'));
    });

    tipoSelect.value = 'piel grasa';
    aromaSelect.value = mockIngredientsResponse.ingredientes[0].nombre;

    imagenInput.dispatchEvent(new Event('change'));
    nombreInput.dispatchEvent(new Event('input'));
    beneficiosInput.dispatchEvent(new Event('input'));
    descripcionInput.dispatchEvent(new Event('input'));
    stockInput.dispatchEvent(new Event('input'));
    precioInput.dispatchEvent(new Event('input'));
    aromaSelect.dispatchEvent(new Event('change'));
    tipoSelect.dispatchEvent(new Event('change'));

    const botonGuardar = formulario.querySelector(
      '[data-testid="boton-accion"]',
    );

    expect(botonGuardar).toBeTruthy();
    expect(botonGuardar.textContent).toContain('Registrar producto');

    botonGuardar.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    const reqRegistrar = httpTestingController.expectOne(
      `${environment.urlApi}/api/productos`,
    );
    expect(reqRegistrar.request.method).toBe('POST');
    expect(reqRegistrar.request.body instanceof FormData).toBeTruthy();
  });
});

const mockCategoriesResponse = {
  categorias: [
    {
      _id: '680fd248f613dc80267ba5d7',
      nombre: 'Jabones artesanales',
      descripcion:
        'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas especializadas.',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
      createdAt: '2025-04-28T19:08:56.437Z',
      updatedAt: '2025-07-07T17:13:39.583Z',
    },
    {
      _id: '6823a6c096655bcbe4971062',
      nombre: 'Velas artesanales',
      descripcion:
        'Velas hechas a mano con cera natural y aceites esenciales.nklnlk',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355759/categorias/dsf4c9zrot7cfloyzdd7.jpg',
      createdAt: '2025-05-13T20:08:32.798Z',
      updatedAt: '2025-07-07T17:01:49.263Z',
    },
  ],
};

const mockProductsResponse = {
  totalProductos: 8,
  totalPaginas: 1,
  paginaActual: 1,
  productos: [
    {
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
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
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
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
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
    },
    {
      _id: '685e0fb6d66e6a9c394702a3',
      nombre: 'Jabón de café energia',
      descripcion:
        'Café Energía es un jabón artesanal formulado con café molido de tueste oscuro que despierta la piel mixta o grasa con cada uso. Su textura ligeramente granuda exfolia suavemente, mientras el intenso aroma a café estimula los sentidos y aporta una sensación de frescura vigorizante. Su formato compacto de 6cm × 6 cm y grosor de 2.5 cm lo hace cómodo y práctico para el uso cotidiano.',
      beneficios: [
        'Ingrediente: Extracto de cafe',
        'Aroma: Cafe',
        'Tipo de piel: Piel grasa',
      ],
      ingredientes: [
        {
          _id: '68504f4b5a5a9def06fe65a1',
          nombre: 'eucalipto',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751344196/ingredientes/jm9glhn1k7qbnxfqbwbo.png',
          stock: 55,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-16T17:07:23.472Z',
          updatedAt: '2025-07-03T02:01:17.759Z',
        },
        {
          _id: '6850cddf5a5a9def06fe66be',
          nombre: 'romero',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364062/ingredientes/lvghczjocx7e0hnienox.png',
          stock: 74,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-17T02:07:27.882Z',
          updatedAt: '2025-07-06T22:18:50.080Z',
        },
      ],
      aroma: 'café',
      tipo: 'aromatizante',
      precio: 4,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751403881/productos/scnzumcni3kyfdvkbym0.jpg',
      stock: 67,
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
      createdAt: '2025-06-27T03:27:50.158Z',
      updatedAt: '2025-07-06T23:07:14.312Z',
    },
    {
      _id: '6863ea328c06c2a2134d5ccb',
      nombre: 'Jabón De Flores',
      descripcion:
        'Jabón con nutrientes especiales único y favorecedor para la piel ya que te la deja brillando y con un acabo único.',
      beneficios: [
        'Jabón con muchos nutrientes',
        'de color morado con forma de cuadrado y con muchos beneficios',
        'jabón hermoso y grande',
      ],
      ingredientes: [
        {
          _id: '6850cddf5a5a9def06fe66be',
          nombre: 'romero',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364062/ingredientes/lvghczjocx7e0hnienox.png',
          stock: 74,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-17T02:07:27.882Z',
          updatedAt: '2025-07-06T22:18:50.080Z',
        },
        {
          _id: '6854701a2f866ebc585d9881',
          nombre: 'canela',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
          stock: 79,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:16:26.381Z',
          updatedAt: '2025-07-07T01:17:53.410Z',
        },
      ],
      aroma: 'vainillia',
      tipo: 'decorativa',
      precio: 2.6,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751404315/productos/sehzoxqapbf76wtz7znd.png',
      stock: 48,
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
      createdAt: '2025-07-01T14:01:22.834Z',
      updatedAt: '2025-07-08T05:30:43.786Z',
    },
    {
      _id: '6864495a4492af792faf6768',
      nombre: 'Vela Fuego Ardiente',
      descripcion: 'Vela grande y aromatizante que ambienta tu casa',
      beneficios: [
        'Es deliciosa con aroma agradable',
        'tiene un color llamativo de todo',
        'es ambientalista',
      ],
      ingredientes: [
        {
          _id: '68546ffa2f866ebc585d9877',
          nombre: 'limón',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364154/ingredientes/yesmkjz8uryjntxpmvui.png',
          stock: 93,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:15:54.699Z',
          updatedAt: '2025-07-06T20:15:57.168Z',
        },
        {
          _id: '68504f4b5a5a9def06fe65a1',
          nombre: 'eucalipto',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751344196/ingredientes/jm9glhn1k7qbnxfqbwbo.png',
          stock: 55,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-16T17:07:23.472Z',
          updatedAt: '2025-07-03T02:01:17.759Z',
        },
      ],
      aroma: 'vainillia',
      tipo: 'piel mixta',
      precio: 4.85,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751756871/productos/hfkrrfzekcvsziciopbm.jpg',
      stock: 40,
      descuento: 0,
      id_categoria: {
        _id: '680fd248f613dc80267ba5d7',
        nombre: 'Jabones artesanales',
        descripcion: 'Un jabón, que más te esperas',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-09T01:31:58.968Z',
      },
      activo: true,
      createdAt: '2025-07-01T20:47:22.391Z',
      updatedAt: '2025-07-07T00:35:22.078Z',
    },
    {
      _id: '686705675e92f6237d49c3af',
      nombre: 'Jabon de miel natural',
      descripcion:
        'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
      beneficios: [
        'Restaura la barrera cutánea y alivia la sequedad al instante.',
        '\r\nElimina impurezas con su efecto antibacterial sin resecar.',
        '\r\nAporta nutrición natural para un acabado luminoso y sedoso\r\n',
      ],
      ingredientes: [
        {
          _id: '6850cddf5a5a9def06fe66be',
          nombre: 'romero',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364062/ingredientes/lvghczjocx7e0hnienox.png',
          stock: 74,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-17T02:07:27.882Z',
          updatedAt: '2025-07-06T22:18:50.080Z',
        },
        {
          _id: '6854701a2f866ebc585d9881',
          nombre: 'canela',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
          stock: 79,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:16:26.381Z',
          updatedAt: '2025-07-07T01:17:53.410Z',
        },
      ],
      aroma: 'miel',
      tipo: 'piel grasa',
      precio: 3.49,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
      stock: 89,
      descuento: 0,
      id_categoria: {
        _id: '680fd248f613dc80267ba5d7',
        nombre: 'Jabones artesanales',
        descripcion: 'Un jabón, que más te esperas',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-09T01:31:58.968Z',
      },
      activo: true,
      createdAt: '2025-07-03T22:34:15.196Z',
      updatedAt: '2025-07-08T05:30:43.987Z',
    },
    {
      _id: '686706385e92f6237d49c3b8',
      nombre: 'Jabon de coco',
      descripcion:
        'Coco & Karité es un jabón 100 % natural, formulado con aceite de coco y manteca de karité, diseñado especialmente para piel seca. Su delicada espuma nutre y repara la barrera cutánea, mientras su suave aroma tropical transporta los sentidos a un oasis de bienestar. Su formato compacto de 8cm × 5 cm y grosor de 3 cm lo hace cómodo y práctico para el uso cotidiano.',
      beneficios: [
        'Sella la humedad y recupera el confort en la piel más reseca.',
        '\r\nSu espuma cremosa envuelve suavemente, revelando una piel suave y luminosa.',
        '\r\nDespierta los sentidos con un toque tropical que transporta a un paraíso natural.\r\n',
      ],
      ingredientes: [
        {
          _id: '685471cb2f866ebc585d98be',
          nombre: 'coco',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364619/ingredientes/pq2rq6z8zciqae1zmdlt.png',
          stock: 88,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:23:39.962Z',
          updatedAt: '2025-07-06T22:18:50.148Z',
        },
        {
          _id: '685471f42f866ebc585d98c9',
          nombre: 'laurel',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
          stock: 63,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:24:20.500Z',
          updatedAt: '2025-07-08T05:47:49.741Z',
        },
      ],
      aroma: 'miel',
      tipo: 'piel grasa',
      precio: 3.24,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582264/productos/o3uyqssg5k0vbazcqaxl.jpg',
      stock: 0,
      descuento: 0,
      id_categoria: {
        _id: '680fd248f613dc80267ba5d7',
        nombre: 'Jabones artesanales',
        descripcion: 'Un jabón, que más te esperas',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-09T01:31:58.968Z',
      },
      activo: true,
      createdAt: '2025-07-03T22:37:44.997Z',
      updatedAt: '2025-07-08T05:30:43.581Z',
    },
    {
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
        {
          _id: '685471a72f866ebc585d98b4',
          nombre: 'árbol de té',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364583/ingredientes/l4da3gkrxcbqiuujodjm.png',
          stock: 83,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:23:03.882Z',
          updatedAt: '2025-07-07T01:13:26.242Z',
        },
        {
          _id: '6850cddf5a5a9def06fe66be',
          nombre: 'romero',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364062/ingredientes/lvghczjocx7e0hnienox.png',
          stock: 74,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-17T02:07:27.882Z',
          updatedAt: '2025-07-06T22:18:50.080Z',
        },
      ],
      aroma: 'menta',
      tipo: 'piel seca',
      precio: 2.45,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582428/productos/r8tk8owx5awlrxwmlivz.jpg',
      stock: 96,
      descuento: 0,
      id_categoria: {
        _id: '680fd248f613dc80267ba5d7',
        nombre: 'Jabones artesanales',
        descripcion: 'Un jabón, que más te esperas',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-09T01:31:58.968Z',
      },
      activo: true,
      createdAt: '2025-07-03T22:40:28.625Z',
      updatedAt: '2025-07-08T05:30:43.379Z',
    },
    {
      _id: '686707975e92f6237d49c438',
      nombre: 'Jabón de Olivia pura',
      descripcion:
        'Olivia Pura es un jabón artesanal elaborado con aceite de oliva extra virgen, especialmente formulado para pieles sensibles. De aroma neutro y textura delicada, ofrece una limpieza suave que respeta el manto hidrolipídico y deja la piel fresca y confortable. Su formato compacto de 8cm ×  5cm y grosor de 3 cm lo hace cómodo y práctico para el uso cotidiano.',
      beneficios: [
        'Hidrata intensamente sin sensación grasosa.',
        'Calma y protege la barrera cutánea, reduciendo rojeces.',
        'Ofrece un tacto sedoso y mejora la elasticidad natural.',
      ],
      ingredientes: [
        {
          _id: '68504f4b5a5a9def06fe65a1',
          nombre: 'eucalipto',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751344196/ingredientes/jm9glhn1k7qbnxfqbwbo.png',
          stock: 55,
          precio: 2,
          tipo: 'esencia',
          createdAt: '2025-06-16T17:07:23.472Z',
          updatedAt: '2025-07-03T02:01:17.759Z',
        },
        {
          _id: '68546ffa2f866ebc585d9877',
          nombre: 'limón',
          id_categoria: [
            '680fd248f613dc80267ba5d7',
            '6823a6c096655bcbe4971062',
          ],
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364154/ingredientes/yesmkjz8uryjntxpmvui.png',
          stock: 93,
          precio: 3,
          tipo: 'esencia',
          createdAt: '2025-06-19T20:15:54.699Z',
          updatedAt: '2025-07-06T20:15:57.168Z',
        },
      ],
      aroma: 'vainillia',
      tipo: 'piel grasa',
      precio: 3.5,
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582615/productos/axd1rzfzgdy1ztfhf7b2.jpg',
      stock: 97,
      descuento: 0,
      id_categoria: {
        _id: '680fd248f613dc80267ba5d7',
        nombre: 'Jabones artesanales',
        descripcion: 'Un jabón, que más te esperas',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-09T01:31:58.968Z',
      },
      activo: true,
      createdAt: '2025-07-03T22:43:35.634Z',
      updatedAt: '2025-07-06T03:52:04.106Z',
    },
  ],
};

const mockIngredientsResponse = {
  ingredientes: [
    {
      _id: '684cacadc10c57cbea932ed8',
      nombre: 'flores',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
      stock: 30,
      precio: 1.5,
      tipo: 'aroma',
      createdAt: '2025-06-13T22:56:45.050Z',
      updatedAt: '2025-07-07T01:17:53.270Z',
    },
    {
      _id: '68504f4b5a5a9def06fe65a1',
      nombre: 'eucalipto',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751344196/ingredientes/jm9glhn1k7qbnxfqbwbo.png',
      stock: 55,
      precio: 2,
      tipo: 'esencia',
      createdAt: '2025-06-16T17:07:23.472Z',
      updatedAt: '2025-07-03T02:01:17.759Z',
    },
    {
      _id: '68504f6a5a5a9def06fe65ab',
      nombre: 'lavanda',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364042/ingredientes/pmdpmq3e9on40twtlmu5.png',
      stock: 60,
      precio: 2,
      tipo: 'esencia',
      createdAt: '2025-06-16T17:07:54.450Z',
      updatedAt: '2025-07-05T22:37:00.097Z',
    },
    {
      _id: '6850502d5a5a9def06fe65cc',
      nombre: 'cuadrado',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
      stock: 86,
      precio: 3,
      tipo: 'molde',
      createdAt: '2025-06-16T17:11:09.377Z',
      updatedAt: '2025-07-07T01:20:29.738Z',
    },
    {
      _id: '685050585a5a9def06fe65dc',
      nombre: 'rectangular',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750093911/ingredientes/ehkj4hs0zfbafenjcsft.png',
      stock: 77,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-16T17:11:52.165Z',
      updatedAt: '2025-07-06T22:18:49.875Z',
    },
    {
      _id: '6850ca985a5a9def06fe6657',
      nombre: 'amarillo',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405252/ingredientes/d6nwnfthipwwdq9kp1is.png',
      stock: 87,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-17T01:53:28.005Z',
      updatedAt: '2025-07-07T01:20:29.256Z',
    },
    {
      _id: '6850cab85a5a9def06fe6662',
      nombre: 'rojo',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355629/ingredientes/zfjo9p7gkiupaoqxfmzd.png',
      stock: 70,
      precio: 2,
      tipo: 'color',
      createdAt: '2025-06-17T01:54:01.120Z',
      updatedAt: '2025-07-07T01:17:53.754Z',
    },
    {
      _id: '6850cad95a5a9def06fe666c',
      nombre: 'rosa',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581205/ingredientes/a90ppvthbkstgylrkrst.png',
      stock: 91,
      precio: 3,
      tipo: 'color',
      createdAt: '2025-06-17T01:54:33.996Z',
      updatedAt: '2025-07-08T05:47:49.535Z',
    },
    {
      _id: '6850cb1a5a5a9def06fe6680',
      nombre: 'verde',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581213/ingredientes/mie6rcvicwoqfpdetx5i.png',
      stock: 80,
      precio: 2,
      tipo: 'color',
      createdAt: '2025-06-17T01:55:38.457Z',
      updatedAt: '2025-07-03T23:39:16.250Z',
    },
    {
      _id: '6850cb435a5a9def06fe668a',
      nombre: 'azul',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581220/ingredientes/l241ugleifbwgyqvpx0g.png',
      stock: 86,
      precio: 3,
      tipo: 'color',
      createdAt: '2025-06-17T01:56:19.192Z',
      updatedAt: '2025-07-08T05:38:24.316Z',
    },
    {
      _id: '6850cd455a5a9def06fe66aa',
      nombre: 'menta',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125893/ingredientes/yqz85xjr1wpfppvrpb81.png',
      stock: 82,
      precio: 3,
      tipo: 'aroma',
      createdAt: '2025-06-17T02:04:53.984Z',
      updatedAt: '2025-07-07T01:11:41.190Z',
    },
    {
      _id: '6850cd8c5a5a9def06fe66b4',
      nombre: 'romero ii',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125963/ingredientes/cugqix0blufqbazfdaiy.png',
      stock: 83,
      precio: 3,
      tipo: 'aroma',
      createdAt: '2025-06-17T02:06:04.062Z',
      updatedAt: '2025-07-07T01:20:29.326Z',
    },
    {
      _id: '6850cddf5a5a9def06fe66be',
      nombre: 'romero',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364062/ingredientes/lvghczjocx7e0hnienox.png',
      stock: 74,
      precio: 2,
      tipo: 'esencia',
      createdAt: '2025-06-17T02:07:27.882Z',
      updatedAt: '2025-07-06T22:18:50.080Z',
    },
    {
      _id: '68531f902f866ebc585d93d6',
      nombre: 'corazón ardiente',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
      stock: 63,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-18T20:20:32.583Z',
      updatedAt: '2025-07-08T05:47:49.465Z',
    },
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
      _id: '6854701a2f866ebc585d9881',
      nombre: 'canela',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
      stock: 79,
      precio: 3,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:16:26.381Z',
      updatedAt: '2025-07-07T01:17:53.410Z',
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
    {
      _id: '685471a72f866ebc585d98b4',
      nombre: 'árbol de té',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364583/ingredientes/l4da3gkrxcbqiuujodjm.png',
      stock: 83,
      precio: 3,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:23:03.882Z',
      updatedAt: '2025-07-07T01:13:26.242Z',
    },
    {
      _id: '685471cb2f866ebc585d98be',
      nombre: 'coco',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364619/ingredientes/pq2rq6z8zciqae1zmdlt.png',
      stock: 88,
      precio: 3,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:23:39.962Z',
      updatedAt: '2025-07-06T22:18:50.148Z',
    },
    {
      _id: '685471f42f866ebc585d98c9',
      nombre: 'laurel',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
      stock: 63,
      precio: 3,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:24:20.500Z',
      updatedAt: '2025-07-08T05:47:49.741Z',
    },
    {
      _id: '685472f42f866ebc585d98d3',
      nombre: 'cubo de corazón',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364916/ingredientes/pvsmgpeqhglxzczwx5yb.png',
      stock: 89,
      precio: 3,
      tipo: 'molde',
      createdAt: '2025-06-19T20:28:36.896Z',
      updatedAt: '2025-07-06T22:04:17.933Z',
    },
    {
      _id: '685473752f866ebc585d98de',
      nombre: 'torre',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365044/ingredientes/avny3dv79eeck4ldreok.png',
      stock: 93,
      precio: 4,
      tipo: 'molde',
      createdAt: '2025-06-19T20:30:45.115Z',
      updatedAt: '2025-07-03T22:21:31.536Z',
    },
    {
      _id: '685473ee2f866ebc585d98e8',
      nombre: 'imán',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365166/ingredientes/h5myplmgwiqkhof1eulr.png',
      stock: 17,
      precio: 3,
      tipo: 'molde',
      createdAt: '2025-06-19T20:32:46.983Z',
      updatedAt: '2025-07-01T23:48:20.955Z',
    },
    {
      _id: '685474332f866ebc585d98f3',
      nombre: 'serpientes',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365235/ingredientes/vbnipp8jq2vt3ctehaip.png',
      stock: 16,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-19T20:33:55.956Z',
      updatedAt: '2025-06-19T20:33:55.956Z',
    },
    {
      _id: '6854745c2f866ebc585d98fd',
      nombre: 'cilíndrico',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365276/ingredientes/qciahadi0xdnhdr1qmfg.png',
      stock: 81,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-19T20:34:36.776Z',
      updatedAt: '2025-07-03T22:23:03.061Z',
    },
    {
      _id: '685474862f866ebc585d9907',
      nombre: 'hexágono',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365317/ingredientes/akvqlc60spkxgvmohycz.png',
      stock: 11,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-19T20:35:18.216Z',
      updatedAt: '2025-07-02T00:00:27.854Z',
    },
    {
      _id: '6854749e2f866ebc585d9911',
      nombre: 'estrella',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365342/ingredientes/qsobzocnwxbferrq3bk8.png',
      stock: 82,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-19T20:35:42.930Z',
      updatedAt: '2025-07-06T23:07:14.588Z',
    },
    {
      _id: '685474d52f866ebc585d991d',
      nombre: 'corazón',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365397/ingredientes/d0zdctkzxjhpoertjbqf.png',
      stock: 16,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-19T20:36:37.539Z',
      updatedAt: '2025-06-19T20:38:32.745Z',
    },
    {
      _id: '685474ee2f866ebc585d9927',
      nombre: 'redondo',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365421/ingredientes/fbkshkoad6h14aejmqpp.png',
      stock: 9,
      precio: 2,
      tipo: 'molde',
      createdAt: '2025-06-19T20:37:02.151Z',
      updatedAt: '2025-07-06T20:15:57.440Z',
    },
    {
      _id: '685b2e6d52d1afb30db2cf7d',
      nombre: 'manzanilla',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
      stock: 39,
      precio: 2,
      tipo: 'esencia',
      createdAt: '2025-06-24T23:02:05.017Z',
      updatedAt: '2025-07-08T05:47:49.672Z',
    },
    {
      _id: '685e13dbd66e6a9c39470379',
      nombre: 'turquesa',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581398/ingredientes/cs2ysfpmntafazweduxu.png',
      stock: 92,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-27T03:45:31.108Z',
      updatedAt: '2025-07-07T01:17:53.200Z',
    },
    {
      _id: '685e1491d66e6a9c39470389',
      nombre: 'dorado',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750996113/ingredientes/fxsb6k3eyqcs6wkurqim.png',
      stock: 17,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-27T03:48:33.980Z',
      updatedAt: '2025-07-07T01:20:29.808Z',
    },
    {
      _id: '685f14eed66e6a9c394738bd',
      nombre: 'cafe',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751061741/ingredientes/zhabza5pqkd3ws4ainsi.png',
      stock: 7,
      precio: 4,
      tipo: 'color',
      createdAt: '2025-06-27T22:02:22.373Z',
      updatedAt: '2025-07-07T01:00:16.831Z',
    },
    {
      _id: '685f1505d66e6a9c394738c1',
      nombre: 'lila',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751061765/ingredientes/fh465q6wqzo6xrjplfdr.png',
      stock: 11,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-27T22:02:45.954Z',
      updatedAt: '2025-06-27T22:02:45.954Z',
    },
    {
      _id: '685f1535d66e6a9c394738cd',
      nombre: 'celeste',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751518820/ingredientes/tlo2hwu3ofyiqxsxbq9o.png',
      stock: 15,
      precio: 2,
      tipo: 'color',
      createdAt: '2025-06-27T22:03:33.078Z',
      updatedAt: '2025-07-06T22:18:49.943Z',
    },
    {
      _id: '686219c11cfd542baabf63d9',
      nombre: 'miel',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259585/ingredientes/ytk8zazclpa6pb21upzy.png',
      stock: 13,
      precio: 1.5,
      tipo: 'aroma',
      createdAt: '2025-06-30T04:59:45.573Z',
      updatedAt: '2025-07-07T01:20:29.877Z',
    },
    {
      _id: '68621a7c1cfd542baabf63e7',
      nombre: 'vainillia',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259772/ingredientes/xwkxd8i5aa3jkygou3nf.png',
      stock: 19,
      precio: 1.25,
      tipo: 'aroma',
      createdAt: '2025-06-30T05:02:52.619Z',
      updatedAt: '2025-07-08T05:47:49.603Z',
    },
    {
      _id: '68621acc1cfd542baabf63eb',
      nombre: 'café',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259850/ingredientes/dtxghrb2wrfdrneae149.png',
      stock: 27,
      precio: 1.5,
      tipo: 'aroma',
      createdAt: '2025-06-30T05:04:12.011Z',
      updatedAt: '2025-07-07T01:17:53.823Z',
    },
    {
      _id: '686713925e92f6237d49cb08',
      nombre: 'nuevomorado',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751585681/ingredientes/ioosdaoinitcazxq3or4.png',
      stock: 92,
      precio: 1.5,
      tipo: 'color',
      createdAt: '2025-07-03T23:34:42.110Z',
      updatedAt: '2025-07-04T00:35:46.218Z',
    },
    {
      _id: '686a934e57f1c4afea0404c2',
      nombre: 'prueba por dos',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751814989/ingredientes/iwjoa1hdusapfyqvipdf.png',
      stock: 1,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-07-06T15:16:30.411Z',
      updatedAt: '2025-07-06T15:16:30.411Z',
    },
  ],
  total: 40,
  page: 1,
  totalPages: 1,
};
