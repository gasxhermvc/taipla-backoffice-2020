import { TestBed } from '@angular/core/testing';

import { LegendService } from '@backoffice/services/legend.service';

describe('LegendService', () => {
  let service: LegendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
