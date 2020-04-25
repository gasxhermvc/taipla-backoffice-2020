import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmManageAddComponent } from './um-manage-add.component';

describe('UmManageAddComponent', () => {
  let component: UmManageAddComponent;
  let fixture: ComponentFixture<UmManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmManageAddComponent ]
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
