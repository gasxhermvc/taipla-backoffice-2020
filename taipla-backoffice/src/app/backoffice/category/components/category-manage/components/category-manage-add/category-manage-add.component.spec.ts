//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ShareModule } from '@cores/share.module';
import { CategoryManageAddComponent } from '@backoffice/category/components/category-manage/components/category-manage-add/category-manage-add.component';

describe('CategoryManageAddComponent', () => {
  let component: CategoryManageAddComponent;
  let fixture: ComponentFixture<CategoryManageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      declarations: [CategoryManageAddComponent]
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
