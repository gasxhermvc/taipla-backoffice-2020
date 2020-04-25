import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmManageEditComponent } from './um-manage-edit.component';

describe('UmManageEditComponent', () => {
  let component: UmManageEditComponent;
  let fixture: ComponentFixture<UmManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
