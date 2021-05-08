import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageEditMenuComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-menu/restaurant-manage-edit-menu.component';

describe('RestaurantManageEditMenuComponent', () => {
  let component: RestaurantManageEditMenuComponent;
  let fixture: ComponentFixture<RestaurantManageEditMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantManageEditMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
