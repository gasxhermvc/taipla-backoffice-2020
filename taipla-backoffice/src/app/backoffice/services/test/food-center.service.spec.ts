import { TestBed } from '@angular/core/testing';

import { FoodCenterService } from '@backoffice/services/food-center.service';

describe('FoodCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodCenterService = TestBed.get(FoodCenterService);
    expect(service).toBeTruthy();
  });
});
