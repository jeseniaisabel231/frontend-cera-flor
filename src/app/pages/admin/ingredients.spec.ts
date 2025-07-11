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
import { IngredientsPage } from './ingredients.page';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDNjNTFmYmJjNTU2NmIzZjJiMWU0MSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzUyMDc1Njk1LCJleHAiOjE3NTIwNzkyOTV9.EK6AnekATVMbYXZLtRnuWsz4HjFhAHuohXQnKresOgE';

describe('Página de administración de ingredientes', () => {
  let component: IngredientsPage;
  let fixture: ComponentFixture<IngredientsPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', token);

    TestBed.configureTestingModule({
      imports: [IngredientsPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(IngredientsPage);
    component = fixture.componentInstance;

    const reqCategorias = httpTestingController.match(
      `${environment.urlApi}/api/categorias`,
    );

    reqCategorias.forEach((req) => {
      expect(req.request.method).toBe('GET');
      req.flush(mockCategoriesResponse);
    });

    const reqIngredientes = httpTestingController.expectOne(
			`${environment.urlApi}/api/ingredientes?page=1&limit=100`,
    );
		
    expect(reqIngredientes.request.method).toBe('GET');
    reqIngredientes.flush(mockIngredientsResponse);

		fixture.detectChanges();
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Deberían cargar las tarjetas de ingredientes', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll('[data-testid="tarjeta-ingrediente"]');

    expect(tarjetas.length).toBe(mockIngredientsResponse.ingredientes.length);

    tarjetas.forEach((tarjeta: any, index: number) => {
      const ingrediente = mockIngredientsResponse.ingredientes[index];
      expect(tarjeta.querySelector('h3').textContent.trim().toLowerCase()).toContain(
        ingrediente.nombre,
      );
      expect(tarjeta.querySelector('span').textContent).toContain(
        `$ ${ingrediente.precio}`,
      );
      expect(tarjeta.querySelector('img').src).toContain(ingrediente.imagen);
    });
  });

  it('Debería eliminar un ingrediente', () => {
    const botonSolicitud = fixture.nativeElement.querySelector(
      '[data-testid="eliminar-ingrediente"]',
    );

    expect(botonSolicitud).toBeTruthy();
    botonSolicitud.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

		const modalConfirmacion = fixture.nativeElement.querySelector(
			'[data-testid="modal-confirmacion"]',
		);

		expect(modalConfirmacion).toBeTruthy();

		const botonEliminar = modalConfirmacion.querySelector(
			'[data-testid="boton-eliminar"]',
		);

		expect(botonEliminar).toBeTruthy();
		botonEliminar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

		fixture.detectChanges();

    const reqEliminar = httpTestingController.expectOne(
      `${environment.urlApi}/api/ingredientes/${mockIngredientsResponse.ingredientes[0]._id}`,
    );

    expect(reqEliminar.request.method).toBe('DELETE');
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
