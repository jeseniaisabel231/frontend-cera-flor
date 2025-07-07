import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { Headers } from './header.component';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { vi } from 'vitest';

describe('Header Component', () => {
  let component: Headers;
  let fixture: ComponentFixture<Headers>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headers],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        {
          provide: AuthService,
          useValue: {
            clienteAutenticado: signal(true),
            datosUsuario: () => ({ nombre: 'John' }),
          },
        },
        {
          provide: CarritoService,
          useValue: {
            cantidadProductos: () => 5,
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Headers);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Iniciar sesión/Registrarse" when not authenticated', () => {
    (authService.clienteAutenticado as any).set(false);
    fixture.detectChanges();
    const loginText = fixture.nativeElement.querySelector('div.font-semibold');
    expect(loginText).toBeTruthy();
    expect(loginText.textContent).toContain('Iniciar sesión/Registrarse');
  });
});