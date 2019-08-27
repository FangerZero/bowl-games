import { TestBed } from '@angular/core/testing';

import { BowlsService } from './bowls.service';

describe('BowlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BowlsService = TestBed.get(BowlsService);
    expect(service).toBeTruthy();
  });
});
