import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEnsayoComponent } from './form-create-ensayo.component';

describe('FormCreateEnsayoComponent', () => {
  let component: FormCreateEnsayoComponent;
  let fixture: ComponentFixture<FormCreateEnsayoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateEnsayoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateEnsayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
