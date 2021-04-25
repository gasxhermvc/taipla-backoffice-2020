import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageEditMediaComponent } from './restaurant-manage-edit-media.component';

describe('RestaurantManageEditMediaComponent', () => {
  let component: RestaurantManageEditMediaComponent;
  let fixture: ComponentFixture<RestaurantManageEditMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantManageEditMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageEditMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
