// import { describe, it, expect, beforeEach, vi } from 'vitest';
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

// describe('PaymentPage', () => {
//   let component: PaymentPage;
//   let fixture: ComponentFixture<PaymentPage>;
//   let carritoServiceMock: any;
//   let authServiceMock: any;
//   let paymentServiceMock: any;
//   let facturaServiceMock: any;

//   beforeEach(async () => {
//     carritoServiceMock = {
//       carrito: vi.fn().mockReturnValue({ productos: [], total: 0 }),
//       vaciarCarrito: vi.fn().mockReturnValue(of({})),
//     };
//     authServiceMock = {
//       datosUsuario: vi.fn().mockReturnValue({}),
//       actualizarPerfil: vi.fn().mockReturnValue(of({})),
//     };
//     paymentServiceMock = {
//       crearElementoTarjeta: vi.fn(),
//       pagarCarrito: vi.fn().mockReturnValue(Promise.resolve(of({ venta: {}, cliente: {} }))),
//     };
//     facturaServiceMock = {
//       obtenerFacturas: vi.fn().mockReturnValue(of([])),
//     };

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NgxStripeModule.forRoot(), PaymentPage],
//       providers: [
//         { provide: CarritoService, useValue: carritoServiceMock },
//         { provide: AuthService, useValue: authServiceMock },
//         { provide: PaymentService, useValue: paymentServiceMock },
//         { provide: FacturaService, useValue: facturaServiceMock },
//         { provide: ModalAvisosComponent, useClass: MockModalAvisosComponent }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(PaymentPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call onSubmitDatos method', () => {
//     component.formularioDireccion.controls['cedula'].setValue('1234567890');
//     component.formularioDireccion.controls['direccion'].setValue('Calle Falsa 123');
//     component.formularioDireccion.controls['telefono'].setValue('1234567890');
//     component.onSubmitDatos();
//     expect(authServiceMock.actualizarPerfil).toHaveBeenCalled();
//   });

//   it('should call onSubmitPago method', async () => {
//     const event = new Event('click');
//     await component.onSubmitPago(event);
//     expect(paymentServiceMock.pagarCarrito).toHaveBeenCalled();
//   });

//   it('should handle error on payment', () => {
//     paymentServiceMock.pagarCarrito.and.returnValue(Promise.resolve(throwError(() => new Error('Payment failed'))));
//     const event = new Event('click');
//     component.onSubmitPago(event);
//     expect(component.tipoRespuesta()).toBe('error');
//     expect(component.mostrarModalError()).toBe(true);
//   });
// });