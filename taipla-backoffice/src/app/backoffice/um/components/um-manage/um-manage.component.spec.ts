//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { UmManageComponent } from '@backoffice/um/components/um-manage/um-manage.component';
import { UmManageListComponent } from '@backoffice/um/components/um-manage/components/um-manage-list/um-manage-list.component';
import { UmManageAddComponent } from '@backoffice/um/components/um-manage/components/um-manage-add/um-manage-add.component';
import { UmManageEditComponent } from '@backoffice/um/components/um-manage/components/um-manage-edit/um-manage-edit.component';

describe('UmManageComponent', () => {
  let component: UmManageComponent;
  let fixture: ComponentFixture<UmManageComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [
        UmManageComponent,
        UmManageListComponent,
        UmManageAddComponent,
        UmManageEditComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmManageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be create state list', () => {
    component.service.STATE = component.service.STATE_PAGE.LISTS;
    fixture.detectChanges();
    const compList = debugElement.query(By.css('app-um-manage-list'));
    const compAdd = debugElement.query(By.css('app-um-manage-add'));
    const compEdit = debugElement.query(By.css('app-um-manage-edit'));

    expect(compList).toBeDefined();
    expect(compAdd).toBeNull();
    expect(compEdit).toBeNull();
  })

  it('should be create state add', () => {
    component.service.STATE = component.service.STATE_PAGE.ADD;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-um-manage-add'));
    const compList = debugElement.query(By.css('app-um-manage-list'));
    const compEdit = debugElement.query(By.css('app-um-manage-edit'));

    expect(compAdd).toBeDefined();
    expect(compList).toBeNull();
    expect(compEdit).toBeNull();
  });

  it('should be create state edit', () => {
    component.service.STATE = component.service.STATE_PAGE.EDIT;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-um-manage-add'));
    const compList = debugElement.query(By.css('app-um-manage-list'));
    const compEdit = debugElement.query(By.css('app-um-manage-edit'));

    expect(compEdit).toBeDefined();
    expect(compList).toBeNull();
    expect(compAdd).toBeNull();
  })
});
