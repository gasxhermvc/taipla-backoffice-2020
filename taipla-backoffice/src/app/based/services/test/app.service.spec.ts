//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { AppService } from '@based/services/app.service';

describe('AppService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      AppService
    ]
  }));

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });
});
