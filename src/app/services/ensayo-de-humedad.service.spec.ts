import { TestBed } from '@angular/core/testing';

import { EnsayoDeHumedadService } from './ensayo-de-humedad.service';

describe('EnsayoDeHumedadService', () => {
  let service: EnsayoDeHumedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsayoDeHumedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
