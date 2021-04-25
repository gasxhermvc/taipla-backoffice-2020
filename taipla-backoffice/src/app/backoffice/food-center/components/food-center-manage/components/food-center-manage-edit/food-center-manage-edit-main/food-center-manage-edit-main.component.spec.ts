import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageEditMainComponent } from './food-center-manage-edit-main.component';

describe('FoodCenterManageEditMainComponent', () => {
  let component: FoodCenterManageEditMainComponent;
  let fixture: ComponentFixture<FoodCenterManageEditMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageEditMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
