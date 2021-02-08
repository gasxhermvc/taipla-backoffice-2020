//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CountryManageEditComponent } from '@backoffice/country/components/country-manage/components/country-manage-edit/country-manage-edit.component';

describe('CountryManageEditComponent', () => {
  let component: CountryManageEditComponent;
  let fixture: ComponentFixture<CountryManageEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [CountryManageEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
