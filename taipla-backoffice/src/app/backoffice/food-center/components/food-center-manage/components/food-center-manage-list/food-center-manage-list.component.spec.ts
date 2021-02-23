import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageListComponent } from './food-center-manage-list.component';

describe('FoodCenterManageListComponent', () => {
  let component: FoodCenterManageListComponent;
  let fixture: ComponentFixture<FoodCenterManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
