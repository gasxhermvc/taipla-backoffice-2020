//=>Angular
import { TestBed, async, inject } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { AuthGuard } from '@based/guards/auth.guard';
import { AuthService } from '@app/based/services/auth.service';
import { AppService } from '@app/based/services/app.service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      providers: [
        AuthGuard,
        AuthService,
        AppService,
      ]
    });
  });

  it('should be create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
