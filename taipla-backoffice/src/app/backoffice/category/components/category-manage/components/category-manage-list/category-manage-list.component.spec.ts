import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManageListComponent } from './category-manage-list.component';

describe('CategoryManageListComponent', () => {
  let component: CategoryManageListComponent;
  let fixture: ComponentFixture<CategoryManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
