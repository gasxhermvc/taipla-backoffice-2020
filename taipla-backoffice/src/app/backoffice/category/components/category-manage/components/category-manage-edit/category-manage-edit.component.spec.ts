import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManageEditComponent } from './category-manage-edit.component';

describe('CategoryManageEditComponent', () => {
  let component: CategoryManageEditComponent;
  let fixture: ComponentFixture<CategoryManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
