import { TestBed } from '@angular/core/testing';

import { ApplyMenuGuard } from '@based/guards/apply-menu.guard';

describe('ApplyMenuGuard', () => {
  let guard: ApplyMenuGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ApplyMenuGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
