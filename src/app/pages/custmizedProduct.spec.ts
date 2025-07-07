import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustmizedProductPage } from './custmizedProduct.page';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ModalResumenProductoComponent } from '../components/modalResumenProducto.component';
import { signal } from '@angular/core';

class MockModalResumenProductoComponent {
  mostrarModal = signal(false);
  datos = signal({});
}

describe('CustmizedProductPage', () => {
  let component: CustmizedProductPage;
  let fixture: ComponentFixture<CustmizedProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustmizedProductPage],
      providers: [
        provideRouter(routes), 
        provideHttpClient(),
        { provide: ModalResumenProductoComponent, useClass: MockModalResumenProductoComponent }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustmizedProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});