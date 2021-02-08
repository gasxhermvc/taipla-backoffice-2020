//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CultureManageComponent } from '@backoffice/culture/components/culture-manage/culture-manage.component';
import { CultureManageAddComponent } from '@backoffice/culture/components/culture-manage/components/culture-manage-add/culture-manage-add.component';
import { CultureManageEditComponent } from '@backoffice/culture/components/culture-manage/components/culture-manage-edit/culture-manage-edit.component';
import { CultureManageListComponent } from '@backoffice/culture/components/culture-manage/components/culture-manage-list/culture-manage-list.component';

describe('CultureManageComponent', () => {
  let component: CultureManageComponent;
  let fixture: ComponentFixture<CultureManageComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [
        CultureManageComponent,
        CultureManageListComponent,
        CultureManageAddComponent,
        CultureManageEditComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureManageComponent);
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
    const compList = debugElement.query(By.css('app-culture-manage-list'));
    const compAdd = debugElement.query(By.css('app-culture-manage-add'));
    const compEdit = debugElement.query(By.css('app-culture-manage-edit'));

    expect(compList).toBeDefined();
    expect(compAdd).toBeNull();
    expect(compEdit).toBeNull();
  })

  it('should be create state add', () => {
    component.service.STATE = component.service.STATE_PAGE.ADD;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-culture-manage-add'));
    const compList = debugElement.query(By.css('app-culture-manage-list'));
    const compEdit = debugElement.query(By.css('app-culture-manage-edit'));

    expect(compAdd).toBeDefined();
    expect(compList).toBeNull();
    expect(compEdit).toBeNull();
  });

  it('should be create state edit', () => {
    component.service.STATE = component.service.STATE_PAGE.EDIT;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-culture-manage-add'));
    const compList = debugElement.query(By.css('app-culture-manage-list'));
    const compEdit = debugElement.query(By.css('app-culture-manage-edit'));

    expect(compEdit).toBeDefined();
    expect(compList).toBeNull();
    expect(compAdd).toBeNull();
  })
});
