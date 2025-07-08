
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RecuperarContrasenia } from './recoverpassword.page';
// import { AuthService } from '../../services/auth.service';
// import { of, throwError } from 'rxjs';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
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

// describe('RecuperarContrasenia', () => {
//   let component: RecuperarContrasenia;
//   let fixture: ComponentFixture<RecuperarContrasenia>;
//   let authServiceMock: any;

//   beforeEach(async () => {
//     authServiceMock = {
//       recuperarContrasenia: vi.fn().mockReturnValue(of({ msg: 'Success' })),
//       restablecerContrasenia: vi.fn().mockReturnValue(of({ msg: 'Success' }))
//     };

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, RecuperarContrasenia],
//       providers: [
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(RecuperarContrasenia);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call onSubmit method for email', () => {
//     component.formulario.controls['email'].setValue('test@example.com');
//     component.onSubmit();
//     expect(authServiceMock.recuperarContrasenia).toHaveBeenCalledWith('test@example.com');
//   });

//   it('should call onSubmitPassword method for password reset', () => {
//     component.formulario.controls['email'].setValue('test@example.com');
//     component.formPassword.controls['nuevaPassword'].setValue('Password123!');
//     component.formPassword.controls['confirmarPassword'].setValue('Password123!');
//     component.formPassword.controls['codigoRecuperacion'].setValue('123456');
//     component.onSubmitPassword();
//     expect(authServiceMock.restablecerContrasenia).toHaveBeenCalledWith('test@example.com', 'Password123!', '123456');
//   });

//   it('should handle error on email submission', () => {
//     authServiceMock.recuperarContrasenia.and.returnValue(throwError(() => ({ error: { msg: 'Error' } })));
//     component.formulario.controls['email'].setValue('test@example.com');
//     component.onSubmit();
//     expect(component.titulo()).toBe('Error');
//     expect(component.mensaje()).toBe('Error');
//   });

//   it('should handle error on password reset', () => {
//     authServiceMock.restablecerContrasenia.and.returnValue(throwError(() => ({ error: { msg: 'Error' } })));
//     component.formulario.controls['email'].setValue('test@example.com');
//     component.formPassword.controls['nuevaPassword'].setValue('Password123!');
//     component.formPassword.controls['confirmarPassword'].setValue('Password123!');
//     component.formPassword.controls['codigoRecuperacion'].setValue('123456');
//     component.onSubmitPassword();
//     expect(component.titulo()).toBe('Error');
//     expect(component.mensaje()).toBe('Error');
//   });
// });
