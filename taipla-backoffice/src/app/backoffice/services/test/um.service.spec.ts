import { TestBed } from '@angular/core/testing';

import { UmService } from '@backoffice/services/um.service';

describe('UmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UmService = TestBed.get(UmService);
    expect(service).toBeTruthy();
  });
});
