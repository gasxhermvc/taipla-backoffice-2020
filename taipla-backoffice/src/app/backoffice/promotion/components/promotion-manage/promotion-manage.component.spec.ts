import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionManageComponent } from '@backoffice/promotion/components/promotion-manage/promotion-manage.component';

describe('PromotionManageComponent', () => {
  let component: PromotionManageComponent;
  let fixture: ComponentFixture<PromotionManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionManageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
