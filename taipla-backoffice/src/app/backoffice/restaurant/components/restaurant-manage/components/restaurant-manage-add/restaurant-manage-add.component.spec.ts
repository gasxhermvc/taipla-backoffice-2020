import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageAddComponent } from '@backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-add/restaurant-manage-add.component';

describe('RestaurantManageAddComponent', () => {
  let component: RestaurantManageAddComponent;
  let fixture: ComponentFixture<RestaurantManageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantManageAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
