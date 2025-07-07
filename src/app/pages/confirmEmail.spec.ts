import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmEmailPage } from './confirmEmail.page';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { routes } from '../app.routes';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ConfirmEmailPage', () => {
  let component: ConfirmEmailPage;
  let fixture: ComponentFixture<ConfirmEmailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailPage],
      providers: [
        provideRouter(routes), 
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test-token'
              }
            }
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
