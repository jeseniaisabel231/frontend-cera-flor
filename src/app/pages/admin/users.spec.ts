import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { routes } from '../../app.routes';
import { ModalAvisosComponent } from '../../components/admin/modalavisos.component';
import { TablaComponent } from '../../components/admin/tabla.component';
import { UsersPage } from './users.page';

describe('Página de administración de usuarios', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let httpTestingController: HttpTestingController;

  let tablaUsuarios: HTMLTableElement;

  beforeEach(async () => {
    localStorage.setItem('token', 'token-de-prueba');

    TestBed.configureTestingModule({
      imports: [UsersPage, ModalAvisosComponent, TablaComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Deberían cargar la página', () => {
    expect(component).toBeTruthy();
  });

  it('Debería ver la tabla de usuarios', async () => {
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/admin/clientes`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);

    fixture.detectChanges();

    tablaUsuarios = fixture.nativeElement.querySelector(
      '[data-testid="tabla-usuarios"]',
    );

    expect(tablaUsuarios).toBeTruthy();

    const filas = tablaUsuarios.querySelectorAll('tr');

    // Menos una fila, porque pertenece al encabezado de la tabla
    expect(filas.length - 1).toBe(mockUsersResponse.clientes.length);
  });

  it('Debería poder actualizar el estado del cliente', async () => {
    // Primero cargamos los datos en la tabla
    const req = httpTestingController.expectOne(
      `${environment.urlApi}/api/admin/clientes`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsersResponse);
    fixture.detectChanges();

    tablaUsuarios = fixture.nativeElement.querySelector(
      '[data-testid="tabla-usuarios"]',
    );
    expect(tablaUsuarios).toBeTruthy();

    const filas = tablaUsuarios.querySelectorAll('tr');
    const segundoUsuarioId = mockUsersResponse.clientes[0]._id;

    const estadoActual = filas[1].querySelector(
      '[data-testid="dato-estado"]',
    )?.textContent;
    const esActivo = estadoActual === 'activo';

    const botonActualizarEstado = filas[1].querySelector(
      '[data-testid="boton-estado"]',
    ) as HTMLButtonElement;

    expect(botonActualizarEstado).toBeTruthy();

    botonActualizarEstado.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    const modal = tablaUsuarios.querySelector('[data-testid="modal-avisos"]');
    expect(modal).toBeTruthy();

    const botonAceptar = modal?.querySelector(
      '[data-testid="boton-aceptar"]',
    ) as HTMLButtonElement;
    expect(botonAceptar).toBeTruthy();
    expect(botonAceptar.textContent?.trim()).toBe('Aceptar');

    botonAceptar.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    let url = '',
      method = '',
      estado = '';

    if (esActivo) {
      url = `${environment.urlApi}/api/admin/clientes/${segundoUsuarioId}`;
      method = 'DELETE';
      estado = 'inactivo';
    } else {
      url = `${environment.urlApi}/api/admin/clientes/activar/${segundoUsuarioId}`;
      method = 'PATCH';
      estado = 'activo';
    }

    const reqActualizar = httpTestingController.expectOne(url);
    expect(reqActualizar.request.method).toBe(method);
    reqActualizar.flush({ estado });

    fixture.detectChanges();
    const nuevoEstado = filas[1].querySelector('[data-testid="dato-estado"]');
    expect(nuevoEstado?.textContent).toBe(estado);
  });
});

const mockUsersResponse = {
  totalClientes: 5,
  totalPaginas: 1,
  paginaActual: 1,
  clientes: [
    {
      _id: '68646b4c4492af792faf6ecd',
      nombre: 'John',
      apellido: 'Mata',
      genero: 'masculino',
      email: 'jhonmata0427@gmail.com',
      estado: 'inactivo',
      createdAt: '2025-07-01T23:12:12.999Z',
      updatedAt: '2025-07-08T15:41:26.141Z',
      cedula: '1726405393',
      direccion: 'barrio venceromos 2',
      telefono: '0994213545',
      fecha_nacimiento: '2003-04-27T00:00:00.000Z',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751989285/clientes/ocbngbnzqlmklhk3ttat.jpg',
      notificationPushToken: 'ExponentPushToken[6LEWXIN08tW-ihd_Qc6FIB]',
    },
    {
      _id: '686479774492af792faf78f7',
      nombre: 'Byron',
      apellido: 'Loarte',
      genero: 'Masculino',
      email: 'byrontosh08@gmail.com',
      estado: 'activo',
      createdAt: '2025-07-02T00:12:39.896Z',
      updatedAt: '2025-07-02T00:21:48.892Z',
    },
    {
      _id: '6865c860a366a35c00cde526',
      nombre: 'Estefania',
      apellido: 'Sanchez',
      genero: 'Femenino',
      email: 'estef123@yopmail.com',
      estado: 'inactivo',
      createdAt: '2025-07-03T00:01:36.055Z',
      updatedAt: '2025-07-08T15:42:44.174Z',
    },
    {
      _id: '6865e6194492af792fafb450',
      nombre: 'Jesenia Isabel',
      apellido: 'Pazto Corregidor',
      genero: 'femenino',
      email: 'jesenia.pazto@epn.edu.ec',
      estado: 'activo',
      createdAt: '2025-07-03T02:08:25.296Z',
      updatedAt: '2025-07-08T19:26:03.410Z',
      telefono: '0994231454',
      cedula: '1726405394',
      direccion: 'El Beaterio Barrio 2 divino',
      fecha_nacimiento: '2002-01-04T00:00:00.000Z',
      imagen:
        'https://res.cloudinary.com/ddg5fu4yt/image/upload/v1751570139/clientes/rrwen41nfphsytkzv7pv.jpg',
      notificationPushToken: 'ExponentPushToken[nlRkqJL77hZF-MEhavtJPt]',
    },
    {
      _id: '68671c6f5e92f6237d49d212',
      nombre: 'Byron',
      apellido: 'Loarte',
      genero: 'masculino',
      email: 'byron.loarteb@epn.edu.ec',
      estado: 'inactivo',
      createdAt: '2025-07-04T00:12:31.292Z',
      updatedAt: '2025-07-08T15:42:42.709Z',
      cedula: '1723456789',
      direccion: 'Direccion 123, Calle 12',
      fecha_nacimiento: '2000-05-25T00:00:00.000Z',
      telefono: '0987654321',
    },
  ],
};
