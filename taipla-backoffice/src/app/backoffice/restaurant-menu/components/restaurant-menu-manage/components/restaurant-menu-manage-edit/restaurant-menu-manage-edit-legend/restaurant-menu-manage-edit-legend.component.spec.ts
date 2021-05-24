import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageEditLegendComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-edit/restaurant-menu-manage-edit-legend/restaurant-menu-manage-edit-legend.component';

describe('RestaurantMenuManageEditLegendComponent', () => {
  let component: RestaurantMenuManageEditLegendComponent;
  let fixture: ComponentFixture<RestaurantMenuManageEditLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantMenuManageEditLegendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageEditLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
