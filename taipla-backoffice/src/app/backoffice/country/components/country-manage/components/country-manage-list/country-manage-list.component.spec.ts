//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { CountryManageListComponent } from '@backoffice/country/components/country-manage/components/country-manage-list/country-manage-list.component';

describe('CountryManageListComponent', () => {
  let component: CountryManageListComponent;
  let fixture: ComponentFixture<CountryManageListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [CountryManageListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
