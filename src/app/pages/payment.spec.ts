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
import { PaymentPage } from './payment,page';

describe('Página de pedidos', () => {
	let component: PaymentPage;
	let fixture: ComponentFixture<PaymentPage>;
	let httpTestingController: HttpTestingController;

	beforeEach(async () => {
		localStorage.setItem(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjVlNjE5NDQ5MmFmNzkyZmFmYjQ1MCIsIm5vbWJyZSI6Ikplc2VuaWEgSXNhYmVsIiwiaWF0IjoxNzUyMDkwMjI5LCJleHAiOjE3NTIxNzY2Mjl9.Rl2IUYzycLZ_qV8Rr5T7qh28tMRchjKLgCtZPJ9ebFQ',
		);
		TestBed.configureTestingModule({
			imports: [PaymentPage],
			providers: [
				provideRouter(routes),
				provideHttpClient(),
				provideHttpClientTesting(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		});

		httpTestingController = TestBed.inject(HttpTestingController);

		fixture = TestBed.createComponent(PaymentPage);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('Deberían cargar la página', () => {
		expect(component).toBeTruthy();
	});

	it('Debería actualizar los datos de envío', () => {
		
	});
});