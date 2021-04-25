import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageEditLegendComponent } from '@backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-legend/restaurant-manage-edit-legend.component';

describe('RestaurantManageEditLegendComponent', () => {
  let component: RestaurantManageEditLegendComponent;
  let fixture: ComponentFixture<RestaurantManageEditLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantManageEditLegendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageEditLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
