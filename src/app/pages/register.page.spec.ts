
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RegisterPage } from './register.page';
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

// describe('RegisterPage', () => {
//   let component: RegisterPage;
//   let fixture: ComponentFixture<RegisterPage>;
//   let authServiceMock: any;

//   beforeEach(async () => {
//     authServiceMock = {
//       register: vi.fn().mockReturnValue(of({ msg: 'Success' }))
//     };

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, RegisterPage],
//       providers: [
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(RegisterPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have an invalid form when empty', () => {
//     expect(component.formRegistro.valid).toBeFalsy();
//   });

//   it('should have a valid form when filled', () => {
//     component.formRegistro.controls['nombre'].setValue('John');
//     component.formRegistro.controls['apellido'].setValue('Doe');
//     component.formRegistro.controls['email'].setValue('john.doe@example.com');
//     component.formRegistro.controls['genero'].setValue('Masculino');
//     component.formRegistro.controls['password'].setValue('Password123!');
//     component.formRegistro.controls['confirmarPassword'].setValue('Password123!');
//     expect(component.formRegistro.valid).toBeTruthy();
//   });

//   it('should call onSubmit method', () => {
//     vi.spyOn(component, 'onSubmit');
//     component.formRegistro.controls['nombre'].setValue('John');
//     component.formRegistro.controls['apellido'].setValue('Doe');
//     component.formRegistro.controls['email'].setValue('john.doe@example.com');
//     component.formRegistro.controls['genero'].setValue('Masculino');
//     component.formRegistro.controls['password'].setValue('Password123!');
//     component.formRegistro.controls['confirmarPassword'].setValue('Password123!');
//     component.onSubmit();
//     expect(authServiceMock.register).toHaveBeenCalledWith('John', 'Doe', 'Masculino', 'john.doe@example.com', 'Password123!');
//   });

//   it('should handle error on registration', () => {
//     authServiceMock.register.and.returnValue(throwError(() => ({ error: { msg: 'Error' } })));
//     component.formRegistro.controls['nombre'].setValue('John');
//     component.formRegistro.controls['apellido'].setValue('Doe');
//     component.formRegistro.controls['email'].setValue('john.doe@example.com');
//     component.formRegistro.controls['genero'].setValue('Masculino');
//     component.formRegistro.controls['password'].setValue('Password123!');
//     component.formRegistro.controls['confirmarPassword'].setValue('Password123!');
//     component.onSubmit();
//     expect(component.validacion()).toBe('Error');
//   });
// });
