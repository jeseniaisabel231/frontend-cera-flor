
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientsPage } from './ingredients.page';
import { IngredientesService } from '../../../services/admin/ingredients.service';
import { CategoryService } from '../../../services/categorias.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
import { signal, output } from '@angular/core';

class MockModalAvisosComponent {
  mostrarModal = signal(false);
  titulo = signal('');
  mensaje = signal('');
  tipo = signal('exito');
  // confirmar = output();
  // decision = output();
  reload = signal(false);
  close = vi.fn();
  realizarDecision = vi.fn();
}

describe('IngredientsPage', () => {
  let component: IngredientsPage;
  let fixture: ComponentFixture<IngredientsPage>;
  let ingredientesServiceMock: any;
  let categoryServiceMock: any;

  beforeEach(async () => {
    ingredientesServiceMock = {
      datosBuscados: vi.fn().mockReturnValue([]),
      filtro: vi.fn().mockReturnValue({ clave: 'tipo', valor: '' }),
      carga: vi.fn().mockReturnValue(false),
      eliminar: vi.fn().mockReturnValue(of({})),
    };
    categoryServiceMock = {
      obtener: vi.fn().mockReturnValue(of({ categorias: [] })),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, IngredientsPage],
      providers: [
        { provide: IngredientesService, useValue: ingredientesServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verFormulario method', () => {
    vi.spyOn(component, 'verFormulario');
    component.verFormulario();
    expect(component.verFormulario).toHaveBeenCalled();
    expect(component.mostrarModal()).toBe(true);
    expect(component.accionAsignada()).toBe('Registrar');
  });

  it('should call editarIngrediente method', () => {
    const ingrediente = { _id: '1', nombre: 'Test', tipo: 'molde', imagen: '', precio: 10, stock: 10, id_categoria: '1' };
    vi.spyOn(component, 'editarIngrediente');
    component.editarIngrediente(ingrediente);
    expect(component.editarIngrediente).toHaveBeenCalledWith(ingrediente);
    expect(component.mostrarModal()).toBe(true);
    expect(component.accionAsignada()).toBe('Actualizar');
  });

  it('should call eliminarIngrediente method', () => {
    vi.spyOn(component, 'eliminarIngrediente');
    component.eliminarIngrediente('1');
    expect(component.eliminarIngrediente).toHaveBeenCalledWith('1');
    expect(component.mostrarModalConfirmacion()).toBe(true);
  });

  it('should call confirmarEliminacion method', () => {
    vi.spyOn(component, 'confirmarEliminacion');
    component.confirmarEliminacion();
    expect(component.confirmarEliminacion).toHaveBeenCalled();
  });
});
