import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeEnsayosComponent } from './informe-ensayos.component';

describe('InformeEnsayosComponent', () => {
  let component: InformeEnsayosComponent;
  let fixture: ComponentFixture<InformeEnsayosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeEnsayosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeEnsayosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
