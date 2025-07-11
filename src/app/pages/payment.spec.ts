import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNgxStripe } from 'ngx-stripe';
import { environment } from '../../environments/environment';
import { routes } from '../app.routes';
import { PaymentPage } from './payment,page';

describe('Página de pago de carrito de compras', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjVlNjE5NDQ5MmFmNzkyZmFmYjQ1MCIsIm5vbWJyZSI6Ikplc2VuaWEgSXNhYmVsIiwiaWF0IjoxNzUyMTc3Njk5LCJleHAiOjE3NTIyNjQwOTl9.D2fmxRSIKCB2WVKgGcWlPumaQ7Q77QTiGywAvBrSnoI');
    TestBed.configureTestingModule({
      imports: [PaymentPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNgxStripe(environment.stripeApiKey),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(PaymentPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('Deberían cargar la página con los servicios necesarios', () => {
    expect(component).toBeTruthy();
  });

  it('Debería actualizar los datos de envío.', () => {
    const botonModificar = fixture.nativeElement.querySelector('[data-testid="modificar-datos-button"]');

    if (botonModificar) {
      botonModificar.dispatchEvent(new Event('click', { bubbles: true }));
    }

    fixture.detectChanges();

    const cedulaInput = fixture.nativeElement.querySelector(
      '[data-testid="cedula-input"]',
    );
    const telefonoInput = fixture.nativeElement.querySelector(
      '[data-testid="telefono-input"]',
    );
    const direccionInput = fixture.nativeElement.querySelector(
      '[data-testid="direccion-input"]',
    );

    cedulaInput.value = '1234567890';
    telefonoInput.value = '0987654321';
    direccionInput.value = 'Calle Falsa 123';

    cedulaInput.dispatchEvent(new Event('input', { bubbles: true }));
    telefonoInput.dispatchEvent(new Event('input', { bubbles: true }));
    direccionInput.dispatchEvent(new Event('input', { bubbles: true }));

    const botonGuardar = fixture.nativeElement.querySelector(
      '[data-testid="guardar-datos-button"]',
    );

    botonGuardar.dispatchEvent(new Event('click', { bubbles: true }));

    fixture.detectChanges();

    const reqPerfil = httpTestingController.expectOne(
      ({ method, url }) =>
        method === 'PUT' && url === `${environment.urlApi}/api/perfil`,
    );

    reqPerfil.flush({});

    fixture.detectChanges();
  });

  it('Debería poder pagar su carrito y visualizar la factura.', () => {
    const botonPagar = fixture.nativeElement.querySelector('[data-testid="pagar-button"]');
    botonPagar.dispatchEvent(new Event('click', { bubbles: true }));

    const reqPago = httpTestingController.expectOne(
      ({ method, url }) =>
        method === 'POST' && url === `${environment.urlApi}/api/carritos/pagar`,
    );

    reqPago.flush({});

    fixture.detectChanges();

		const factura = fixture.nativeElement.querySelector('[data-testid="factura"]');

		expect(factura).toBeTruthy();

		const botonCerrar = factura.querySelector('[data-testid="cerrar-button"]');
		expect(botonCerrar).toBeTruthy();

		botonCerrar.dispatchEvent(new Event('click', { bubbles: true }));
		fixture.detectChanges();
  });
});
