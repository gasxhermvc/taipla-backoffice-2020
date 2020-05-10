//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { ControlComponent } from '@cores/control/control.component';
import { DatetimeService } from '@based/services/datetime.service';

describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        ControlComponent
      ],
      providers: [
        DatetimeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
