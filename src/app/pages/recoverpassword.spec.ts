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
import { RecuperarContrasenia } from './recoverpassword.page';

describe('Página de recuperación de contraseña', () => {
  let component: RecuperarContrasenia;
  let fixture: ComponentFixture<RecuperarContrasenia>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RecuperarContrasenia],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(RecuperarContrasenia);
    component = fixture.componentInstance;
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería poder restablecer la contraseña', async () => {
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

    const sendEmailButton = fixture.nativeElement.querySelector(
      '[data-testid="send-email-button"]',
    );

    expect(emailInput).toBeTruthy();
    expect(sendEmailButton).toBeTruthy();

    emailInput.value = 'jesenia.pazto@epn.edu.ec';
    emailInput.dispatchEvent(new Event('input'));

    sendEmailButton.click();

    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/recuperar-contrasenia`,
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(component.formulario.value);

    req.flush(mockSendCodeResponse);
  });

  it('Debería poder enviar el correo de recuperación', async () => {
		component.tipoRespuesta.set('exito')

    fixture.detectChanges();
    await fixture.whenStable();

    const reqPerfil = httpTestingController.expectOne(
      `${environment.urlApi}/api/perfil`,
    );

    expect(reqPerfil.request.method).toBe('GET');
    reqPerfil.flush(mockProfileResponse);

    const passwordInput = fixture.nativeElement.querySelector(
      '[data-testid="password-input"]',
    );
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      '[data-testid="confirm-password-input"]',
    );
    const codigoInput = fixture.nativeElement.querySelector(
      '[data-testid="codigo-input"]',
    );
    const resetButton = fixture.nativeElement.querySelector(
      '[data-testid="reset-button"]',
    );

    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(codigoInput).toBeTruthy();
    expect(resetButton).toBeTruthy();

    passwordInput.value = 'NuevaPass123$';
    confirmPasswordInput.value = 'NuevaPass123$';
    codigoInput.value = '518128';

    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    codigoInput.dispatchEvent(new Event('input'));

		component.formulario.patchValue({
			email: 'jesenia.pazto@epn.edu.ec',
		});

    resetButton.click();

    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/cambiar-contrasenia?codigoRecuperacion=${codigoInput.value}`,
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
			email: component.formulario.value.email,
			nuevaPassword: passwordInput.value,
		});

    req.flush(mockRecuperarContraseniaResponse);
  });
});

const mockSendCodeResponse = {
  msg: 'Código de recuperación enviado al correo electrónico',
};

const mockRecuperarContraseniaResponse = {
  msg: 'Contraseña restablecida exitosamente',
};

const mockProfileResponse = {
  msg: 'Token inválido o expirado',
};
