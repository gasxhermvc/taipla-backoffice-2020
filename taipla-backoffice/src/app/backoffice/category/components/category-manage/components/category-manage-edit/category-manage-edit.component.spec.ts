//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CategoryManageEditComponent } from '@backoffice/category/components/category-manage/components/category-manage-edit/category-manage-edit.component';

describe('CategoryManageEditComponent', () => {
  let component: CategoryManageEditComponent;
  let fixture: ComponentFixture<CategoryManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [CategoryManageEditComponent]
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
