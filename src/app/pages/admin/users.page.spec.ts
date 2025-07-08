
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UsersPage } from './users.page';
// import { UsuariosService } from '../../../services/admin/usuarios.service';
// import { of } from 'rxjs';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
// import { signal, output } from '@angular/core';

// class MockModalAvisosComponent {
//   mostrarModal = signal(false);
//   titulo = signal('');
//   mensaje = signal('');
//   tipo = signal('exito');
//   confirmar = output();
//   decision = output();
//   reload = signal(false);
//   close = vi.fn();
//   realizarDecision = vi.fn();
// }

// describe('UsersPage', () => {
//   let component: UsersPage;
//   let fixture: ComponentFixture<UsersPage>;
//   let usuariosServiceMock: any;

//   beforeEach(async () => {
//     usuariosServiceMock = {
//       datosBuscados: vi.fn().mockReturnValue([]),
//       filtro: vi.fn().mockReturnValue({ clave: 'nombre', valor: '' }),
//       carga: vi.fn().mockReturnValue(false),
//       busqueda: ''
//     };

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, UsersPage],
//       providers: [
//         { provide: UsuariosService, useValue: usuariosServiceMock },
//         { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(UsersPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have defined columns', () => {
//     expect(component.columnasTabla).toBeDefined();
//     expect(component.columnasTabla.claves.length).toBe(5);
//     expect(component.columnasTabla.nombres.length).toBe(5);
//   });
// });
