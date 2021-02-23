import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageAddComponent } from './food-center-manage-add.component';

describe('FoodCenterManageAddComponent', () => {
  let component: FoodCenterManageAddComponent;
  let fixture: ComponentFixture<FoodCenterManageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
