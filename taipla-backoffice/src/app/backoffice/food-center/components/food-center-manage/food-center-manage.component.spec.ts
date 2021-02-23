import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCenterManageComponent } from './food-center-manage.component';

describe('FoodCenterManageComponent', () => {
  let component: FoodCenterManageComponent;
  let fixture: ComponentFixture<FoodCenterManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCenterManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
