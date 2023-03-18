import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLimitePlasticoComponent } from './form-limite-plastico.component';

describe('FormLimitePlasticoComponent', () => {
  let component: FormLimitePlasticoComponent;
  let fixture: ComponentFixture<FormLimitePlasticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLimitePlasticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLimitePlasticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
