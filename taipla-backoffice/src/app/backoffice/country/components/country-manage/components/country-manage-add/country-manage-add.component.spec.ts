//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CountryManageAddComponent } from '@backoffice/country/components/country-manage/components/country-manage-add/country-manage-add.component';

describe('CountryManageAddComponent', () => {
  let component: CountryManageAddComponent;
  let fixture: ComponentFixture<CountryManageAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [CountryManageAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
