import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageEditPromotionComponent } from '@backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-promotion/restaurant-manage-edit-promotion.component';

describe('RestaurantManageEditPromotionComponent', () => {
  let component: RestaurantManageEditPromotionComponent;
  let fixture: ComponentFixture<RestaurantManageEditPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantManageEditPromotionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageEditPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
