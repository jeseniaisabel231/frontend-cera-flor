import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { routes } from '../app.routes';
import { AboutUsPage } from './aboutUs.page';

describe('Página de sobre nosotros', () => {
  let component: AboutUsPage;
  let fixture: ComponentFixture<AboutUsPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AboutUsPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(AboutUsPage);
    component = fixture.componentInstance;

		fixture.detectChanges();
  });

  it('Deberían cargar la página y sus datos ', () => {
    expect(component).toBeTruthy();
  });

  it('Deberían poder obtener productos en la barra de búsqueda', () => {
    const header = fixture.nativeElement.querySelector(
      '[data-testid="header"]',
    );

    expect(header).toBeTruthy();

    const barraBusqueda = header.querySelector(
      '[data-testid="barra-busqueda"]',
    ) as HTMLInputElement;

    expect(barraBusqueda).toBeTruthy();

    barraBusqueda.value = 'jab';

    barraBusqueda.dispatchEvent(new Event('input'));

		fixture.detectChanges();

    const request = httpTestingController.expectOne(
      ({ method, url }) =>
        method === 'GET' &&
        url === `${environment.urlApi}/api/productos?nombre=jab`,
    );

    request.flush(mockProductosResponse);
  });
});

const mockProductosResponse = {
  totalProductos: 6,
  totalPaginas: 1,
  paginaActual: 1,
  productos: [
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
      stock: 88,
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
      updatedAt: '2025-07-09T04:43:02.780Z',
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
      stock: 66,
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
      updatedAt: '2025-07-10T22:13:08.509Z',
    },
  ],
};
