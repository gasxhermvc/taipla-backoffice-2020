//=>Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { CultureComponent } from '@app/backoffice/culture/culture.component';

describe('CultureComponent', () => {
  let component: CultureComponent;
  let fixture: ComponentFixture<CultureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [CultureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
