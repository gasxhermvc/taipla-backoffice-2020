//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { CategoryManageListComponent } from '@backoffice/category/components/category-manage/components/category-manage-list/category-manage-list.component';

describe('CategoryManageListComponent', () => {
  let component: CategoryManageListComponent;
  let fixture: ComponentFixture<CategoryManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [CategoryManageListComponent]
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
