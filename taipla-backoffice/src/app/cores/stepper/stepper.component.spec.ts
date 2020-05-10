//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { StepperComponent } from '@cores/stepper/stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [StepperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
