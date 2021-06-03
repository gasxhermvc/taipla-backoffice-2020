import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionManageAddComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-add/promotion-manage-add.component';

describe('PromotionManageAddComponent', () => {
  let component: PromotionManageAddComponent;
  let fixture: ComponentFixture<PromotionManageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionManageAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
