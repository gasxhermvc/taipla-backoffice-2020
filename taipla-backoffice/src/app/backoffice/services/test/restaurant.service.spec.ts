//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { RestaurantService } from '@backoffice/services/restaurant.service';

describe('RestaurantService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      RestaurantService
    ]
  }));

  it('should be created', () => {
    const service: RestaurantService = TestBed.get(RestaurantService);
    expect(service).toBeTruthy();
  });
});
