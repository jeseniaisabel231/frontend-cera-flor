import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { routes } from '../../app.routes';
import { ShoppingPage } from './shopping.page';

describe('Página de administración de facturas', () => {
  let component: ShoppingPage;
  let fixture: ComponentFixture<ShoppingPage>;
  let httpTestingController: HttpTestingController;

	let tablaVentas: HTMLTableElement;

  beforeEach(async () => {
    localStorage.setItem('token', 'token-de-prueba');
    TestBed.configureTestingModule({
      imports: [ShoppingPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    
		fixture = TestBed.createComponent(ShoppingPage);
    component = fixture.componentInstance;
    
		const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/ventas`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockShoppingResponse);
    
		fixture.detectChanges();

  });
	
	it('Debería cargar la página', () => {
		expect(component).toBeTruthy();
	});
	
	it('Debería cargar la tabla con las ventas', () => {
		tablaVentas = fixture.nativeElement.querySelector(
			'[data-testid="tabla-ventas"]',
		);
		expect(tablaVentas).toBeTruthy();
		
		const filas = tablaVentas.querySelectorAll('tr');
		
		expect(filas.length).toBe(mockShoppingResponse.ventas.length + 1); // +1 por la fila de encabezado
	});

	it('Debería actualizar el estado de una venta', () => {
		tablaVentas = fixture.nativeElement.querySelector(
			'[data-testid="tabla-ventas"]',
		);

		const filas = tablaVentas.querySelectorAll('tr');

		const fila = filas[1];
		expect(fila).toBeTruthy();

		const estadoActual = filas[1].querySelector(
      '[data-testid="dato-estado"]',
    )?.textContent;
    const estaPendiente = estadoActual === 'pendiente';

    const botonActualizarEstado = filas[1].querySelector(
      '[data-testid="boton-estado"]',
    ) as HTMLButtonElement;

    expect(botonActualizarEstado).toBeTruthy();

    botonActualizarEstado.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    const modal = tablaVentas.querySelector('[data-testid="modal-avisos"]');
    expect(modal).toBeTruthy();

    const botonAceptar = modal?.querySelector(
      '[data-testid="boton-aceptar"]',
    ) as HTMLButtonElement;
    expect(botonAceptar).toBeTruthy();
    expect(botonAceptar.textContent?.trim()).toBe('Aceptar');

    botonAceptar.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

		const req = httpTestingController.expectOne(
			`${environment.urlApi}/api/ventas/${mockShoppingResponse.ventas[0]._id}`,
		);
		expect(req.request.method).toBe('PUT');
		req.flush({ venta: { ...mockShoppingResponse.ventas[0], estado: estaPendiente ? 'finalizado' : 'pendiente' } });

		fixture.detectChanges();

		const nuevoEstado = filas[1].querySelector(
			'[data-testid="dato-estado"]',
		)?.textContent?.trim();

		expect(nuevoEstado).toBe(estaPendiente ? 'finalizado' : 'pendiente');
	});

});

const mockShoppingResponse = {
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
