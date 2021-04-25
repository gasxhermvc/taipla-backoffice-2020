import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageEditMediaComponent } from './food-center-manage-edit-media.component';

describe('FoodCenterManageEditMediaComponent', () => {
  let component: FoodCenterManageEditMediaComponent;
  let fixture: ComponentFixture<FoodCenterManageEditMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageEditMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageEditMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
