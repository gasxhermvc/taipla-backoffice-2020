import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageListComponent } from '@backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-list/restaurant-manage-list.component';

describe('RestaurantManageListComponent', () => {
  let component: RestaurantManageListComponent;
  let fixture: ComponentFixture<RestaurantManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantManageListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
