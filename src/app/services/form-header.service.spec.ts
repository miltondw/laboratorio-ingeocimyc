import { TestBed } from '@angular/core/testing';

import { FormHeaderService } from './form-header.service';

describe('FormHeaderService', () => {
  let service: FormHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
