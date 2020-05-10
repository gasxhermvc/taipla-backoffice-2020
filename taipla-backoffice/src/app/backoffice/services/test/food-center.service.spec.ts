//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@app/based/configs/test-config';
import { FoodCenterService } from '@backoffice/services/food-center.service';

describe('FoodCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      FoodCenterService
    ]
  }));

  it('should be created', () => {
    const service: FoodCenterService = TestBed.get(FoodCenterService);
    expect(service).toBeTruthy();
  });
});
