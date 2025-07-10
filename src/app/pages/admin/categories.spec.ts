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
import { CategoriesPage } from './categories.page';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDNjNTFmYmJjNTU2NmIzZjJiMWU0MSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzUyMDE3NzI2LCJleHAiOjE3NTIwMjEzMjZ9.EcFCwy3v1kG8ARdQiwK0Kvr6igZSSQaNPcQLYvkhRo8';

describe('Página de administración de categorías', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', token);

    TestBed.configureTestingModule({
      imports: [CategoriesPage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    
    httpTestingController = TestBed.inject(HttpTestingController);
    
    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;

    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/categorias`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockCategoriesResponse);

    fixture.detectChanges();
  });
  
  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });
  
  it('Deberían cargar las tarjetas de categorías', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll(
      'div[data-testid="tarjeta-categoria"]',
    );

    expect(tarjetas.length).toBe(mockCategoriesResponse.categorias.length);

    tarjetas.forEach((tarjeta: any, index: number) => {
      const categoria = mockCategoriesResponse.categorias[index];
      expect(tarjeta.querySelector('h3').textContent).toContain(
        categoria.nombre,
      );
      expect(tarjeta.querySelector('p').textContent).toContain(
        categoria.descripcion,
      );
      expect(tarjeta.querySelector('img').src).toContain(categoria.imagen);
    });
  });

  it('Debería actualizar una categoría', () => {
    const tarjeta = fixture.nativeElement.querySelector(
      '[data-testid="tarjeta-categoria"]',
    );

    expect(tarjeta).toBeTruthy();

    const primeraCategoriaId = mockCategoriesResponse.categorias[0]._id;

    const botonEditar = tarjeta.querySelector('[data-testid="editar"]');

    expect(botonEditar).toBeTruthy();

    botonEditar.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    const formulario = fixture.nativeElement.querySelector(
      '[data-testid="formulario-categoria"]',
    );

    expect(formulario).toBeTruthy();

    const inputDescripcion = formulario.querySelector(
      '[data-testid="input-descripcion"]',
    );

    expect(inputDescripcion).toBeTruthy();

    inputDescripcion.value = 'Nueva descripción de prueba para la categoría';

    inputDescripcion.dispatchEvent(new Event('input'));

    const botonActualizar = formulario.querySelector(
      '[data-testid="actualizar-categoria"]',
    );

    expect(botonActualizar).toBeTruthy();

    botonActualizar.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();

    const reqActualizar = httpTestingController.expectOne(
      `${environment.urlApi}/api/categorias/${primeraCategoriaId}`,
    );
    expect(reqActualizar.request.method).toBe('PUT');
    expect(reqActualizar.request.body instanceof FormData).toBeTruthy();
    reqActualizar.flush({ mensaje: 'Categoría actualizada correctamente' });
  });
});

const mockCategoriesResponse = {
  categorias: [
    {
      _id: '680fd248f613dc80267ba5d7',
      nombre: 'Jabones artesanales',
      descripcion:
        'Un jabón artesanal es un producto de higiene y belleza hecho con ingredientes naturales, sin processos industrializados ou químicos sintéticos complexos. Puede elaborarse con insumos accesibles y sin necesidad de herramientas.',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751907023/categorias/sqmedsvkxoe1jagtlmzs.jpg',
      createdAt: '2025-04-28T19:08:56.437Z',
      updatedAt: '2025-07-07T17:13:39.583Z',
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
