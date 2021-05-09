import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageEditLegendComponent } from './restaurant-menu-manage-edit-legend.component';

describe('RestaurantMenuManageEditLegendComponent', () => {
  let component: RestaurantMenuManageEditLegendComponent;
  let fixture: ComponentFixture<RestaurantMenuManageEditLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageEditLegendComponent ]
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
