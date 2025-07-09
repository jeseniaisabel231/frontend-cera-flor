import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { ProductosService } from '../../services/admin/productos.service';
import { PromocionesService } from '../../services/admin/promociones.service';
import { AuthService } from '../../services/auth.service';
import { routes } from '../app.routes';
import { Card } from '../components/card.component';
import { HomePage } from './home.page';

describe('Página de inicio', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HomePage, Card],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductosService,
        AuthService,
        PromocionesService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    TestBed.inject(ProductosService);
    TestBed.inject(AuthService);
    TestBed.inject(PromocionesService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('Deberían cargar la página y sus datos', () => {
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/productos?page=1&limit=100`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockProductosResponse);

    const reqPromociones = httpTestingController.expectOne(
      `${environment.urlApi}/api/promociones?page=1&limit=100`,
    );

    expect(reqPromociones.request.method).toBe('GET');
    reqPromociones.flush(mockPromocionesResponse);

    const reqPerfil = httpTestingController.expectOne(
      `${environment.urlApi}/api/perfil`,
    );

    expect(reqPerfil.request.method).toBe('GET');
    reqPerfil.flush(mockPerfilResponse);

    expect(component).toBeTruthy();
  });

  it('Deberían cargar las promociones y sus tarjetas', () => {
    fixture.detectChanges();

    const imagenes = fixture.nativeElement.querySelectorAll(
      '[data-testid="imagen-promocion"]',
    );

    imagenes.forEach((imagen: any, index: number) => {
      const promocion = mockPromocionesResponse.promociones[index];
      const src = imagen.src;

      expect(src).toContain(promocion.imagen);
    });
  });

  it('Deberían cargar los productos y sus tarjetas', () => {
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll(
      '[data-testid="card"]',
    );

    cards.forEach((card: any, index: number) => {
      const producto = mockProductosResponse.productos[index];
      const nombre = card.querySelector('h2').textContent.trim().toLowerCase();
      const imagen = card.querySelector('img').src;

      expect(nombre).toContain(producto.nombre.toLowerCase());
      expect(imagen).toContain(producto.imagen);
    });
  });
});

const mockProductosResponse = {
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
        descripcion:
          'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas especializadas.',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-07T17:13:39.583Z',
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
        descripcion:
          'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas especializadas.',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-07T17:13:39.583Z',
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
        descripcion:
          'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas especializadas.',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-07T17:13:39.583Z',
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
        descripcion:
          'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas especializadas.',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-07T17:13:39.583Z',
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
        descripcion:
          'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas especializadas.',
        imagen:
          'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
        createdAt: '2025-04-28T19:08:56.437Z',
        updatedAt: '2025-07-07T17:13:39.583Z',
      },
      activo: true,
      createdAt: '2025-07-03T22:43:35.634Z',
      updatedAt: '2025-07-06T03:52:04.106Z',
    },
  ],
};

const mockPerfilResponse = { msg: 'Token inválido o expirado' };

const mockPromocionesResponse = {
  totalPromociones: 6,
  totalPaginas: 1,
  paginaActual: 1,
  promociones: [
    {
      _id: '685ddfd0abc1a72c611836b3',
      nombre: 'presentación de los productos',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751768771/promociones/xkm5qknh3fysl895xnje.png',
      createdAt: '2025-06-27T00:03:28.617Z',
      updatedAt: '2025-07-06T02:26:12.476Z',
    },
    {
      _id: '685e1637d66e6a9c394703ae',
      nombre: 'lanzamiento exclusivo',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751989556/promociones/hhkorzzmxvlnvklcbflo.png',
      createdAt: '2025-06-27T03:55:35.130Z',
      updatedAt: '2025-07-08T15:45:56.986Z',
    },
    {
      _id: '686c1b2757f1c4afea04703e',
      nombre: 'empanadas',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751915303/promociones/gwv3g7lagij8pyy7d8pe.jpg',
      createdAt: '2025-07-07T19:08:23.915Z',
      updatedAt: '2025-07-07T19:08:23.915Z',
    },
    {
      _id: '686c1b6d57f1c4afea047042',
      nombre: 'sgwgershhrwsr',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751915372/promociones/vcso1uhd4fourlmvnzup.jpg',
      createdAt: '2025-07-07T19:09:33.193Z',
      updatedAt: '2025-07-07T19:09:33.193Z',
    },
    {
      _id: '686c1bc557f1c4afea047048',
      nombre: 'ckhciyvjvpkbp €56',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751915460/promociones/ngle0dyiwcmsqismnwtx.jpg',
      createdAt: '2025-07-07T19:11:01.698Z',
      updatedAt: '2025-07-07T19:11:01.698Z',
    },
    {
      _id: '686c1fd157f1c4afea047058',
      nombre: 'bsjsbsjsbis',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751916497/promociones/aw3pxgi45lajsxfz1zeu.jpg',
      createdAt: '2025-07-07T19:28:17.748Z',
      updatedAt: '2025-07-07T19:28:17.748Z',
    },
  ],
};
