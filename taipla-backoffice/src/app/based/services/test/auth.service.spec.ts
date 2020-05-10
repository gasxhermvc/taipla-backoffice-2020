//=>Angular
import { TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@app/based/configs/test-config';
import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';
import { LocalStorageService } from '@based/services/local-storage.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ...moduleConfig
    ],
    providers: [
      AuthService,
      AppService,
      LocalStorageService
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
