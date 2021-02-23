import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageEditComponent } from './food-center-manage-edit.component';

describe('FoodCenterManageEditComponent', () => {
  let component: FoodCenterManageEditComponent;
  let fixture: ComponentFixture<FoodCenterManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
