import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuManageComponent } from './restaurant-menu-manage.component';

describe('RestaurantMenuManageComponent', () => {
  let component: RestaurantMenuManageComponent;
  let fixture: ComponentFixture<RestaurantMenuManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantMenuManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
