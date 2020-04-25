import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmManageListComponent } from './um-manage-list.component';

describe('UmManageListComponent', () => {
  let component: UmManageListComponent;
  let fixture: ComponentFixture<UmManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmManageListComponent ]
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
