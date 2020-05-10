//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { UmComponent } from '@backoffice/um/um.component';

describe('UmComponent', () => {
  let component: UmComponent;
  let fixture: ComponentFixture<UmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [UmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
