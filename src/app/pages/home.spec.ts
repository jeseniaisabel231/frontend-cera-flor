import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixtureAutoDetect,
  TestBed,
  type ComponentFixture,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductosService } from '../../services/admin/productos.service';
import { routes } from '../app.routes';
import { HomePage } from './home.page';

describe('Página de Inicio', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let productService: ProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        provideHttpClient(),
        provideRouter(routes),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    productService = TestBed.inject(ProductosService);
  });

  it('Debería crearse la página de inicio', () => {
    expect(component).toBeTruthy();
  });
});
