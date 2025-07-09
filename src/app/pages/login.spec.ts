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
import { LoginPage } from './login.page';

describe('Página de inicio', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería poder iniciar sesión', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const reqPerfil = httpTestingController.expectOne(
      `${environment.urlApi}/api/perfil`,
    );

    expect(reqPerfil.request.method).toBe('GET');
    reqPerfil.flush(mockProfileResponse);

    const emailInput = fixture.nativeElement.querySelector(
      '[data-testid="email-input"]',
    );
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-testid="password-input"]',
    );
    const loginButton = fixture.nativeElement.querySelector(
      '[data-testid="login-button"]',
    );

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();

    emailInput.value = 'admin123@yopmail.com';
    passwordInput.value = 'NuevoPass123$';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    loginButton.click();

    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/login`,
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'admin123@yopmail.com',
      password: 'NuevoPass123$',
    });

    req.flush(mockLoginResponse);
  });
});

const mockLoginResponse = {
  msg: 'Inicio de sesión exitoso',
  token: 'fake-jwt-token',
};

const mockProfileResponse = {
  msg: 'Token inválido o expirado',
};
