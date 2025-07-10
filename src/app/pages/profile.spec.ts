import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { routes } from '../app.routes';
import { ProfilePage } from './profile.page';

describe('Página de perfil', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjVlNjE5NDQ5MmFmNzkyZmFmYjQ1MCIsIm5vbWJyZSI6Ikplc2VuaWEgSXNhYmVsIiwiaWF0IjoxNzUyMDkwMjI5LCJleHAiOjE3NTIxNzY2Mjl9.Rl2IUYzycLZ_qV8Rr5T7qh28tMRchjKLgCtZPJ9ebFQ',
    );
    TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [{ path: 'perfil' }],
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;

		await fixture.whenStable();
		fixture.detectChanges();
	
		const reqPerfil = httpTestingController.expectOne(
			`${environment.urlApi}/api/perfil`,
		);
		expect(reqPerfil.request.method).toBe('GET');
		reqPerfil.flush(mockProfileResponse);
	
		fixture.detectChanges();
  });
	
  it('Deberían cargar la página', () => {
		expect(component).toBeTruthy();
  });
	
  it('Debería mostrar los datos del perfil', async () => {
    const nombreInput = fixture.nativeElement.querySelector(
      '[data-testid="nombre-input"]',
    );
    const apellidoInput = fixture.nativeElement.querySelector(
      '[data-testid="apellido-input"]',
    );
    const emailInput = fixture.nativeElement.querySelector(
      '[data-testid="email-input"]',
    );
    const generoInputs = fixture.nativeElement.querySelectorAll(
      '[data-testid="genero-input"]',
    );

    expect(nombreInput.value).toBe(mockProfileResponse.cliente.nombre);
    expect(apellidoInput.value).toBe(mockProfileResponse.cliente.apellido);
    expect(emailInput.value).toBe(mockProfileResponse.cliente.email);
    expect(generoInputs[0].checked).toBe(
      mockProfileResponse.cliente.genero === 'masculino',
    );
    expect(generoInputs[1].checked).toBe(
      mockProfileResponse.cliente.genero === 'femenino',
    );
  });

  it('Debería poder actualizar los valores del perfil', async () => {
    const nombreInput = fixture.nativeElement.querySelector(
      '[data-testid="nombre-input"]',
    );
    const apellidoInput = fixture.nativeElement.querySelector(
      '[data-testid="apellido-input"]',
    );
    const generoInputs = fixture.nativeElement.querySelectorAll(
      '[data-testid="genero-input"]',
    );
    const telefonoInput = fixture.nativeElement.querySelector(
      '[data-testid="telefono-input"]',
    );
    const cedulaInput = fixture.nativeElement.querySelector(
      '[data-testid="cedula-input"]',
    );
    const direccionInput = fixture.nativeElement.querySelector(
      '[data-testid="direccion-input"]',
    );
    const fechaNacimientoInput = fixture.nativeElement.querySelector(
      '[data-testid="fecha-nacimiento-input"]',
    );
    const actualizarButton = fixture.nativeElement.querySelector(
      '[data-testid="boton-actualizar-perfil"]',
    );

    nombreInput.value = 'Isabel';
    apellidoInput.value = 'Corregidor';
    telefonoInput.value = '0987654321';
    cedulaInput.value = '1726405394';
    direccionInput.value = 'Dirección de ejemplo';
    fechaNacimientoInput.value = '2002-01-04';

    nombreInput.dispatchEvent(new Event('input', { bubbles: true }));
    apellidoInput.dispatchEvent(new Event('input', { bubbles: true }));
    telefonoInput.dispatchEvent(new Event('input', { bubbles: true }));
    cedulaInput.dispatchEvent(new Event('input', { bubbles: true }));
    direccionInput.dispatchEvent(new Event('input', { bubbles: true }));
    fechaNacimientoInput.dispatchEvent(new Event('input', { bubbles: true }));
    generoInputs.forEach((input: HTMLInputElement) => {
      input.checked = input.value === 'masculino';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    actualizarButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/perfil`,
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body instanceof FormData).toBeTruthy();

  });
});

const mockProfileResponse = {
  msg: 'Perfil obtenido correctamente',
  cliente: {
    cedula: '1726405394',
    nombre: 'Jesenia Isabel',
    apellido: 'Pazto Corregidor',
    genero: 'femenino',
    email: 'jesenia.pazto@epn.edu.ec',
    direccion: 'El Beaterio Barrio 2 divino',
    telefono: '0994231454',
    fecha_nacimiento: '2002-01-04T00:00:00.000Z',
    imagen:
      'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751570139/clientes/rrwen41nfphsytkzv7pv.jpg',
  },
};
