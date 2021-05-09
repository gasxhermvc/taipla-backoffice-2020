import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageEditComponent } from './restaurant-menu-manage-edit.component';

describe('RestaurantMenuManageEditComponent', () => {
  let component: RestaurantMenuManageEditComponent;
  let fixture: ComponentFixture<RestaurantMenuManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
