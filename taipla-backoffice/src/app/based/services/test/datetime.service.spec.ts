import { TestBed } from '@angular/core/testing';

import { DatetimeService } from '@based/services/datetime.service';

describe('DatetimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatetimeService = TestBed.get(DatetimeService);
    expect(service).toBeTruthy();
  });
});
