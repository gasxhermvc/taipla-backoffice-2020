import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageListComponent } from './restaurant-menu-manage-list.component';

describe('RestaurantMenuManageListComponent', () => {
  let component: RestaurantMenuManageListComponent;
  let fixture: ComponentFixture<RestaurantMenuManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
