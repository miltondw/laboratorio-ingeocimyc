import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLimiteLiquidoComponent } from './form-limite-liquido.component';

describe('FormLimiteLiquidoComponent', () => {
  let component: FormLimiteLiquidoComponent;
  let fixture: ComponentFixture<FormLimiteLiquidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLimiteLiquidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLimiteLiquidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
