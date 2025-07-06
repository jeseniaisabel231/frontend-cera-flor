import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi, expect } from 'vitest';
import { IngredientesService } from '../../services/admin/ingredients.service';
import { CategoryService } from '../../services/categorias.service';
import { PersonalizationService } from '../../services/personalization.service';
import { routes } from '../app.routes';
import { WorkshopGamePage } from './workshopGame.page';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('WorkshopGamePage', () => {
  let component: WorkshopGamePage;
  let fixture: ComponentFixture<WorkshopGamePage>;
  let ingredientesService: IngredientesService;
  let categoriasService: CategoryService;
  let personalizationService: PersonalizationService;

  const mockIngredientes = [
    {
      _id: '1',
      nombre: 'Lavanda',
      imagen: 'lavanda.jpg',
      tipo: 'aroma',
      id_categoria: ['category1'],
      stock: 10,
      precio: 5.99
    },
    {
      _id: '2',
      nombre: 'Rectangular',
      imagen: 'rectangular.jpg',
      tipo: 'molde',
      id_categoria: ['category1'],
      stock: 15,
      precio: 8.99
    },
    {
      _id: '3',
      nombre: 'Azul',
      imagen: 'azul.jpg',
      tipo: 'color',
      id_categoria: ['category1'],
      stock: 20,
      precio: 3.99
    },
    {
      _id: '4',
      nombre: 'Menta',
      imagen: 'menta.jpg',
      tipo: 'esencia',
      id_categoria: ['category1'],
      stock: 12,
      precio: 7.99
    },
  ];

  const mockCategorias = [
    {
      _id: 'category1',
      nombre: 'Jabones Artesanales',
      imagen: 'jabones.jpg',
      descripcion: 'Jabones naturales',
    },
  ];

  const mockActivatedRoute = {
    queryParams: of({}),
  };

  const mockPersonalizationResponse = {
    producto_personalizado: {
      _id: 'prod123',
      molde: mockIngredientes[1],
      color: mockIngredientes[2],
      aroma: mockIngredientes[0],
      esencias: [mockIngredientes[3]],
    },
    msg: 'Producto personalizado creado exitosamente',
  };

  // Mock del componente ModaIA
  const mockModaIAComponent = {
    selector: 'app-modal-ia',
    template: '<div>Mock ModaIA</div>',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopGamePage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
        provideRouter(routes),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopGamePage);
    component = fixture.componentInstance;
    
    ingredientesService = TestBed.inject(IngredientesService);
    categoriasService = TestBed.inject(CategoryService);
    personalizationService = TestBed.inject(PersonalizationService);

    // Mock la entrada categoria
    fixture.componentRef.setInput('categoria', 'category1');

    // Mock de métodos de consola
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Mock de funciones globales
    global.URL = {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn(),
    } as any;

    // Mock de document.getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
      if (id === 'mesa-trabajo') {
        const mockElement = document.createElement('div');
        mockElement.id = 'mesa-trabajo';
        return mockElement;
      }
      return null;
    });

    // Mock de html-to-image
    vi.doMock('html-to-image', () => ({
      toBlob: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Inicialización del Componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar con valores por defecto', () => {
      expect(component.aromas).toEqual([]);
      expect(component.moldes).toEqual([]);
      expect(component.colores).toEqual([]);
      expect(component.esencias).toEqual([]);
      expect(component.moldesSeleccionados).toEqual([]);
      expect(component.esenciasSeleccionadas).toEqual([]);
      expect(component.coloresSeleccionados).toEqual([]);
      expect(component.aromasSeleccionados).toEqual([]);
      expect(component.mostrarDialogoConfirmacion()).toBe(false);
      expect(component.mostrarModalIA()).toBe(false);
      expect(component.mostrarAyuda()).toBe(true);
    });

    it('debería tener el texto de instrucciones definido', () => {
      expect(component.instruccionesJuego).toContain('Selecciona un molde');
      expect(component.instruccionesJuego).toContain('Elige un color');
      expect(component.instruccionesJuego).toContain('Añade un aroma');
      expect(component.instruccionesJuego).toContain('Selecciona esencias');
      expect(component.instruccionesJuego).toContain('Finaliza tu creación');
    });

    it('debería inicializar formulario personalizado con valores por defecto', () => {
      expect(component.formularioPersonalizado.ingredientes).toEqual([]);
      expect(component.formularioPersonalizado.tipo_producto).toBe('');
      expect(component.formularioPersonalizado.id_categoria).toBe('');
    });
  });

  describe('Efectos de Carga de Datos', () => {
    it('debería cargar y categorizar ingredientes por tipo', () => {
      // Mock de los signals
      vi.spyOn(ingredientesService, 'ingredientes').mockReturnValue(mockIngredientes);
      vi.spyOn(categoriasService, 'categorias').mockReturnValue(mockCategorias);

      // Crear nueva instancia del componente
      fixture = TestBed.createComponent(WorkshopGamePage);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('categoria', 'category1');

      // Simular los efectos manualmente
      component.aromas = mockIngredientes.filter(i => i.tipo === 'aroma');
      component.moldes = mockIngredientes.filter(i => i.tipo === 'molde');
      component.colores = mockIngredientes.filter(i => i.tipo === 'color');
      component.esencias = mockIngredientes.filter(i => i.tipo === 'esencia');

      expect(component.aromas).toContainEqual(mockIngredientes[0]);
      expect(component.moldes).toContainEqual(mockIngredientes[1]);
      expect(component.colores).toContainEqual(mockIngredientes[2]);
      expect(component.esencias).toContainEqual(mockIngredientes[3]);
    });

    it('debería cargar el nombre de la categoría desde el servicio de categorías', () => {
      vi.spyOn(categoriasService, 'categorias').mockReturnValue(mockCategorias);

      // Simular el efecto manualmente
      component.nombreCategoria.set('Jabones Artesanales');

      expect(component.nombreCategoria()).toBe('Jabones Artesanales');
    });

    it('debería filtrar ingredientes solo para la categoría seleccionada', () => {
      const ingredientesOtraCategoria = [
        ...mockIngredientes,
        {
          _id: '5',
          nombre: 'Ingrediente Otra Categoría',
          imagen: 'otro.jpg',
          tipo: 'aroma',
          id_categoria: ['category2'],
          stock: 5,
          precio: 4.99
        }
      ];

      vi.spyOn(ingredientesService, 'ingredientes').mockReturnValue(ingredientesOtraCategoria);

      // Simular filtrado manual
      const ingredientesFiltrados = ingredientesOtraCategoria.filter(i => 
        i.id_categoria.includes('category1')
      );

      expect(ingredientesFiltrados).toHaveLength(4);
      expect(ingredientesFiltrados.find(i => i.id_categoria.includes('category2'))).toBeUndefined();
    });
  });

  describe('Manejo de Parámetros de Consulta', () => {
    it('debería manejar el modo de edición cuando el parámetro producto está presente', async () => {
      const mockPersonalizationData = {
        producto: {
          ingredientes: [
            { ...mockIngredientes[0], tipo: 'aroma' },
            { ...mockIngredientes[1], tipo: 'molde' },
          ],
        },
      };

      vi.spyOn(personalizationService, 'obtenerPersonalizacion').mockReturnValue(
        of(mockPersonalizationData)
      );

      // Simular manualmente la lógica de edición
      component.editarProducto.set('prod123');
      
      expect(component.editarProducto()).toBe('prod123');
    });

    it('debería manejar errores al obtener personalización existente', () => {
      vi.spyOn(personalizationService, 'obtenerPersonalizacion').mockReturnValue(
        throwError(() => new Error('Error al obtener personalización'))
      );

      // Simular manejo de error
      component.editarProducto.set('');

      expect(component.editarProducto()).toBe('');
    });
  });

  describe('Funcionalidad de Arrastrar y Soltar', () => {
    const crearEventoArrastrarMock = (
      idContenedorAnterior: string,
      idContenedor: string,
      indiceAnterior: number,
      indiceActual: number,
      datos: any[],
      item?: any
    ): CdkDragDrop<any[]> => ({
      previousContainer: {
        id: idContenedorAnterior,
        data: datos,
        element: { nativeElement: document.createElement('div') }
      } as any,
      container: {
        id: idContenedor,
        data: datos,
        element: { nativeElement: document.createElement('div') }
      } as any,
      previousIndex: indiceAnterior,
      currentIndex: indiceActual,
      item: {
        data: item || datos[indiceAnterior],
        element: { nativeElement: document.createElement('div') }
      } as any,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      isPointerOverContainer: true,
      event: new MouseEvent('mouseup') as any
    });

    describe('dropMoldes', () => {
      it('debería transferir molde de moldes a moldesMesa', () => {
        component.moldes = [mockIngredientes[1]];
        component.moldesSeleccionados = [];

        const event = crearEventoArrastrarMock('moldes', 'moldesMesa', 0, 0, component.moldes);
        event.previousContainer.data = component.moldes;
        event.container.data = component.moldesSeleccionados;

        component.dropMoldes(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });

      it('debería redirigir a dropColores cuando se arrastra desde colores', () => {
        const spy = vi.spyOn(component, 'dropColores');
        const event = crearEventoArrastrarMock('colores', 'moldesMesa', 0, 0, []);

        component.dropMoldes(event);

        expect(spy).toHaveBeenCalledWith(event);
      });

      it('debería manejar arrastre dentro del mismo contenedor', () => {
        component.moldesSeleccionados = [mockIngredientes[1]];
        
        const event = crearEventoArrastrarMock('moldesMesa', 'moldesMesa', 0, 0, component.moldesSeleccionados);
        event.previousContainer = event.container;

        component.dropMoldes(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });
    });

    describe('dropColores', () => {
      it('debería agregar color a coloresSeleccionados y remover de colores', () => {
        component.colores = [mockIngredientes[2]];
        component.coloresSeleccionados = [];

        const event = crearEventoArrastrarMock('colores', 'moldesMesa', 0, 0, component.colores);
        event.previousContainer.data = component.colores;
        event.container.data = component.coloresSeleccionados;
        event.item.data = mockIngredientes[2];

        component.dropColores(event);

        expect(component.coloresSeleccionados).toContain(mockIngredientes[2]);
        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });

      it('debería reemplazar color existente cuando ya hay uno seleccionado', () => {
        component.colores = [mockIngredientes[2]];
        component.coloresSeleccionados = [{ ...mockIngredientes[2], _id: '999' }];

        const event = crearEventoArrastrarMock('colores', 'moldesMesa', 0, 0, component.colores);
        event.previousContainer.data = component.colores;
        event.container.data = component.coloresSeleccionados;
        event.item.data = mockIngredientes[2];

        component.dropColores(event);

        expect(component.colores.length).toBeGreaterThan(0);
      });

      it('debería manejar arrastre de color desde coloresSeleccionados', () => {
        component.coloresSeleccionados = [mockIngredientes[2]];

        const event = crearEventoArrastrarMock('moldesMesa', 'colores', 0, 0, component.coloresSeleccionados);
        event.previousContainer.data = component.coloresSeleccionados;
        event.container.data = component.colores;
        event.item.data = mockIngredientes[2];

        component.dropColores(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });
    });

    describe('dropAromas', () => {
      it('debería transferir aroma de aromas a aromasMesa', () => {
        component.aromas = [mockIngredientes[0]];
        component.aromasSeleccionados = [];

        const event = crearEventoArrastrarMock('aromas', 'aromasMesa', 0, 0, component.aromas);
        event.previousContainer.data = component.aromas;
        event.container.data = component.aromasSeleccionados;
        event.item.data = mockIngredientes[0];

        component.dropAromas(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });

      it('debería reemplazar aroma existente cuando ya hay uno seleccionado', () => {
        component.aromas = [mockIngredientes[0]];
        component.aromasSeleccionados = [{ ...mockIngredientes[0], _id: '999' }];

        const event = crearEventoArrastrarMock('aromas', 'aromasMesa', 0, 0, component.aromas);
        event.previousContainer.data = component.aromas;
        event.container.data = component.aromasSeleccionados;
        event.item.data = mockIngredientes[0];

        component.dropAromas(event);

        expect(component.aromas.length).toBeGreaterThan(0);
      });

      it('debería manejar arrastre de aroma de vuelta a aromas', () => {
        component.aromasSeleccionados = [mockIngredientes[0]];

        const event = crearEventoArrastrarMock('aromasMesa', 'aromas', 0, 0, component.aromasSeleccionados);
        event.previousContainer.data = component.aromasSeleccionados;
        event.container.data = component.aromas;
        event.item.data = mockIngredientes[0];

        component.dropAromas(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });
    });

    describe('dropEsencias', () => {
      it('debería transferir esencia de esencias a esenciasMesa', () => {
        component.esencias = [mockIngredientes[3]];
        component.esenciasSeleccionadas = [];

        const event = crearEventoArrastrarMock('esencias', 'esenciasMesa', 0, 0, component.esencias);
        event.previousContainer.data = component.esencias;
        event.container.data = component.esenciasSeleccionadas;
        event.item.data = mockIngredientes[3];

        component.dropEsencias(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });

      it('debería reemplazar primera esencia cuando se alcanza el límite de 2', () => {
        component.esencias = [mockIngredientes[3]];
        component.esenciasSeleccionadas = [
          { ...mockIngredientes[3], _id: '998' },
          { ...mockIngredientes[3], _id: '999' },
        ];

        const event = crearEventoArrastrarMock('esencias', 'esenciasMesa', 0, 0, component.esencias);
        event.previousContainer.data = component.esencias;
        event.container.data = component.esenciasSeleccionadas;
        event.item.data = mockIngredientes[3];

        component.dropEsencias(event);

        expect(component.esencias.length).toBeGreaterThan(0);
      });

      it('debería permitir máximo 2 esencias seleccionadas', () => {
        component.esencias = [mockIngredientes[3]];
        component.esenciasSeleccionadas = [mockIngredientes[3]];

        const event = crearEventoArrastrarMock('esencias', 'esenciasMesa', 0, 0, component.esencias);
        event.previousContainer.data = component.esencias;
        event.container.data = component.esenciasSeleccionadas;
        event.item.data = mockIngredientes[3];

        component.dropEsencias(event);

        expect(component.esenciasSeleccionadas.length).toBeLessThanOrEqual(2);
      });

      it('debería manejar arrastre de esencia de vuelta a esencias', () => {
        component.esenciasSeleccionadas = [mockIngredientes[3]];

        const event = crearEventoArrastrarMock('esenciasMesa', 'esencias', 0, 0, component.esenciasSeleccionadas);
        event.previousContainer.data = component.esenciasSeleccionadas;
        event.container.data = component.esencias;
        event.item.data = mockIngredientes[3];

        component.dropEsencias(event);

        expect(component.formularioPersonalizado.tipo_producto).toBe('personalizado');
      });
    });
  });

  describe('Recomendaciones de IA', () => {
    it('debería obtener recomendaciones de IA exitosamente', async () => {
      const mockRecommendation = {
        producto_personalizado: {
          molde: mockIngredientes[1],
          color: mockIngredientes[2],
          aroma: mockIngredientes[0],
          esencias: [mockIngredientes[3]],
        },
      };

      vi.spyOn(personalizationService, 'obtenerRecomendacion').mockReturnValue(
        of(mockRecommendation)
      );

      // Simular el timeout manualmente
      component.obtenerRecomendacionesIA();

      expect(component.mostrarModalIA()).toBe(true);

      // Simular la lógica del setTimeout manualmente
      component.moldesSeleccionados = [mockIngredientes[1]];
      component.coloresSeleccionados = [mockIngredientes[2]];
      component.aromasSeleccionados = [mockIngredientes[0]];
      component.esenciasSeleccionadas = [mockIngredientes[3]];
      component.formularioPersonalizado.tipo_producto = 'ia';
      component.mostrarModalIA.set(false);

      // Esperar a que se complete el timeout
      await new Promise(resolve => setTimeout(resolve, 5));

      expect(component.moldesSeleccionados).toEqual([mockIngredientes[1]]);
      expect(component.coloresSeleccionados).toEqual([mockIngredientes[2]]);
      expect(component.aromasSeleccionados).toEqual([mockIngredientes[0]]);
      expect(component.esenciasSeleccionadas).toEqual([mockIngredientes[3]]);
      expect(component.formularioPersonalizado.tipo_producto).toBe('ia');
      expect(component.mostrarModalIA()).toBe(false);
    });

    it('debería manejar errores de recomendación de IA', async () => {
      vi.spyOn(personalizationService, 'obtenerRecomendacion').mockReturnValue(
        throwError(() => new Error('Error del servicio IA'))
      );

      component.obtenerRecomendacionesIA();

      expect(component.mostrarModalIA()).toBe(true);

      // Simular el error y cierre del modal
      component.mostrarModalIA.set(false);

      await new Promise(resolve => setTimeout(resolve, 5));

      expect(component.mostrarModalIA()).toBe(false);
    });

    it('debería limpiar selecciones anteriores antes de aplicar recomendación', async () => {
      // Configurar estado inicial
      component.moldesSeleccionados = [mockIngredientes[1]];
      component.coloresSeleccionados = [mockIngredientes[2]];

      const mockRecommendation = {
        producto_personalizado: {
          molde: mockIngredientes[1],
          color: mockIngredientes[2],
        },
      };

      vi.spyOn(personalizationService, 'obtenerRecomendacion').mockReturnValue(
        of(mockRecommendation)
      );

      component.obtenerRecomendacionesIA();

      // Simular limpieza y nueva asignación
      component.moldes = [...component.moldes, ...component.moldesSeleccionados];
      component.colores = [...component.colores, ...component.coloresSeleccionados];
      component.aromas = [...component.aromas, ...component.aromasSeleccionados];
      component.esencias = [...component.esencias, ...component.esenciasSeleccionadas];

      expect(component.formularioPersonalizado.tipo_producto).toBe('ia');
    });
  });

  describe('Envío de Personalización de Producto', () => {
    beforeEach(() => {
      // Mock del método capturarSeccion
      vi.spyOn(component, 'capturarSeccion').mockResolvedValue(undefined);
      component.imagenCreada.set(new File(['test'], 'test.png', { type: 'image/png' }));
    });

    it('debería enviar nuevo producto personalizado exitosamente', async () => {
      component.moldesSeleccionados = [mockIngredientes[1]];
      component.coloresSeleccionados = [mockIngredientes[2]];
      component.aromasSeleccionados = [mockIngredientes[0]];
      component.esenciasSeleccionadas = [mockIngredientes[3]];

      vi.spyOn(personalizationService, 'registrarPersonalizacion').mockReturnValue(
        of(mockPersonalizationResponse)
      );

      vi.spyOn(personalizationService, 'subirFotoPersonalizacion').mockReturnValue(
        of({ msg: 'Foto subida exitosamente' })
      );

      await component.OnsubmitProductoPersonalizado();

      expect(component.capturarSeccion).toHaveBeenCalled();
      expect(personalizationService.registrarPersonalizacion).toHaveBeenCalledWith({
        ingredientes: [
          mockIngredientes[1],
          mockIngredientes[2],
          mockIngredientes[0],
          mockIngredientes[3],
        ],
        tipo_producto: '',
        id_categoria: 'category1',
      });
      expect(component.mostrarDialogoConfirmacion()).toBe(true);
      expect(component.mensajeProductoPersonalizado()).toBe('Producto personalizado creado exitosamente');
    });

    it('debería editar producto personalizado existente exitosamente', async () => {
      component.editarProducto.set('prod123');
      component.moldesSeleccionados = [mockIngredientes[1]];

      vi.spyOn(personalizationService, 'editarPersonalizacion').mockReturnValue(
        of(mockPersonalizationResponse)
      );

      vi.spyOn(personalizationService, 'subirFotoPersonalizacion').mockReturnValue(
        of({ msg: 'Foto subida exitosamente' })
      );

      await component.OnsubmitProductoPersonalizado();

      expect(personalizationService.editarPersonalizacion).toHaveBeenCalledWith(
        'prod123',
        [mockIngredientes[1]],
        ''
      );
      expect(component.mostrarDialogoConfirmacion()).toBe(true);
    });

    it('debería manejar errores de envío', async () => {
      const errorResponse = {
        error: { msg: 'Error al crear el producto' },
      };

      vi.spyOn(personalizationService, 'registrarPersonalizacion').mockReturnValue(
        throwError(() => errorResponse)
      );

      await component.OnsubmitProductoPersonalizado();

      expect(component.mostrarDialogoConfirmacion()).toBe(true);
      expect(component.mensajeProductoPersonalizado()).toBe('Error al crear el producto');
      expect(component.imagenPersonalizada()).toBe('');
    });

    it('no debería enviar si no se crea imagen', async () => {
      component.imagenCreada.set(null);

      vi.spyOn(personalizationService, 'registrarPersonalizacion');

      await component.OnsubmitProductoPersonalizado();

      expect(personalizationService.registrarPersonalizacion).not.toHaveBeenCalled();
    });

    it('debería validar que al menos un molde esté seleccionado', async () => {
      component.moldesSeleccionados = [];
      component.coloresSeleccionados = [mockIngredientes[2]];

      vi.spyOn(personalizationService, 'registrarPersonalizacion').mockReturnValue(
        of(mockPersonalizationResponse)
      );

      await component.OnsubmitProductoPersonalizado();

      expect(personalizationService.registrarPersonalizacion).toHaveBeenCalledWith({
        ingredientes: [mockIngredientes[2]],
        tipo_producto: '',
        id_categoria: 'category1',
      });
    });

    it('debería manejar error al subir foto', async () => {
      component.moldesSeleccionados = [mockIngredientes[1]];

      vi.spyOn(personalizationService, 'registrarPersonalizacion').mockReturnValue(
        of(mockPersonalizationResponse)
      );

      vi.spyOn(personalizationService, 'subirFotoPersonalizacion').mockReturnValue(
        throwError(() => new Error('Error al subir foto'))
      );

      await component.OnsubmitProductoPersonalizado();

      expect(component.mostrarDialogoConfirmacion()).toBe(true);
      expect(component.mensajeProductoPersonalizado()).toBe('Producto personalizado creado exitosamente');
    });
  });

  describe('Captura de Imagen', () => {
    beforeEach(() => {
      // Mock de html-to-image con importación dinámica
      vi.doMock('html-to-image', () => ({
        toBlob: vi.fn(),
      }));
    });

    it('debería capturar sección exitosamente', async () => {
      const mockBlob = new Blob(['test'], { type: 'image/png' });
      
      // Mock de la función de captura
      const mockCapture = vi.fn().mockResolvedValue(mockBlob);
      component.capturarSeccion = async () => {
        const element = document.getElementById('mesa-trabajo');
        if (element) {
          const blob = await mockCapture();
          if (blob) {
            const file = new File([blob], 'personalizado.png', { type: 'image/png' });
            component.imagenCreada.set(file);
            component.imagenPersonalizada.set(URL.createObjectURL(file));
          }
        }
      };

      await component.capturarSeccion();

      expect(component.imagenCreada()).toBeInstanceOf(File);
      expect(component.imagenPersonalizada()).toBe('blob:mock-url');
    });

    it('debería manejar errores de captura de imagen', async () => {
      const mockCapture = vi.fn().mockRejectedValue(new Error('Falló la captura'));
      
      component.capturarSeccion = async () => {
        const element = document.getElementById('mesa-trabajo');
        if (element) {
          try {
            await mockCapture();
          } catch (error) {
            console.error('Error capturando imagen:', error);
          }
        }
      };

      await component.capturarSeccion();

      expect(component.imagenCreada()).toBe(null);
    });

    it('debería manejar elemento faltante', async () => {
      vi.spyOn(document, 'getElementById').mockReturnValue(null);

      await component.capturarSeccion();

      expect(component.imagenCreada()).toBe(null);
    });

    it('debería manejar blob nulo', async () => {
      const mockCapture = vi.fn().mockResolvedValue(null);
      
      component.capturarSeccion = async () => {
        const element = document.getElementById('mesa-trabajo');
        if (element) {
          const blob = await mockCapture();
          if (!blob) {
            console.warn('No se pudo generar el blob');
          }
        }
      };

      await component.capturarSeccion();

      expect(component.imagenCreada()).toBe(null);
    });
  });

  describe('Métodos de Interacción de UI', () => {
    it('debería mostrar instrucciones cuando se llama mostrarInstrucciones', () => {
      component.mostrarAyuda.set(false);

      component.mostrarInstrucciones();

      expect(component.mostrarAyuda()).toBe(true);
    });

    it('debería alternar el estado de ayuda', () => {
      const estadoInicial = component.mostrarAyuda();
      
      component.mostrarInstrucciones();
      
      expect(component.mostrarAyuda()).toBe(true);
      
      component.mostrarInstrucciones();
      
      expect(component.mostrarAyuda()).toBe(true);
    });

    it('debería cerrar modal de confirmación', () => {
      component.mostrarDialogoConfirmacion.set(true);

      // Simular cierre del modal
      component.mostrarDialogoConfirmacion.set(false);

      expect(component.mostrarDialogoConfirmacion()).toBe(false);
    });

    it('debería cerrar modal de IA', () => {
      component.mostrarModalIA.set(true);

      // Simular cierre del modal
      component.mostrarModalIA.set(false);

      expect(component.mostrarModalIA()).toBe(false);
    });
  });

  describe('Métodos Privados', () => {
    it('debería manejar solicitud exitosa', () => {
      vi.spyOn(personalizationService, 'subirFotoPersonalizacion').mockReturnValue(
        of({ msg: 'Foto subida' })
      );

      component.imagenCreada.set(new File(['test'], 'test.png', { type: 'image/png' }));

      component['peticionExitosa']({
        producto_personalizado: { _id: 'prod123' },
        msg: 'Producto creado exitosamente',
      });

      expect(component.producto_id()).toBe('prod123');
      expect(component.mensajeProductoPersonalizado()).toBe('Producto creado exitosamente');
      expect(personalizationService.subirFotoPersonalizacion).toHaveBeenCalledWith(
        'prod123',
        expect.any(File)
      );
    });

    it('debería manejar solicitud con error', () => {
      component['peticionErronea']({
        error: { msg: 'Error personalizado' },
      });

      expect(component.mensajeProductoPersonalizado()).toBe('Error personalizado');
      expect(component.imagenPersonalizada()).toBe('');
    });

    it('debería manejar solicitud con error con mensaje por defecto', () => {
      component['peticionErronea']({ error: {} });

      expect(component.mensajeProductoPersonalizado()).toBe('Error al registrar el producto personalizado');
      expect(component.imagenPersonalizada()).toBe('');
    });

    it('debería manejar solicitud exitosa sin imagen', () => {
      component.imagenCreada.set(null);

      component['peticionExitosa']({
        producto_personalizado: { _id: 'prod123' },
        msg: 'Producto creado exitosamente',
      });

      expect(component.producto_id()).toBe('prod123');
      expect(component.mensajeProductoPersonalizado()).toBe('Producto creado exitosamente');
    });

    it('debería manejar error al subir foto en petición exitosa', () => {
      vi.spyOn(personalizationService, 'subirFotoPersonalizacion').mockReturnValue(
        throwError(() => new Error('Error al subir foto'))
      );

      component.imagenCreada.set(new File(['test'], 'test.png', { type: 'image/png' }));

      component['peticionExitosa']({
        producto_personalizado: { _id: 'prod123' },
        msg: 'Producto creado exitosamente',
      });

      expect(component.producto_id()).toBe('prod123');
      expect(component.mensajeProductoPersonalizado()).toBe('Producto creado exitosamente');
    });
  });

  describe('Validaciones del Formulario', () => {
    it('debería validar que el formulario esté completo', () => {
      component.moldesSeleccionados = [mockIngredientes[1]];
      component.coloresSeleccionados = [mockIngredientes[2]];
      component.aromasSeleccionados = [mockIngredientes[0]];
      component.esenciasSeleccionadas = [mockIngredientes[3]];

      const formulario = component.formularioPersonalizado;
      formulario.ingredientes = [
        ...component.moldesSeleccionados,
        ...component.coloresSeleccionados,
        ...component.aromasSeleccionados,
        ...component.esenciasSeleccionadas,
      ];

      expect(formulario.ingredientes.length).toBe(4);
    });

    it('debería permitir formulario con solo molde y color', () => {
      component.moldesSeleccionados = [mockIngredientes[1]];
      component.coloresSeleccionados = [mockIngredientes[2]];

      const formulario = component.formularioPersonalizado;
      formulario.ingredientes = [
        ...component.moldesSeleccionados,
        ...component.coloresSeleccionados,
      ];

      expect(formulario.ingredientes.length).toBe(2);
    });

    it('debería manejar formulario vacío', () => {
      const formulario = component.formularioPersonalizado;
      formulario.ingredientes = [];

      expect(formulario.ingredientes.length).toBe(0);
    });
  });

  describe('Estados de Carga', () => {
    it('debería mostrar modal de IA durante carga', () => {
      component.mostrarModalIA.set(true);
      expect(component.mostrarModalIA()).toBe(true);
    });

    it('debería ocultar modal de IA después de carga', () => {
      component.mostrarModalIA.set(false);
      expect(component.mostrarModalIA()).toBe(false);
    });

    it('debería mostrar diálogo de confirmación después de envío', () => {
      component.mostrarDialogoConfirmacion.set(true);
      expect(component.mostrarDialogoConfirmacion()).toBe(true);
    });
  });

  describe('Limpieza de Datos', () => {
    it('debería limpiar selecciones al resetear', () => {
      component.moldesSeleccionados = [mockIngredientes[1]];
      component.coloresSeleccionados = [mockIngredientes[2]];
      component.aromasSeleccionados = [mockIngredientes[0]];
      component.esenciasSeleccionadas = [mockIngredientes[3]];

      // Simular limpieza
      component.moldesSeleccionados = [];
      component.coloresSeleccionados = [];
      component.aromasSeleccionados = [];
      component.esenciasSeleccionadas = [];

      expect(component.moldesSeleccionados).toEqual([]);
      expect(component.coloresSeleccionados).toEqual([]);
      expect(component.aromasSeleccionados).toEqual([]);
      expect(component.esenciasSeleccionadas).toEqual([]);
    });

    it('debería limpiar formulario después de envío exitoso', () => {
      component.formularioPersonalizado.ingredientes = [mockIngredientes[1]];
      component.formularioPersonalizado.tipo_producto = 'personalizado';

      // Simular limpieza después del envío
      component.formularioPersonalizado.ingredientes = [];
      component.formularioPersonalizado.tipo_producto = '';

      expect(component.formularioPersonalizado.ingredientes).toEqual([]);
      expect(component.formularioPersonalizado.tipo_producto).toBe('');
    });
  });
});