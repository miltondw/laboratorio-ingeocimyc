import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaLimitesComponent } from './grafica-limites.component';

describe('GraficaLimitesComponent', () => {
  let component: GraficaLimitesComponent;
  let fixture: ComponentFixture<GraficaLimitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaLimitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaLimitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
