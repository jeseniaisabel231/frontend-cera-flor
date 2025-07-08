
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromotionsPage } from './promotions.page';
import { PromocionesService } from '../../../services/admin/promociones.service';
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
  // confirmar = output();
  // decision = output();
  reload = signal(false);
  close = vi.fn();
  realizarDecision = vi.fn();
}

describe('PromotionsPage', () => {
  let component: PromotionsPage;
  let fixture: ComponentFixture<PromotionsPage>;
  let promocionesServiceMock: any;

  beforeEach(async () => {
    promocionesServiceMock = {
      datosBuscados: vi.fn().mockReturnValue([]),
      carga: vi.fn().mockReturnValue(false),
      eliminar: vi.fn().mockReturnValue(of({})),
      busqueda: ''
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, PromotionsPage],
      providers: [
        { provide: PromocionesService, useValue: promocionesServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registrarPromociones method', () => {
    vi.spyOn(component, 'registrarPromociones');
    component.registrarPromociones();
    expect(component.registrarPromociones).toHaveBeenCalled();
    expect(component.mostrarModal()).toBe(true);
    expect(component.accionAsignada()).toBe('Registrar');
  });

  it('should call editarPromociones method', () => {
    const promocion = { _id: '1', nombre: 'Test', imagen: '', createdAt: new Date().toISOString() };
    vi.spyOn(component, 'editarPromociones');
    component.editarPromociones(promocion);
    expect(component.editarPromociones).toHaveBeenCalledWith(promocion);
    expect(component.mostrarModal()).toBe(true);
    expect(component.accionAsignada()).toBe('Actualizar');
  });

  it('should call eliminarPromociones method', () => {
    vi.spyOn(component, 'eliminarPromociones');
    component.eliminarPromociones('1');
    expect(component.eliminarPromociones).toHaveBeenCalledWith('1');
    expect(component.mostrarModalConfirmacion()).toBe(true);
  });

  it('should call confirmarEliminacion method', () => {
    vi.spyOn(component, 'confirmarEliminacion');
    component.confirmarEliminacion();
    expect(component.confirmarEliminacion).toHaveBeenCalled();
  });
});
