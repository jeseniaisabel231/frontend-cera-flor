import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { routes } from '../app.routes';
import { RegisterPage } from './register.page';

describe('Página de registro', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería poder registrarse', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const reqPerfil = httpTestingController.expectOne(
      `${environment.urlApi}/api/perfil`,
    );

    expect(reqPerfil.request.method).toBe('GET');
    reqPerfil.flush(mockProfileResponse);

    const nombreInput = fixture.nativeElement.querySelector(
      '[data-testid="nombre-input"]',
    );

    const apellidoInput = fixture.nativeElement.querySelector(
      '[data-testid="apellido-input"]',
    );

    const emailInput = fixture.nativeElement.querySelector(
      '[data-testid="email-input"]',
    );

    const generoInput = fixture.nativeElement.querySelector(
      '[data-testid="genero-input"]',
    );

    const passwordInput = fixture.nativeElement.querySelector(
      '[data-testid="password-input"]',
    );

    const confirmPasswordInput = fixture.nativeElement.querySelector(
      '[data-testid="confirmar-password-input"]',
    );

    const registerButton = fixture.nativeElement.querySelector(
      '[data-testid="boton-registrar"]',
    );

    expect(nombreInput).toBeTruthy();
    expect(apellidoInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(generoInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(registerButton).toBeTruthy();

    nombreInput.value = 'Jesenia';
    apellidoInput.value = 'Pazto';
    emailInput.value = 'jesenia.pazto@example.com';
    generoInput.checked = true; // Femenino
    passwordInput.value = 'NuevoPass123$';
    confirmPasswordInput.value = 'NuevoPass123$';

    nombreInput.dispatchEvent(new Event('input', { bubbles: true }));
    apellidoInput.dispatchEvent(new Event('input', { bubbles: true }));
    generoInput.dispatchEvent(new Event('change', { bubbles: true }));
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    confirmPasswordInput.dispatchEvent(new Event('input', { bubbles: true }));

    registerButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/registro`,
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      nombre: 'Jesenia',
      apellido: 'Pazto',
      email: 'jesenia.pazto@example.com',
      genero: 'femenino',
      password: 'NuevoPass123$',
    });

    req.flush(mockRegisterResponse);
  });
});

const mockRegisterResponse = {
  msg: 'Registro exitoso',
};

const mockProfileResponse = {
  msg: 'Token inválido o expirado',
};
