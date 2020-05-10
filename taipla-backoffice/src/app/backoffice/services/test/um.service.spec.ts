//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { UmService } from '@backoffice/services/um.service';

describe('UmService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      UmService
    ]
  }));

  it('should be created', () => {
    const service: UmService = TestBed.get(UmService);
    expect(service).toBeTruthy();
  });
});
