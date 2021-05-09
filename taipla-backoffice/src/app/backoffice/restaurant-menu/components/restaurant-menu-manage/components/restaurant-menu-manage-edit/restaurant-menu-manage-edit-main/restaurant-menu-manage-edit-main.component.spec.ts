import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageEditMainComponent } from './restaurant-menu-manage-edit-main.component';

describe('RestaurantMenuManageEditMainComponent', () => {
  let component: RestaurantMenuManageEditMainComponent;
  let fixture: ComponentFixture<RestaurantMenuManageEditMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageEditMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
