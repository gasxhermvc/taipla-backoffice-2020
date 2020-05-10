//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { DatetimeService } from '@based/services/datetime.service';

describe('DatetimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      DatetimeService
    ]
  }));

  it('should be created', () => {
    const service: DatetimeService = TestBed.get(DatetimeService);
    expect(service).toBeTruthy();
  });
});
