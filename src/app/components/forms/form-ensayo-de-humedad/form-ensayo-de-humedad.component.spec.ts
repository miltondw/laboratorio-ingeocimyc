import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnsayoDeHumedadComponent } from './form-ensayo-de-humedad.component';

describe('FormEnsayoDeHumedadComponent', () => {
  let component: FormEnsayoDeHumedadComponent;
  let fixture: ComponentFixture<FormEnsayoDeHumedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEnsayoDeHumedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnsayoDeHumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
