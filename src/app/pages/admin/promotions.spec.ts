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
import { PromotionsPage } from './promotions.page';
import { transformaFecha } from '../../utils/transformaFecha';
import { FormProm } from '../../components/admin/formprom.component';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDNjNTFmYmJjNTU2NmIzZjJiMWU0MSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzUyMDQwMTQ0LCJleHAiOjE3NTIwNDM3NDR9.ZjLc41W1BABCdDR_INZQ5Mk9W3MB21xqyEaOb3kWYio';

describe('Página de administración de productos', () => {
  let component: PromotionsPage;
  let fixture: ComponentFixture<PromotionsPage>;

  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', token);

    TestBed.configureTestingModule({
      imports: [PromotionsPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(PromotionsPage);
    component = fixture.componentInstance;

    const reqPromociones = httpTestingController.expectOne(
      `${environment.urlApi}/api/promociones?page=1&limit=100`,
    );

    expect(reqPromociones.request.method).toBe('GET');
    reqPromociones.flush(mockPromocionesResponse);

    fixture.detectChanges();
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Deberían cargar las tarjetas de promociones', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll(
      'div[data-testid="tarjeta-promocion"]',
    );

    expect(tarjetas.length).toBe(mockPromocionesResponse.totalPromociones);

    tarjetas.forEach((tarjeta: any, index: number) => {
      const promocion = mockPromocionesResponse.promociones[index];
      expect(tarjeta.querySelector('img').src).toContain(promocion.imagen);
      expect(tarjeta.querySelector('h3').textContent.trim().toLowerCase()).toContain(
        promocion.nombre,
      );
			expect(tarjeta.querySelector('span').textContent).toContain(
				`Promocion creada el: ${transformaFecha(promocion.createdAt)}`,
			);
    });
  });

  it('Debería actualizar una promoción', () => {
    const botonEditar = fixture.nativeElement.querySelector(
      '[data-testid="editar-promocion"]',
    );

    expect(botonEditar).toBeTruthy();

    botonEditar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

		fixture.detectChanges();

    const formulario = fixture.nativeElement.querySelector(
      '[data-testid="formulario-promocion"]',
    );

    expect(formulario).toBeTruthy();

    const nombreInput = formulario.querySelector(
      '[data-testid="input-nombre"]',
    ) as HTMLInputElement;

    nombreInput.value = 'Nuevo Producto';
    nombreInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    fixture.detectChanges();

    const botonActualizar = formulario.querySelector(
      '[data-testid="boton-accion"]',
    );

    expect(botonActualizar).toBeTruthy();
    expect(botonActualizar.textContent).toContain('Actualizar promoción');

    botonActualizar.dispatchEvent(new MouseEvent('click', { bubbles: true }));

		fixture.detectChanges();

    const reqRegistrar = httpTestingController.expectOne(
      `${environment.urlApi}/api/promociones/${mockPromocionesResponse.promociones[0]._id}`,
    );
    expect(reqRegistrar.request.method).toBe('PUT');
    expect(reqRegistrar.request.body instanceof FormData).toBeTruthy();
  });
});

const mockPromocionesResponse = {
  totalPromociones: 2,
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
  ],
};
