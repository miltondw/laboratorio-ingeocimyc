import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGranulometriaComponent } from './form-granulometria.component';

describe('FormGranulometriaComponent', () => {
  let component: FormGranulometriaComponent;
  let fixture: ComponentFixture<FormGranulometriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGranulometriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGranulometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
