import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasEnsayosComponent } from './graficas-ensayos.component';

describe('GraficasEnsayosComponent', () => {
  let component: GraficasEnsayosComponent;
  let fixture: ComponentFixture<GraficasEnsayosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasEnsayosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasEnsayosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
