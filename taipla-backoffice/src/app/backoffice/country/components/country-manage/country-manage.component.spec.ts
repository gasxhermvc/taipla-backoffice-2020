//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CountryManageComponent } from '@backoffice/country/components/country-manage/country-manage.component';
import { CountryManageAddComponent } from '@backoffice/country/components/country-manage/components/country-manage-add/country-manage-add.component';
import { CountryManageEditComponent } from '@backoffice/country/components/country-manage/components/country-manage-edit/country-manage-edit.component';
import { CountryManageListComponent } from '@backoffice/country/components/country-manage/components/country-manage-list/country-manage-list.component';

describe('CountryManageComponent', () => {
  let component: CountryManageComponent;
  let fixture: ComponentFixture<CountryManageComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [
        CountryManageComponent,
        CountryManageListComponent,
        CountryManageAddComponent,
        CountryManageEditComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryManageComponent);
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
    const compList = debugElement.query(By.css('app-country-manage-list'));
    const compAdd = debugElement.query(By.css('app-country-manage-add'));
    const compEdit = debugElement.query(By.css('app-country-manage-edit'));

    expect(compList).toBeDefined();
    expect(compAdd).toBeNull();
    expect(compEdit).toBeNull();
  })

  it('should be create state add', () => {
    component.service.STATE = component.service.STATE_PAGE.ADD;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-country-manage-add'));
    const compList = debugElement.query(By.css('app-country-manage-list'));
    const compEdit = debugElement.query(By.css('app-country-manage-edit'));

    expect(compAdd).toBeDefined();
    expect(compList).toBeNull();
    expect(compEdit).toBeNull();
  });

  it('should be create state edit', () => {
    component.service.STATE = component.service.STATE_PAGE.EDIT;
    fixture.detectChanges();
    const compAdd = debugElement.query(By.css('app-country-manage-add'));
    const compList = debugElement.query(By.css('app-country-manage-list'));
    const compEdit = debugElement.query(By.css('app-country-manage-edit'));

    expect(compEdit).toBeDefined();
    expect(compList).toBeNull();
    expect(compAdd).toBeNull();
  })
});
