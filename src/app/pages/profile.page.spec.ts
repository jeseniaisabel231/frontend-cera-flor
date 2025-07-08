
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProfilePage } from './profile.page';
// import { AuthService } from '../../services/auth.service';
// import { FacturaService } from '../../services/facturas.service';
// import { of } from 'rxjs';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ActivatedRoute } from '@angular/router';
// import { ModalAvisosComponent } from '../components/admin/modalavisos.component';
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

// describe('ProfilePage', () => {
//   let component: ProfilePage;
//   let fixture: ComponentFixture<ProfilePage>;
//   let authServiceMock: any;
//   let facturaServiceMock: any;
//   let routerMock: any;

//   beforeEach(async () => {
//     authServiceMock = {
//       datosUsuario: vi.fn().mockReturnValue({}),
//       actualizarPerfil: vi.fn().mockReturnValue(of({})),
//     };
//     facturaServiceMock = {
//       facturas: vi.fn().mockReturnValue([]),
//       carga: vi.fn().mockReturnValue(false),
//     };
//     routerMock = {
//       navigate: vi.fn().mockReturnValue(Promise.resolve(true))
//     };

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, ProfilePage],
//       providers: [
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: FacturaService, useValue: facturaServiceMock },
//         { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProfilePage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have an invalid form when empty', () => {
//     expect(component.perfilFormulario.valid).toBeFalsy();
//   });

//   it('should have a valid form when filled', () => {
//     component.perfilFormulario.controls['nombre'].setValue('John');
//     component.perfilFormulario.controls['apellido'].setValue('Doe');
//     component.perfilFormulario.controls['email'].setValue('john.doe@example.com');
//     component.perfilFormulario.controls['genero'].setValue('masculino');
//     component.perfilFormulario.controls['telefono'].setValue('1234567890');
//     component.perfilFormulario.controls['direccion'].setValue('Calle Falsa 123');
//     component.perfilFormulario.controls['cedula'].setValue('1234567890');
//     component.perfilFormulario.controls['fecha_nacimiento'].setValue('2000-01-01');
//     component.perfilFormulario.controls['imagen'].setValue('imagen.jpg');
//     expect(component.perfilFormulario.valid).toBeTruthy();
//   });

//   it('should call onSubmit method', () => {
//     vi.spyOn(component, 'onSubmit');
//     const form = fixture.nativeElement.querySelector('form');
//     form.dispatchEvent(new Event('submit'));
//     expect(component.onSubmit).toHaveBeenCalled();
//   });

//   it('should call cerrarSesion method', () => {
//     vi.spyOn(component, 'cerrarSesion');
//     const logoutButton = fixture.nativeElement.querySelector('li.border-t');
//     logoutButton.click();
//     expect(component.cerrarSesion).toHaveBeenCalled();
//   });
// });
