import { TestBed } from '@angular/core/testing';

import { EnsayoDeGranulometriaService } from './ensayo-de-granulometria.service';

describe('EnsayoDeGranulometriaService', () => {
  let service: EnsayoDeGranulometriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsayoDeGranulometriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
