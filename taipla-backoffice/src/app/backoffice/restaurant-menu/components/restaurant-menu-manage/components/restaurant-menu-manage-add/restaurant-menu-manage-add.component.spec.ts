import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageAddComponent } from './restaurant-menu-manage-add.component';

describe('RestaurantMenuManageAddComponent', () => {
  let component: RestaurantMenuManageAddComponent;
  let fixture: ComponentFixture<RestaurantMenuManageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
