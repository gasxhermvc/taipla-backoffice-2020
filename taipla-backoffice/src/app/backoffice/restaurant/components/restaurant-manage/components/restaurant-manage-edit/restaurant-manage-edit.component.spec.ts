import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageEditComponent } from '@backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit.component';

describe('RestaurantManageEditComponent', () => {
  let component: RestaurantManageEditComponent;
  let fixture: ComponentFixture<RestaurantManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantManageEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
