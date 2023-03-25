import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEnsayoComponent } from './crear-ensayo.component';

describe('CrearEnsayoComponent', () => {
  let component: CrearEnsayoComponent;
  let fixture: ComponentFixture<CrearEnsayoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEnsayoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEnsayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
