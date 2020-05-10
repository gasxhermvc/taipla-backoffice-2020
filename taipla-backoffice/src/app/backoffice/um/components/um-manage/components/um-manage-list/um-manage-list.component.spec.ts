//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { UmManageListComponent } from '@backoffice/um/components/um-manage/components/um-manage-list/um-manage-list.component';

describe('UmManageListComponent', () => {
  let component: UmManageListComponent;
  let fixture: ComponentFixture<UmManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [UmManageListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
