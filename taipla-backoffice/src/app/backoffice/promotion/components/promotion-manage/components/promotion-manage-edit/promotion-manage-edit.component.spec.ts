import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionManageEditComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-edit/promotion-manage-edit.component';

describe('PromotionManageEditComponent', () => {
  let component: PromotionManageEditComponent;
  let fixture: ComponentFixture<PromotionManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionManageEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
