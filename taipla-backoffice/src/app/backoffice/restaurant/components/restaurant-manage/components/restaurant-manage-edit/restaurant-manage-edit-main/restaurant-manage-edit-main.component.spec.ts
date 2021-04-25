import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageEditMainComponent } from './restaurant-manage-edit-main.component';

describe('RestaurantManageEditMainComponent', () => {
  let component: RestaurantManageEditMainComponent;
  let fixture: ComponentFixture<RestaurantManageEditMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantManageEditMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
