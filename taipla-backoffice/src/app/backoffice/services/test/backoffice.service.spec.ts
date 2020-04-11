import { TestBed } from '@angular/core/testing';

import { BackofficeService } from '@backoffice/services/backoffice.service';

describe('BackofficeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackofficeService = TestBed.get(BackofficeService);
    expect(service).toBeTruthy();
  });
});
