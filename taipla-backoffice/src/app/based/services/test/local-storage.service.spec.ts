//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { LocalStorageService } from '@based/services/local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [...moduleConfig],
    providers: [
      LocalStorageService
    ]
  }));

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});
