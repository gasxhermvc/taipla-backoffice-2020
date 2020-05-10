//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { AppBaseModule } from '@app-base/app-base.module';
import { BackofficeComponent } from '@backoffice/backoffice.component';

describe('BackofficeComponent', () => {
  let component: BackofficeComponent;
  let fixture: ComponentFixture<BackofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule,
        AppBaseModule,
      ],
      declarations: [BackofficeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
