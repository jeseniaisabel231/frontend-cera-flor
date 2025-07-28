import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { routes } from '../app.routes';
import type { ingrediente } from '../interfaces/ingrediente.interface';
import { WorkshopGamePage } from './workshopGame.page';
import type { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('Página de taller de personalización', () => {
  let component: WorkshopGamePage;
  let fixture: ComponentFixture<WorkshopGamePage>;

  let httpTestingController: HttpTestingController;

  let moldes: NodeListOf<HTMLElement>;
  let colores: NodeListOf<HTMLImageElement>;
  let aromas: NodeListOf<HTMLElement>;
  let esencias: NodeListOf<HTMLElement>;

  let dropMoldeColor: HTMLElement;
  let dropAroma: HTMLElement;
  let dropEsencia: HTMLElement;

  let mockMoldes: ingrediente[] = [];
  let mockColores: ingrediente[] = [];
  let mockAromas: ingrediente[] = [];
  let mockEsencias: ingrediente[] = [];

  beforeEach(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjVlNjE5NDQ5MmFmNzkyZmFmYjQ1MCIsIm5vbWJyZSI6Ikplc2VuaWEgSXNhYmVsIiwiaWF0IjoxNzUyMjcyNDQyLCJleHAiOjE3NTIzNTg4NDJ9.kmIrQ1Xb7UBSaVTRM2QidG_5lYXJolc3siWM7JwOFRE',
    );
    TestBed.configureTestingModule({
      imports: [WorkshopGamePage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(WorkshopGamePage);
    component = fixture.componentInstance;

    httpTestingController = TestBed.inject(HttpTestingController);

    const reqIngredientes = httpTestingController.expectOne(
      ({ method, url }) =>
        method === 'GET' &&
        url === `${environment.urlApi}/api/ingredientes?page=1&limit=100`,
    );
    reqIngredientes.flush(mockIngredientsResponse);

    const reqCategorias = httpTestingController.expectOne(
      ({ method, url }) =>
        method === 'GET' && url === `${environment.urlApi}/api/categorias`,
    );
    reqCategorias.flush(mockCategoriesResponse);

    fixture.componentRef.setInput(
      'categoria',
      mockCategoriesResponse.categorias[0]._id,
    );

    fixture.detectChanges();

    moldes = fixture.nativeElement.querySelectorAll('[data-testid="molde"]');
    colores = fixture.nativeElement.querySelectorAll('[data-testid="color"]');
    aromas = fixture.nativeElement.querySelectorAll('[data-testid="aroma"]');
    esencias = fixture.nativeElement.querySelectorAll(
      '[data-testid="esencia"]',
    );

    dropMoldeColor = fixture.nativeElement.querySelector(
      '[data-testid="drop-list-molde-color"]',
    );
    dropAroma = fixture.nativeElement.querySelector(
      '[data-testid="drop-list-aroma"]',
    );
    dropEsencia = fixture.nativeElement.querySelector(
      '[data-testid="drop-list-esencias"]',
    );
  });

  beforeAll(() => {
    mockIngredientsResponse.ingredientes.forEach((ingrediente: ingrediente) => {
      const { id_categoria, tipo } = ingrediente;
      const categoriaSeleccionada = mockCategoriesResponse.categorias[0]._id;

      if (
        Array.isArray(id_categoria) &&
        id_categoria.includes(categoriaSeleccionada)
      ) {
        switch (tipo) {
          case 'molde':
            mockMoldes.push(ingrediente);
            break;
          case 'color':
            mockColores.push(ingrediente);
            break;
          case 'aroma':
            mockAromas.push(ingrediente);
            break;
          case 'esencia':
            mockEsencias.push(ingrediente);
            break;
        }
      }
    });
  });

  it('Debería cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería ver los ingredientes disponibles y la mesa de trabajo en el juego', () => {
    expect(moldes.length).toBeGreaterThan(0);
    expect(colores.length).toBeGreaterThan(0);
    expect(aromas.length).toBeGreaterThan(0);
    expect(esencias.length).toBeGreaterThan(0);

    moldes.forEach((molde, index) => {
      const img = molde.querySelector('img') as HTMLImageElement;
      expect(img.src).toBe(mockMoldes[index].imagen);
    });

    colores.forEach((color, index) => {
      expect(color.src).toBe(mockColores[index].imagen);
    });

    aromas.forEach((aroma, index) => {
      const img = aroma.querySelector('img') as HTMLImageElement;
      expect(img.src).toBe(mockAromas[index].imagen);
    });

    esencias.forEach((esencia, index) => {
      const img = esencia.querySelector('img') as HTMLImageElement;
      expect(img.src).toBe(mockEsencias[index].imagen);
    });

    expect(dropMoldeColor).toBeTruthy();
    expect(dropAroma).toBeTruthy();
    expect(dropEsencia).toBeTruthy();

    expect(dropMoldeColor.innerHTML).toContain(
      'Arrastra un molde y un color aquí',
    );
    expect(dropAroma.innerHTML).toContain('Arrastra un aroma aquí');
    expect(dropEsencia.innerHTML).toContain(
      'Arrastra unicamente 2 esencias aquí',
    );
  });

  it('Debería arrastrar y soltar ingredientes en la mesa de trabajo, y crear el producto personalizado', () => {
    const mockDropMoldeEvent: CdkDragDrop<string[]> = {
      previousIndex: 0,
      currentIndex: 1,
      item: { data: mockMoldes[0] } as any,
      previousContainer: { id: 'moldes', data: component.moldes } as any,
      container: {
        id: 'moldesMesa',
        data: component.moldesSeleccionados,
      } as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: new MouseEvent('mouseup'),
    };

    component.dropMoldes(mockDropMoldeEvent);

    fixture.detectChanges();

    expect(component.moldesSeleccionados[0]).toBe(mockMoldes[0]);
  	expect(component.moldes.length).toBe(mockMoldes.length - 1);

  	const mockDropColorEvent: CdkDragDrop<string[]> = {
      previousIndex: 0,
      currentIndex: 1,
      item: { data: mockColores[0] } as any,
      previousContainer: { id: 'colores', data: component.colores } as any,
      container: {
        id: 'moldesMesa',
        data: component.moldesSeleccionados,
      } as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: new MouseEvent('mouseup'),
    };

  	component.dropColores(mockDropColorEvent);

  	fixture.detectChanges();

  	expect(component.coloresSeleccionados[0]).toBe(mockColores[0]);
  	expect(component.colores.length).toBe(mockColores.length - 1);

  	const mockDropAromaEvent: CdkDragDrop<string[]> = {
  		previousIndex: 0,
  		currentIndex: 1,
  		item: { data: mockAromas[0] } as any,
  		previousContainer: { id: 'aromas', data: component.aromas } as any,
  		container: {
  			id: 'aromasMesa',
  			data: component.aromasSeleccionados,
  		} as any,
  		isPointerOverContainer: true,
  		distance: { x: 0, y: 0 },
  		dropPoint: { x: 0, y: 0 },
  		event: new MouseEvent('mouseup'),
  	};
  	component.dropAromas(mockDropAromaEvent);

  	fixture.detectChanges();

  	expect(component.aromasSeleccionados[0]).toBe(mockAromas[0]);
  	expect(component.aromas.length).toBe(mockAromas.length - 1);

  	const mockDropEsenciaEvent: CdkDragDrop<string[]> = {
  		previousIndex: 0,
  		currentIndex: 1,
  		item: { data: mockEsencias[0] } as any,
  		previousContainer: { id: 'esencias', data: component.esencias } as any,
  		container: {
  			id: 'esenciasMesa',
  			data: component.esenciasSeleccionadas,
  		} as any,
  		isPointerOverContainer: true,
  		distance: { x: 0, y: 0 },
  		dropPoint: { x: 0, y: 0 },
  		event: new MouseEvent('mouseup'),
  	};
  	component.dropEsencias(mockDropEsenciaEvent);

  	fixture.detectChanges();

  	expect(component.esenciasSeleccionadas[0]).toBe(mockEsencias[0]);
  	expect(component.esencias.length).toBe(mockEsencias.length - 1);

  	const mockDropEsenciaEvent2: CdkDragDrop<string[]> = {
  		previousIndex: 0,
  		currentIndex: 1,
  		item: { data: mockEsencias[1] } as any,
  		previousContainer: { id: 'esencias', data: component.esencias } as any,
  		container: {
  			id: 'esenciasMesa',
  			data: component.esenciasSeleccionadas,
  		} as any,
  		isPointerOverContainer: true,
  		distance: { x: 0, y: 0 },
  		dropPoint: { x: 0, y: 0 },
  		event: new MouseEvent('mouseup'),
  	};

  	component.dropEsencias(mockDropEsenciaEvent2);

  	fixture.detectChanges();

  	expect(component.esenciasSeleccionadas[1]).toBe(mockEsencias[1]);
  	expect(component.esencias.length).toBe(mockEsencias.length - 2);

  	const botonFinalizar = fixture.nativeElement.querySelector(
  		'[data-testid="finalizar-creacion"]',
  	);

  	expect(botonFinalizar).toBeTruthy();

  	botonFinalizar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  	fixture.detectChanges();

  	const reqFinalizar = httpTestingController.expectOne(
  		({ method, url }) => method === 'POST' && url === `${environment.urlApi}/api/productos-personalizados`
  	);
  	expect(reqFinalizar.request.body).toEqual({
  		id_categoria: mockCategoriesResponse.categorias[0]._id,
  		tipo_producto: 'personalizado',
  		ingredientes: [
  			...component.moldesSeleccionados,
  			...component.coloresSeleccionados,
  			...component.aromasSeleccionados,
  			...component.esenciasSeleccionadas,
  		],
  	});

  	reqFinalizar.flush({});
  });

  // it('Debería obtener una recomendación de Inteligencia Artificial', () => {
  //   const botonRecomendacion = fixture.nativeElement.querySelector(
  //     '[data-testid="recomendacion-inteligencia-artificial"]',
  //   );

  //   expect(botonRecomendacion).toBeTruthy();

  //   botonRecomendacion.dispatchEvent(
  //     new MouseEvent('click', { bubbles: true }),
  //   );

  //   fixture.detectChanges();

  //   const reqRecomendacion = httpTestingController.expectOne(
  //     ({ method, url }) =>
  //       method === 'POST' &&
  //       url === `${environment.urlApi}/api/productos/recomendacion`,
  //   );

  //   expect(reqRecomendacion.request.body).toEqual({
  //     id_categoria: mockCategoriesResponse.categorias[0]._id,
  //   });

  //   reqRecomendacion.flush(mockInteligenciaArtificialResponse);

  //   fixture.detectChanges();

  //   expect(component.moldesSeleccionados?.length).toBe(1);
  //   expect(component.coloresSeleccionados?.length).toBe(1);
  //   expect(component.aromasSeleccionados?.length).toBe(1);
  //   expect(component.esenciasSeleccionadas?.length).toBe(2);

  //   const botonFinalizar = fixture.nativeElement.querySelector(
  //     '[data-testid="finalizar-creacion"]',
  //   );

  //   botonFinalizar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  //   fixture.detectChanges();

  //   const reqFinalizar = httpTestingController.expectOne(
  //     ({ method, url }) =>
  //       method === 'POST' &&
  //       url === `${environment.urlApi}/api/productos-personalizados`,
  //   );
  //   expect(reqFinalizar.request.body).toEqual({
  //     id_categoria: mockCategoriesResponse.categorias[0]._id,
  //     tipo_producto: 'ia',
  //     ingredientes: [
  //       ...component.moldesSeleccionados,
  //       ...component.coloresSeleccionados,
  //       ...component.aromasSeleccionados,
  //       ...component.esenciasSeleccionadas,
  //     ],
  //   });

  //   reqFinalizar.flush({});
  // });
});

const mockIngredientsResponse = {
  ingredientes: [
    {
      _id: '684cacadc10c57cbea932ed8',
      nombre: 'flores',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751377855/ingredientes/w67q0rsbcw8jhzvzqqir.png',
      stock: 28,
      precio: 1.5,
      tipo: 'aroma',
      createdAt: '2025-06-13T22:56:45.050Z',
      updatedAt: '2025-07-11T05:41:40.571Z',
    },
    {
      _id: '68504f4b5a5a9def06fe65a1',
      nombre: 'eucalipto',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751344196/ingredientes/jm9glhn1k7qbnxfqbwbo.png',
      stock: 55,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-16T17:07:23.472Z',
      updatedAt: '2025-07-11T05:24:53.513Z',
    },
    {
      _id: '68504f6a5a5a9def06fe65ab',
      nombre: 'lavanda',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364042/ingredientes/pmdpmq3e9on40twtlmu5.png',
      stock: 60,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-16T17:07:54.450Z',
      updatedAt: '2025-07-11T05:25:04.341Z',
    },
    {
      _id: '6850502d5a5a9def06fe65cc',
      nombre: 'cuadrado',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png',
      stock: 86,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-16T17:11:09.377Z',
      updatedAt: '2025-07-11T05:20:04.485Z',
    },
    {
      _id: '685050585a5a9def06fe65dc',
      nombre: 'rectangular',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750093911/ingredientes/ehkj4hs0zfbafenjcsft.png',
      stock: 77,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-16T17:11:52.165Z',
      updatedAt: '2025-07-11T05:20:11.838Z',
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
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211452/ingredientes/t2idg0ma5h2ja2etr9vz.png',
      stock: 70,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-17T01:54:01.120Z',
      updatedAt: '2025-07-11T05:24:13.560Z',
    },
    {
      _id: '6850cad95a5a9def06fe666c',
      nombre: 'rosa',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211461/ingredientes/ml16vp4q6mkpxiewembo.png',
      stock: 89,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-17T01:54:33.996Z',
      updatedAt: '2025-07-11T05:41:41.046Z',
    },
    {
      _id: '6850cb1a5a5a9def06fe6680',
      nombre: 'verde',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211469/ingredientes/dksmmdhymropknselhtv.png',
      stock: 80,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-17T01:55:38.457Z',
      updatedAt: '2025-07-11T05:24:30.382Z',
    },
    {
      _id: '6850cb435a5a9def06fe668a',
      nombre: 'azul',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751581220/ingredientes/l241ugleifbwgyqvpx0g.png',
      stock: 85,
      precio: 3,
      tipo: 'color',
      createdAt: '2025-06-17T01:56:19.192Z',
      updatedAt: '2025-07-11T04:18:15.125Z',
    },
    {
      _id: '6850cd455a5a9def06fe66aa',
      nombre: 'menta',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125893/ingredientes/yqz85xjr1wpfppvrpb81.png',
      stock: 80,
      precio: 1.6,
      tipo: 'aroma',
      createdAt: '2025-06-17T02:04:53.984Z',
      updatedAt: '2025-07-11T05:41:41.114Z',
    },
    {
      _id: '6850cd8c5a5a9def06fe66b4',
      nombre: 'romero ii',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750125963/ingredientes/cugqix0blufqbazfdaiy.png',
      stock: 83,
      precio: 1.53,
      tipo: 'aroma',
      createdAt: '2025-06-17T02:06:04.062Z',
      updatedAt: '2025-07-11T05:26:33.396Z',
    },
    {
      _id: '6850cddf5a5a9def06fe66be',
      nombre: 'romero',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364062/ingredientes/lvghczjocx7e0hnienox.png',
      stock: 74,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-17T02:07:27.882Z',
      updatedAt: '2025-07-11T05:25:16.072Z',
    },
    {
      _id: '68531f902f866ebc585d93d6',
      nombre: 'corazón ardiente',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750278032/ingredientes/jumsuvj31xeoz9xsixsl.png',
      stock: 61,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-18T20:20:32.583Z',
      updatedAt: '2025-07-11T05:41:40.978Z',
    },
    {
      _id: '68546ffa2f866ebc585d9877',
      nombre: 'limón',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364154/ingredientes/yesmkjz8uryjntxpmvui.png',
      stock: 93,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:15:54.699Z',
      updatedAt: '2025-07-11T05:25:23.367Z',
    },
    {
      _id: '6854701a2f866ebc585d9881',
      nombre: 'canela',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364185/ingredientes/m6jqyk9grvvzpr4wz9kg.png',
      stock: 78,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:16:26.381Z',
      updatedAt: '2025-07-11T05:41:41.182Z',
    },
    {
      _id: '685471662f866ebc585d98aa',
      nombre: 'menta ii',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364518/ingredientes/iblmwmy97pemrlfrhqw7.png',
      stock: 84,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:21:58.702Z',
      updatedAt: '2025-07-11T05:41:41.251Z',
    },
    {
      _id: '685471a72f866ebc585d98b4',
      nombre: 'árbol de té',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364583/ingredientes/l4da3gkrxcbqiuujodjm.png',
      stock: 83,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:23:03.882Z',
      updatedAt: '2025-07-11T05:25:45.856Z',
    },
    {
      _id: '685471cb2f866ebc585d98be',
      nombre: 'coco',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364619/ingredientes/pq2rq6z8zciqae1zmdlt.png',
      stock: 88,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:23:39.962Z',
      updatedAt: '2025-07-11T05:25:52.859Z',
    },
    {
      _id: '685471f42f866ebc585d98c9',
      nombre: 'laurel',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png',
      stock: 60,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-19T20:24:20.500Z',
      updatedAt: '2025-07-11T05:41:40.707Z',
    },
    {
      _id: '685472f42f866ebc585d98d3',
      nombre: 'cubo de corazón',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364916/ingredientes/pvsmgpeqhglxzczwx5yb.png',
      stock: 89,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:28:36.896Z',
      updatedAt: '2025-07-11T05:22:00.652Z',
    },
    {
      _id: '685473752f866ebc585d98de',
      nombre: 'torre',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365044/ingredientes/avny3dv79eeck4ldreok.png',
      stock: 93,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:30:45.115Z',
      updatedAt: '2025-07-11T05:22:08.296Z',
    },
    {
      _id: '685473ee2f866ebc585d98e8',
      nombre: 'imán',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365166/ingredientes/h5myplmgwiqkhof1eulr.png',
      stock: 17,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:32:46.983Z',
      updatedAt: '2025-07-11T05:22:15.318Z',
    },
    {
      _id: '685474332f866ebc585d98f3',
      nombre: 'serpientes',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365235/ingredientes/vbnipp8jq2vt3ctehaip.png',
      stock: 16,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:33:55.956Z',
      updatedAt: '2025-07-11T05:22:22.462Z',
    },
    {
      _id: '6854745c2f866ebc585d98fd',
      nombre: 'cilíndrico',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365276/ingredientes/qciahadi0xdnhdr1qmfg.png',
      stock: 80,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:34:36.776Z',
      updatedAt: '2025-07-11T05:22:29.839Z',
    },
    {
      _id: '685474862f866ebc585d9907',
      nombre: 'hexágono',
      id_categoria: ['6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365317/ingredientes/akvqlc60spkxgvmohycz.png',
      stock: 11,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:35:18.216Z',
      updatedAt: '2025-07-11T05:22:37.041Z',
    },
    {
      _id: '6854749e2f866ebc585d9911',
      nombre: 'estrella',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365342/ingredientes/qsobzocnwxbferrq3bk8.png',
      stock: 81,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:35:42.930Z',
      updatedAt: '2025-07-11T05:41:40.434Z',
    },
    {
      _id: '685474d52f866ebc585d991d',
      nombre: 'corazón',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365397/ingredientes/d0zdctkzxjhpoertjbqf.png',
      stock: 16,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:36:37.539Z',
      updatedAt: '2025-07-11T05:22:51.217Z',
    },
    {
      _id: '685474ee2f866ebc585d9927',
      nombre: 'redondo',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750365421/ingredientes/fbkshkoad6h14aejmqpp.png',
      stock: 9,
      precio: 1,
      tipo: 'molde',
      createdAt: '2025-06-19T20:37:02.151Z',
      updatedAt: '2025-07-11T05:22:58.498Z',
    },
    {
      _id: '685b2e6d52d1afb30db2cf7d',
      nombre: 'manzanilla',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png',
      stock: 36,
      precio: 1,
      tipo: 'esencia',
      createdAt: '2025-06-24T23:02:05.017Z',
      updatedAt: '2025-07-11T05:41:40.639Z',
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
      stock: 16,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-27T03:48:33.980Z',
      updatedAt: '2025-07-11T04:18:15.684Z',
    },
    {
      _id: '685f1505d66e6a9c394738c1',
      nombre: 'lila',
      id_categoria: ['680fd248f613dc80267ba5d7'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211406/ingredientes/simefcvcvvu8vjn2i9wh.png',
      stock: 11,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-27T22:02:45.954Z',
      updatedAt: '2025-07-11T05:23:27.464Z',
    },
    {
      _id: '685f1535d66e6a9c394738cd',
      nombre: 'celeste',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211414/ingredientes/sghgmbmstaakinf2ihde.png',
      stock: 15,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-06-27T22:03:33.078Z',
      updatedAt: '2025-07-11T05:23:35.554Z',
    },
    {
      _id: '686219c11cfd542baabf63d9',
      nombre: 'miel',
      id_categoria: ['680fd248f613dc80267ba5d7', '6823a6c096655bcbe4971062'],
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259585/ingredientes/ytk8zazclpa6pb21upzy.png',
      stock: 13,
      precio: 1.6,
      tipo: 'aroma',
      createdAt: '2025-06-30T04:59:45.573Z',
      updatedAt: '2025-07-11T05:26:44.398Z',
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
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211422/ingredientes/heoxxzcebqnytzesobur.png',
      stock: 92,
      precio: 1,
      tipo: 'color',
      createdAt: '2025-07-03T23:34:42.110Z',
      updatedAt: '2025-07-11T05:23:43.255Z',
    },
  ],
  total: 38,
  page: 1,
  totalPages: 1,
};

const mockCategoriesResponse = {
  categorias: [
    {
      _id: '680fd248f613dc80267ba5d7',
      nombre: 'Jabones artesanales',
      descripcion: 'Un jabón, que más te esperas',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
      createdAt: '2025-04-28T19:08:56.437Z',
      updatedAt: '2025-07-09T01:31:58.968Z',
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

const mockInteligenciaArtificialResponse = {
    "msg": "Producto recomendado por IA generado exitosamente.",
    "producto_personalizado": {
        "categoria": "jabones artesanales",
        "aroma": {
            "_id": "686219c11cfd542baabf63d9",
            "nombre": "miel",
            "imagen": "https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751259585/ingredientes/ytk8zazclpa6pb21upzy.png"
        },
        "molde": {
            "_id": "6850502d5a5a9def06fe65cc",
            "nombre": "cuadrado",
            "imagen": "https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751405119/ingredientes/llmaduf1z2f8axaivnwt.png"
        },
        "color": {
            "_id": "6850cad95a5a9def06fe666c",
            "nombre": "rosa",
            "imagen": "https://res.cloudinary.com/ddg5fu4yt/image/upload/v1752211461/ingredientes/ml16vp4q6mkpxiewembo.png"
        },
        "esencias": [
            {
                "_id": "685b2e6d52d1afb30db2cf7d",
                "nombre": "manzanilla",
                "imagen": "https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750806124/ingredientes/c9dwwm2jihjp48meitry.png"
            },
            {
                "_id": "685471f42f866ebc585d98c9",
                "nombre": "laurel",
                "imagen": "https://res.cloudinary.com/ddg5fu4yt/image/upload/v1750364659/ingredientes/tjw7gghzvsxxykeotgnz.png"
            }
        ],
        "precio": 13.6,
        "tipo_producto": "ia",
        "origen": "ia"
    }
}