//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { UmManageAddComponent } from '@backoffice/um/components/um-manage/components/um-manage-add/um-manage-add.component';

describe('UmManageAddComponent', () => {
  let component: UmManageAddComponent;
  let fixture: ComponentFixture<UmManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [UmManageAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
