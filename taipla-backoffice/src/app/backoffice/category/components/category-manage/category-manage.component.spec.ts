//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CategoryManageComponent } from '@backoffice/category/components/category-manage/category-manage.component';
import { CategoryManageAddComponent } from '@backoffice/category/components/category-manage/components/category-manage-add/category-manage-add.component';
import { CategoryManageEditComponent } from '@backoffice/category/components/category-manage/components/category-manage-edit/category-manage-edit.component';
import { CategoryManageListComponent } from '@backoffice/category/components/category-manage/components/category-manage-list/category-manage-list.component';

describe('CategoryManageComponent', () => {
  let component: CategoryManageComponent;
  let fixture: ComponentFixture<CategoryManageComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [
        CategoryManageComponent,
        CategoryManageListComponent,
        CategoryManageAddComponent,
        CategoryManageEditComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManageComponent);
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
    const compList = debugElement.query(By.css('app-category-manage-list'));
    const compAdd = debugElement.query(By.css('app-category-manage-add'));
    const compEdit = debugElement.query(By.css('app-category-manage-edit'));

    expect(compList).toBeDefined();
    expect(compAdd).toBeNull();
    expect(compEdit).toBeNull();
  })

  it('should be create state add', () => {
    component.service.STATE = component.service.STATE_PAGE.ADD;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-category-manage-add'));
    const compList = debugElement.query(By.css('app-category-manage-list'));
    const compEdit = debugElement.query(By.css('app-category-manage-edit'));

    expect(compAdd).toBeDefined();
    expect(compList).toBeNull();
    expect(compEdit).toBeNull();
  });

  it('should be create state edit', () => {
    component.service.STATE = component.service.STATE_PAGE.EDIT;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-category-manage-add'));
    const compList = debugElement.query(By.css('app-category-manage-list'));
    const compEdit = debugElement.query(By.css('app-category-manage-edit'));

    expect(compEdit).toBeDefined();
    expect(compList).toBeNull();
    expect(compAdd).toBeNull();
  })
});
