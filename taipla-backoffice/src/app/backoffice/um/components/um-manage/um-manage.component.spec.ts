import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmManageComponent } from './um-manage.component';

describe('UmManageComponent', () => {
  let component: UmManageComponent;
  let fixture: ComponentFixture<UmManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
