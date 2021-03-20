import { TestBed } from '@angular/core/testing';

import { PotholeService } from './pothole.service';

describe('PotholeService', () => {
  let service: PotholeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotholeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
