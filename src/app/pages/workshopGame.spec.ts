import 'zone.js/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { routes } from '../app.routes';
import { WorkshopGamePage } from './workshopGame.page';
import { IngredientesService } from '../../services/admin/ingredients.service';
import { CategoryService } from '../../services/categorias.service';
import { PersonalizationService } from '../../services/personalization.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { vi } from 'vitest';

const mockIngredients = [
    { _id: '1', nombre: 'Lavanda', tipo: 'aroma', categoria: 'vela' },
    { _id: '2', nombre: 'Cera de Soja', tipo: 'molde', categoria: 'vela' },
    { _id: '3', nombre: 'Rojo', tipo: 'color', categoria: 'vela' },
];

const mockCategories = [
    { _id: '1', nombre: 'Velas' }
];

describe('WorkshopGamePage', () => {
  let component: WorkshopGamePage;
  let fixture: ComponentFixture<WorkshopGamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopGamePage],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ categoria: 'velas' })
          }
        },
        {
          provide: IngredientesService,
          useValue: {
            ingredientes: signal(mockIngredients),
            carga: signal(false)
          }
        },
        {
            provide: CategoryService,
            useValue: {
                categorias: signal(mockCategories),
                obtenerPorId: () => of({ categoria: { nombre: 'Velas' } })
            }
        },
        {
            provide: PersonalizationService,
            useValue: {
                crear: () => of({}),
                editar: () => of({}),
                subirFoto: () => of({ secure_url: 'test.jpg' })
            }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and categorize ingredients', fakeAsync(() => {
    tick();
    expect(component.colores.length).toBe(1);
    expect(component.aromas.length).toBe(1);
    expect(component.moldes.length).toBe(1);
  }));
  
});