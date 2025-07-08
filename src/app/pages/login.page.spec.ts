
// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginPage } from './login.page';
// import { AuthService } from '../../services/auth.service';
// import { of } from 'rxjs';
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

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;
//   let authServiceMock: any;

//   beforeEach(async () => {
//     authServiceMock = {
//       login: vi.fn().mockReturnValue(of({}))
//     };

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, LoginPage],
//       providers: [
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have an invalid form when empty', () => {
//     expect(component.formulario.valid).toBeFalsy();
//   });

//   it('should have a valid form when filled', () => {
//     component.formulario.controls['email'].setValue('test@example.com');
//     component.formulario.controls['password'].setValue('password123');
//     expect(component.formulario.valid).toBeTruthy();
//   });

//   it('should call onSubmit method', () => {
//     vi.spyOn(component, 'onSubmit');
//     const form = fixture.nativeElement.querySelector('form');
//     form.dispatchEvent(new Event('submit'));
//     expect(component.onSubmit).toHaveBeenCalled();
//   });
// });
