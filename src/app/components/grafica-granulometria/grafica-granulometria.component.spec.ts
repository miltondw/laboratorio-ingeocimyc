import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaGranulometriaComponent } from './grafica-granulometria.component';

describe('GraficaGranulometriaComponent', () => {
  let component: GraficaGranulometriaComponent;
  let fixture: ComponentFixture<GraficaGranulometriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaGranulometriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaGranulometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
