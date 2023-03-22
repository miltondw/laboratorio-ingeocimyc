import { TestBed } from '@angular/core/testing';

import { EnsayoDeLimiteLiquidoService } from './ensayo-de-limite-liquido.service';

describe('EnsayoDeLimiteLiquidoService', () => {
  let service: EnsayoDeLimiteLiquidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsayoDeLimiteLiquidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
