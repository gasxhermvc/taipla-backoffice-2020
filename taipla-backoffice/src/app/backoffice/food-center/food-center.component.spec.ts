//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { FoodCenterComponent } from '@backoffice/food-center/food-center.component';

describe('FoodCenterComponent', () => {
  let component: FoodCenterComponent;
  let fixture: ComponentFixture<FoodCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [FoodCenterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
