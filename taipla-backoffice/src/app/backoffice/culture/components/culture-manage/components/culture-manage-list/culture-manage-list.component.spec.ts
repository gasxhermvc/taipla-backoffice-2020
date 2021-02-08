//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { CultureManageListComponent } from '@backoffice/culture/components/culture-manage/components/culture-manage-list/culture-manage-list.component';

describe('CultureManageListComponent', () => {
  let component: CultureManageListComponent;
  let fixture: ComponentFixture<CultureManageListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [CultureManageListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
