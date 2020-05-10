//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { RestaurantComponent } from '@backoffice/restaurant/restaurant.component';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [RestaurantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
