//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { MediaService } from '@backoffice/services/media.service';

describe('MediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      MediaService
    ]
  }));

  it('should be created', () => {
    const service: MediaService = TestBed.get(MediaService);
    expect(service).toBeTruthy();
  });
});
