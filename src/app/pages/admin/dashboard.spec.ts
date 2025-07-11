import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { routes } from '../../app.routes';
import { DashboardPage } from './dashboard.page';

Chart.register(...registerables);

describe('Dashboard Administrativo', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', 'token-de-test');

    TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideCharts(withDefaultRegisterables()),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;

    const reqClientes = httpTestingController.expectOne(
      `${environment.urlApi}/api/admin/clientes?limit=100`,
    );

    expect(reqClientes.request.method).toBe('GET');
    reqClientes.flush(mockClientesResponse);

    fixture.detectChanges();

    const reqProductos = httpTestingController.expectOne(
      `${environment.urlApi}/api/productos?limit=100`,
    );

    expect(reqProductos.request.method).toBe('GET');
    reqProductos.flush(mockProductosResponse);

    const reqVentas = httpTestingController.expectOne(
      `${environment.urlApi}/api/ventas?limit=100`,
    );

    const fechaActual = new Date();
    const fechaFin = new Intl.DateTimeFormat('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
      .format(fechaActual)
      .split('/')
      .reverse()
      .join('-');

    fechaActual.setDate(fechaActual.getDate() - 13);

    const fechaInicio = new Intl.DateTimeFormat('es-EC', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(fechaActual)
      .split('/')
      .reverse()
      .join('-');

    expect(reqVentas.request.method).toBe('GET');
    reqVentas.flush(mockVentasResponse);

    const reqDashboard = httpTestingController.expectOne(
      `${environment.urlApi}/api/ventas/dashboard?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
    );

    expect(reqDashboard.request.method).toBe('GET');
    reqDashboard.flush(mockDashboardResponse);

    fixture.detectChanges();
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Deberían cargar los totales de clientes, ventas y productos', () => {
    const totalClientes = fixture.nativeElement.querySelector(
      '[data-testid="total-clientes"]',
    );
    const totalVentas = fixture.nativeElement.querySelector(
      '[data-testid="total-ventas"]',
    );
    const totalProductos = fixture.nativeElement.querySelector(
      '[data-testid="total-productos"]',
    );

    expect(totalClientes.textContent).toContain(
      mockClientesResponse.clientes.length,
    );
    expect(totalVentas.textContent).toContain(mockVentasResponse.ventas.length);
    expect(totalProductos.textContent).toContain(
      mockProductosResponse.productos.length,
    );
  });

  it('Deberían cargar las gráficas', () => {
    const ingresosCanvas = fixture.nativeElement.querySelector(
      '[data-testid="ingresos-canvas"]',
    );

    const productosCanvas = fixture.nativeElement.querySelector(
      '[data-testid="productos-canvas"]',
    );

    expect(ingresosCanvas).toBeTruthy();
    expect(productosCanvas).toBeTruthy();
  });
});

const mockClientesResponse = {
  totalClientes: 5,
  totalPaginas: 1,
  paginaActual: 1,
  clientes: [
    {
      _id: '68646b4c4492af792faf6ecd',
      nombre: 'John',
      apellido: 'Mata',
      genero: 'masculino',
      email: 'jhonmata0427@gmail.com',
      estado: 'inactivo',
      createdAt: '2025-07-01T23:12:12.999Z',
      updatedAt: '2025-07-08T23:35:53.329Z',
      cedula: '1726405393',
      direccion: 'barrio venceromos 2',
      telefono: '0994213545',
      fecha_nacimiento: '2003-04-27T00:00:00.000Z',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751989285/clientes/ocbngbnzqlmklhk3ttat.jpg',
      notificationPushToken: 'ExponentPushToken[6LEWXIN08tW-ihd_Qc6FIB]',
    },
    {
      _id: '686479774492af792faf78f7',
      nombre: 'Byron',
      apellido: 'Loarte',
      genero: 'Masculino',
      email: 'byrontosh08@gmail.com',
      estado: 'activo',
      createdAt: '2025-07-02T00:12:39.896Z',
      updatedAt: '2025-07-02T00:21:48.892Z',
    },
    {
      _id: '6865c860a366a35c00cde526',
      nombre: 'Estefania',
      apellido: 'Sanchez',
      genero: 'Femenino',
      email: 'estef123@yopmail.com',
      estado: 'inactivo',
      createdAt: '2025-07-03T00:01:36.055Z',
      updatedAt: '2025-07-08T15:42:44.174Z',
    },
    {
      _id: '6865e6194492af792fafb450',
      nombre: 'Jesenia Isabel',
      apellido: 'Pazto Corregidor',
      genero: 'femenino',
      email: 'jesenia.pazto@epn.edu.ec',
      estado: 'activo',
      createdAt: '2025-07-03T02:08:25.296Z',
      updatedAt: '2025-07-08T19:26:03.410Z',
      telefono: '0994231454',
      cedula: '1726405394',
      direccion: 'El Beaterio Barrio 2 divino',
      fecha_nacimiento: '2002-01-04T00:00:00.000Z',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751570139/clientes/rrwen41nfphsytkzv7pv.jpg',
      notificationPushToken: 'ExponentPushToken[nlRkqJL77hZF-MEhavtJPt]',
    },
    {
      _id: '68671c6f5e92f6237d49d212',
      nombre: 'Byron',
      apellido: 'Loarte',
      genero: 'masculino',
      email: 'byron.loarteb@epn.edu.ec',
      estado: 'inactivo',
      createdAt: '2025-07-04T00:12:31.292Z',
      updatedAt: '2025-07-08T15:42:42.709Z',
      cedula: '1723456789',
      direccion: 'Direccion 123, Calle 12',
      fecha_nacimiento: '2000-05-25T00:00:00.000Z',
      telefono: '0987654321',
    },
  ],
};

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

const mockVentasResponse = {
  totalVentas: 13,
  totalPaginas: 1,
  paginaActual: 1,
  ventas: [
    {
      _id: '686df3569a7f66d29c96f7ad',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-09T04:43:02.918Z',
      total: 3.49,
      estado: 'pendiente',
      productos: [
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
      ],
    },
    {
      _id: '686cb1059a7f66d29c96e48c',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-08T05:47:49.879Z',
      total: 11.25,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686cb09d9a7f66d29c96e373',
          tipo: 'ia',
          aroma: 'vainillia',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751953566/productos-personalizados/k1ugvqpysfuvrmm0fxns.png',
          precio: 11.25,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cad95a5a9def06fe666c',
              nombre: 'rosa',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581205/ingredientes/a90ppvthbkstgylrkrst.png',
            },
            {
              _id: '68621a7c1cfd542baabf63e7',
              nombre: 'vainillia',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259772/ingredientes/xwkxd8i5aa3jkygou3nf.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 11.25,
        },
      ],
    },
    {
      _id: '686caed09a7f66d29c96e19c',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-08T05:38:24.661Z',
      total: 11.25,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686cae2c9a7f66d29c96e08f',
          tipo: 'ia',
          aroma: 'vainillia',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751952941/productos-personalizados/lligit2nkq9rcfjfgvmq.png',
          precio: 11.25,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cb435a5a9def06fe668a',
              nombre: 'azul',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581220/ingredientes/l241ugleifbwgyqvpx0g.png',
            },
            {
              _id: '68621a7c1cfd542baabf63e7',
              nombre: 'vainillia',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259772/ingredientes/xwkxd8i5aa3jkygou3nf.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 11.25,
        },
      ],
    },
    {
      _id: '686cad049a7f66d29c96dfbe',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-08T05:30:44.122Z',
      total: 16.980000000000004,
      estado: 'pendiente',
      productos: [
        {
          producto_id: '686706dc5e92f6237d49c3e4',
          nombre: 'Jabon de te verde',
          descripcion:
            'Té Verde Vital transforma la rutina de limpieza en un instante de frescura. Con té verde como único ingrediente activo y un aroma herbal fresco, este jabón artesanal es apto para todo tipo de piel. Su fórmula suave purifica en profundidad sin resecar, dejando la piel equilibrada y revitalizada. Su formato compacto de 6cm × 6 cm y grosor de 2.5 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582428/productos/r8tk8owx5awlrxwmlivz.jpg',
          precio: 2.45,
          cantidad: 1,
          subtotal: 2.45,
        },
        {
          producto_id: '686706385e92f6237d49c3b8',
          nombre: 'Jabon de coco',
          descripcion:
            'Coco & Karité es un jabón 100 % natural, formulado con aceite de coco y manteca de karité, diseñado especialmente para piel seca. Su delicada espuma nutre y repara la barrera cutánea, mientras su suave aroma tropical transporta los sentidos a un oasis de bienestar. Su formato compacto de 8cm × 5 cm y grosor de 3 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582264/productos/o3uyqssg5k0vbazcqaxl.jpg',
          precio: 3.24,
          cantidad: 1,
          subtotal: 3.24,
        },
        {
          producto_id: '6863ea328c06c2a2134d5ccb',
          nombre: 'Jabón De Flores',
          descripcion:
            'Jabón con nutrientes especiales único y favorecedor para la piel ya que te la deja brillando y con un acabo único.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751404315/productos/sehzoxqapbf76wtz7znd.png',
          precio: 2.6,
          cantidad: 3,
          subtotal: 7.800000000000001,
        },
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
      ],
    },
    {
      _id: '686b20de57f1c4afea0441c5',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T01:20:30.358Z',
      total: 24.990000000000002,
      estado: 'pendiente',
      productos: [
        {
          producto_id: '686b20b957f1c4afea044163',
          tipo: 'ia',
          aroma: 'romero ii',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751851194/productos-personalizados/lnje4zfuudylozyepkaj.png',
          precio: 11,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850ca985a5a9def06fe6657',
              nombre: 'amarillo',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405252/ingredientes/d6nwnfthipwwdq9kp1is.png',
            },
            {
              _id: '6850cd8c5a5a9def06fe66b4',
              nombre: 'romero ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125963/ingredientes/cugqix0blufqbazfdaiy.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 11,
        },
        {
          producto_id: '686b20a157f1c4afea044143',
          tipo: 'personalizado',
          aroma: 'miel',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751851170/productos-personalizados/uip1vtl0ip654ryyf1th.png',
          precio: 10.5,
          categoria: 'Jabones artesanales',
          ingredientes: [
            {
              _id: '6850502d5a5a9def06fe65cc',
              nombre: 'cuadrado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
            },
            {
              _id: '685e1491d66e6a9c39470389',
              nombre: 'dorado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750996113/ingredientes/fxsb6k3eyqcs6wkurqim.png',
            },
            {
              _id: '686219c11cfd542baabf63d9',
              nombre: 'miel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259585/ingredientes/ytk8zazclpa6pb21upzy.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 10.5,
        },
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
      ],
    },
    {
      _id: '686b204257f1c4afea044085',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T01:17:54.304Z',
      total: 25.490000000000002,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686b1fe357f1c4afea043fd4',
          tipo: 'personalizado',
          aroma: 'flores',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850980/productos-personalizados/l1chb0s2ou6eldfiayq8.png',
          precio: 11.5,
          categoria: 'Jabones artesanales',
          ingredientes: [
            {
              _id: '6850502d5a5a9def06fe65cc',
              nombre: 'cuadrado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
            },
            {
              _id: '685e13dbd66e6a9c39470379',
              nombre: 'turquesa',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581398/ingredientes/cs2ysfpmntafazweduxu.png',
            },
            {
              _id: '684cacadc10c57cbea932ed8',
              nombre: 'flores',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
            },
            {
              _id: '685471662f866ebc585d98aa',
              nombre: 'menta ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
            },
            {
              _id: '6854701a2f866ebc585d9881',
              nombre: 'canela',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
            },
          ],
          cantidad: 1,
          subtotal: 11.5,
        },
        {
          producto_id: '686b1fd057f1c4afea043fba',
          tipo: 'ia',
          aroma: 'café',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850961/productos-personalizados/iilf5mpfn76svuhchffn.png',
          precio: 10.5,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cab85a5a9def06fe6662',
              nombre: 'rojo',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355629/ingredientes/zfjo9p7gkiupaoqxfmzd.png',
            },
            {
              _id: '68621acc1cfd542baabf63eb',
              nombre: 'café',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259850/ingredientes/dtxghrb2wrfdrneae149.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 10.5,
        },
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
      ],
    },
    {
      _id: '686b1f3757f1c4afea043db4',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T01:13:27.136Z',
      total: 25.240000000000002,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686b1f0957f1c4afea043d52',
          tipo: 'personalizado',
          aroma: 'flores',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850762/productos-personalizados/enkt1fhoez7og1ouy6tg.png',
          precio: 12.5,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cb435a5a9def06fe668a',
              nombre: 'azul',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581220/ingredientes/l241ugleifbwgyqvpx0g.png',
            },
            {
              _id: '684cacadc10c57cbea932ed8',
              nombre: 'flores',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
            },
            {
              _id: '685471662f866ebc585d98aa',
              nombre: 'menta ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
            },
            {
              _id: '685471a72f866ebc585d98b4',
              nombre: 'árbol de té',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364583/ingredientes/l4da3gkrxcbqiuujodjm.png',
            },
          ],
          cantidad: 1,
          subtotal: 12.5,
        },
        {
          producto_id: '686b1eed57f1c4afea043d35',
          tipo: 'ia',
          aroma: 'vainillia',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850734/productos-personalizados/eyqc1isj55sq8hfxw7iz.png',
          precio: 9.25,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '685e1491d66e6a9c39470389',
              nombre: 'dorado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750996113/ingredientes/fxsb6k3eyqcs6wkurqim.png',
            },
            {
              _id: '68621a7c1cfd542baabf63e7',
              nombre: 'vainillia',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259772/ingredientes/xwkxd8i5aa3jkygou3nf.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 9.25,
        },
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
      ],
    },
    {
      _id: '686b1ecd57f1c4afea043ce7',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T01:11:41.468Z',
      total: 38,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686b1e6d57f1c4afea043bff',
          tipo: 'ia',
          aroma: 'miel',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850606/productos-personalizados/vmrlwjs22zvtw6tug97a.png',
          precio: 12.5,
          categoria: 'Jabones artesanales',
          ingredientes: [
            {
              _id: '6850502d5a5a9def06fe65cc',
              nombre: 'cuadrado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
            },
            {
              _id: '6850cad95a5a9def06fe666c',
              nombre: 'rosa',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581205/ingredientes/a90ppvthbkstgylrkrst.png',
            },
            {
              _id: '686219c11cfd542baabf63d9',
              nombre: 'miel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259585/ingredientes/ytk8zazclpa6pb21upzy.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 2,
          subtotal: 25,
        },
        {
          producto_id: '686b1e7e57f1c4afea043c19',
          tipo: 'personalizado',
          aroma: 'menta',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850623/productos-personalizados/owthudecv5mbrfhl6bcn.png',
          precio: 13,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cab85a5a9def06fe6662',
              nombre: 'rojo',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355629/ingredientes/zfjo9p7gkiupaoqxfmzd.png',
            },
            {
              _id: '6850cd455a5a9def06fe66aa',
              nombre: 'menta',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125893/ingredientes/yqz85xjr1wpfppvrpb81.png',
            },
            {
              _id: '685471662f866ebc585d98aa',
              nombre: 'menta ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
            },
            {
              _id: '6854701a2f866ebc585d9881',
              nombre: 'canela',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
            },
          ],
          cantidad: 1,
          subtotal: 13,
        },
      ],
    },
    {
      _id: '686b1dd657f1c4afea043b7c',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T01:07:34.620Z',
      total: 27.990000000000002,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
        {
          producto_id: '686b1db257f1c4afea043b35',
          tipo: 'personalizado',
          aroma: 'flores',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850419/productos-personalizados/vedqxlflzkbnb9zpp1zg.png',
          precio: 12.5,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cad95a5a9def06fe666c',
              nombre: 'rosa',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581205/ingredientes/a90ppvthbkstgylrkrst.png',
            },
            {
              _id: '684cacadc10c57cbea932ed8',
              nombre: 'flores',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
            },
            {
              _id: '685471662f866ebc585d98aa',
              nombre: 'menta ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
            },
            {
              _id: '685471a72f866ebc585d98b4',
              nombre: 'árbol de té',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364583/ingredientes/l4da3gkrxcbqiuujodjm.png',
            },
          ],
          cantidad: 1,
          subtotal: 12.5,
        },
        {
          producto_id: '686b1d9f57f1c4afea043b1b',
          tipo: 'ia',
          aroma: 'romero ii',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751850400/productos-personalizados/pxtalrxmq2ilk1l8ro1f.png',
          precio: 12,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cab85a5a9def06fe6662',
              nombre: 'rojo',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355629/ingredientes/zfjo9p7gkiupaoqxfmzd.png',
            },
            {
              _id: '6850cd8c5a5a9def06fe66b4',
              nombre: 'romero ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125963/ingredientes/cugqix0blufqbazfdaiy.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 12,
        },
      ],
    },
    {
      _id: '686b1c2157f1c4afea0437c6',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T01:00:17.192Z',
      total: 27,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686b1bff57f1c4afea043785',
          tipo: 'personalizado',
          aroma: 'flores',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751849984/productos-personalizados/ojjvlif2xcicgo8z7zsa.png',
          precio: 13.5,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '685f14eed66e6a9c394738bd',
              nombre: 'cafe',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751061741/ingredientes/zhabza5pqkd3ws4ainsi.png',
            },
            {
              _id: '684cacadc10c57cbea932ed8',
              nombre: 'flores',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
            },
            {
              _id: '6854701a2f866ebc585d9881',
              nombre: 'canela',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
            },
            {
              _id: '685471662f866ebc585d98aa',
              nombre: 'menta ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
            },
          ],
          cantidad: 1,
          subtotal: 13.5,
        },
        {
          producto_id: '686b1be657f1c4afea04376b',
          tipo: 'ia',
          aroma: 'café',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751849959/productos-personalizados/qvppquycazqdksifrznn.png',
          precio: 13.5,
          categoria: 'Jabones artesanales',
          ingredientes: [
            {
              _id: '6850502d5a5a9def06fe65cc',
              nombre: 'cuadrado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
            },
            {
              _id: '685f14eed66e6a9c394738bd',
              nombre: 'cafe',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751061741/ingredientes/zhabza5pqkd3ws4ainsi.png',
            },
            {
              _id: '68621acc1cfd542baabf63eb',
              nombre: 'café',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259850/ingredientes/dtxghrb2wrfdrneae149.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 13.5,
        },
      ],
    },
    {
      _id: '686b1af657f1c4afea04368d',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T00:55:18.632Z',
      total: 22,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686b186557f1c4afea04357a',
          tipo: 'personalizado',
          aroma: 'flores',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751849062/productos-personalizados/qnw2tbgtdgqnozzmhgqz.png',
          precio: 11.5,
          categoria: 'Velas artesanales',
          ingredientes: [
            {
              _id: '68531f902f866ebc585d93d6',
              nombre: 'corazón ardiente',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
            },
            {
              _id: '6850cab85a5a9def06fe6662',
              nombre: 'rojo',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751355629/ingredientes/zfjo9p7gkiupaoqxfmzd.png',
            },
            {
              _id: '684cacadc10c57cbea932ed8',
              nombre: 'flores',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
            },
            {
              _id: '685471662f866ebc585d98aa',
              nombre: 'menta ii',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
            },
            {
              _id: '6854701a2f866ebc585d9881',
              nombre: 'canela',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
            },
          ],
          cantidad: 1,
          subtotal: 11.5,
        },
        {
          producto_id: '686b185057f1c4afea043560',
          tipo: 'ia',
          aroma: 'miel',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751849041/productos-personalizados/mrcqjd7icbzaydlgvhul.png',
          precio: 10.5,
          categoria: 'Jabones artesanales',
          ingredientes: [
            {
              _id: '6850502d5a5a9def06fe65cc',
              nombre: 'cuadrado',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
            },
            {
              _id: '6850ca985a5a9def06fe6657',
              nombre: 'amarillo',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405252/ingredientes/d6nwnfthipwwdq9kp1is.png',
            },
            {
              _id: '686219c11cfd542baabf63d9',
              nombre: 'miel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259585/ingredientes/ytk8zazclpa6pb21upzy.png',
            },
            {
              _id: '685b2e6d52d1afb30db2cf7d',
              nombre: 'manzanilla',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
            },
            {
              _id: '685471f42f866ebc585d98c9',
              nombre: 'laurel',
              imagen:
                'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
            },
          ],
          cantidad: 1,
          subtotal: 10.5,
        },
      ],
    },
    {
      _id: '686b16d857f1c4afea04349a',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T00:37:44.435Z',
      total: 3.49,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '686705675e92f6237d49c3af',
          nombre: 'Jabon de miel natural',
          descripcion:
            'El jabón de miel natural está elaborado con miel pura al 100 %. Su espuma ligera envuelve la piel delicada o seca en una caricia nutritiva y su aroma dulce y auténtico transforma cada lavado en un momento de puro disfrute. Su formato compacto de 6cm × 8.6 cm y grosor de 2.8 cm lo hace cómodo y práctico para el uso cotidiano.',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751582054/productos/s4rdc8ri1d4xqw9qkqbt.jpg',
          precio: 3.49,
          cantidad: 1,
          subtotal: 3.49,
        },
      ],
    },
    {
      _id: '686b164a57f1c4afea043441',
      cliente: {
        _id: '6865e6194492af792fafb450',
        nombre: 'Jesenia Isabel',
        apellido: 'Pazto Corregidor',
        email: 'jesenia.pazto@epn.edu.ec',
        telefono: '0994231454',
        cedula: '1726405394',
        direccion: 'El Beaterio Barrio 2 divino',
      },
      fecha_venta: '2025-07-07T00:35:22.215Z',
      total: 4.85,
      estado: 'finalizado',
      productos: [
        {
          producto_id: '6864495a4492af792faf6768',
          nombre: 'Vela Fuego Ardiente',
          descripcion: 'Vela grande y aromatizante que ambienta tu casa',
          imagen:
            'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751756871/productos/hfkrrfzekcvsziciopbm.jpg',
          precio: 4.85,
          cantidad: 1,
          subtotal: 4.85,
        },
      ],
    },
  ],
};

const mockDashboardResponse = {
  numeroClientes: 5,
  ventasDiarias: [
    {
      fecha: '26/06/2025',
      totalVentas: 0,
    },
    {
      fecha: '27/06/2025',
      totalVentas: 0,
    },
    {
      fecha: '28/06/2025',
      totalVentas: 0,
    },
    {
      fecha: '29/06/2025',
      totalVentas: 0,
    },
    {
      fecha: '30/06/2025',
      totalVentas: 0,
    },
    {
      fecha: '01/07/2025',
      totalVentas: 0,
    },
    {
      fecha: '02/07/2025',
      totalVentas: 0,
    },
    {
      fecha: '03/07/2025',
      totalVentas: 0,
    },
    {
      fecha: '04/07/2025',
      totalVentas: 0,
    },
    {
      fecha: '05/07/2025',
      totalVentas: 0,
    },
    {
      fecha: '06/07/2025',
      totalVentas: 0,
    },
    {
      fecha: '07/07/2025',
      totalVentas: 174.06000000000003,
    },
    {
      fecha: '08/07/2025',
      totalVentas: 22.5,
    },
    {
      fecha: '09/07/2025',
      totalVentas: 0,
    },
  ],
  ventasPorCategoria: [
    {
      categoría: 'jabones',
      vendidos: 10,
    },
    {
      categoría: 'velas',
      vendidos: 10,
    },
  ],
};
