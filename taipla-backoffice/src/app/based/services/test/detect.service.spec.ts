import { TestBed } from '@angular/core/testing';

import { DetectService } from '@based/services/detect.service';

describe('DetectService', () => {
  let service: DetectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
