import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageEditMediaComponent } from './restaurant-menu-manage-edit-media.component';

describe('RestaurantMenuManageEditMediaComponent', () => {
  let component: RestaurantMenuManageEditMediaComponent;
  let fixture: ComponentFixture<RestaurantMenuManageEditMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageEditMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageEditMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
