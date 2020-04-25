import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManageAddComponent } from './category-manage-add.component';

describe('CategoryManageAddComponent', () => {
  let component: CategoryManageAddComponent;
  let fixture: ComponentFixture<CategoryManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
