import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { Footeer } from './footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { vi } from 'vitest';

describe('Footer Component', () => {
  let component: Footeer;
  let fixture: ComponentFixture<Footeer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footeer],
      providers: [provideRouter(routes)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Footeer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stack navigation links vertically on small screens', () => {
    const navList = fixture.nativeElement.querySelector('ul');
    expect(navList.classList.contains('flex-col')).toBe(true);
  });

  it('should display navigation links horizontally on medium screens and up', () => {
    const navList = fixture.nativeElement.querySelector('ul');
    expect(navList.classList.contains('md:flex-row')).toBe(true);
  });
});
