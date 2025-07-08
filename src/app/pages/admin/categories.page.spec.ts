
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesPage } from './categories.page';
import { CategoryService } from '../../../services/categorias.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
import { signal, output } from '@angular/core';

class MockModalAvisosComponent {
  mostrarModal = signal(false);
  titulo = signal('');
  mensaje = signal('');
  tipo = signal('exito');
  confirmar = output();
  decision = output();
  reload = signal(false);
  close = vi.fn();
  realizarDecision = vi.fn();
}

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      categorias: vi.fn().mockReturnValue([]),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, CategoriesPage],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call abrirFormEditar method', () => {
    const categoria = { _id: '1', nombre: 'Test', descripcion: 'Test desc', imagen: '' };
    vi.spyOn(component, 'abrirFormEditar');
    component.abrirFormEditar(categoria);
    expect(component.abrirFormEditar).toHaveBeenCalledWith(categoria);
    expect(component.mostrarModal()).toBe(true);
  });
});
