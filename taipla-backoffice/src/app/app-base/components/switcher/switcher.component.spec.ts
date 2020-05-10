//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=App
import { moduleConfig } from '@based/configs/test-config';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';

describe('SwitcherComponent', () => {
  let component: SwitcherComponent;
  let fixture: ComponentFixture<SwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
      declarations: [SwitcherComponent],
      providers: [
        AppService,
        AuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
