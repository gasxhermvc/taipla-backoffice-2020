//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { BackofficeService } from '@backoffice/services/backoffice.service';

describe('BackofficeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      BackofficeService
    ]
  }));

  it('should be created', () => {
    const service: BackofficeService = TestBed.get(BackofficeService);
    expect(service).toBeTruthy();
  });
});
