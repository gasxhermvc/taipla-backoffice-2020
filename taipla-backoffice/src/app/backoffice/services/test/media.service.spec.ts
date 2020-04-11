import { TestBed } from '@angular/core/testing';

import { MediaService } from '@backoffice/services/media.service';

describe('MediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaService = TestBed.get(MediaService);
    expect(service).toBeTruthy();
  });
});
