import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageEditLegendComponent } from './food-center-manage-edit-legend.component';

describe('FoodCenterManageEditLegendComponent', () => {
  let component: FoodCenterManageEditLegendComponent;
  let fixture: ComponentFixture<FoodCenterManageEditLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageEditLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageEditLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
