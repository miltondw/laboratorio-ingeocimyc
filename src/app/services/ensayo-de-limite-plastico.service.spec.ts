import { TestBed } from '@angular/core/testing';

import { EnsayoDeLimitePlasticoService } from './ensayo-de-limite-plastico.service';

describe('EnsayoDeLimitePlasticoService', () => {
  let service: EnsayoDeLimitePlasticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsayoDeLimitePlasticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
