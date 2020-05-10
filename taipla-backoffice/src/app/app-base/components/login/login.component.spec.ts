//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

//=>App
import { ShareModule } from '@cores/share.module';
import { LoginComponent } from '@app-base/components/login/login.component';
import { AuthService } from '@app/based/services/auth.service';
import { moduleConfig } from '@based/configs/test-config';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...moduleConfig,
        ShareModule
      ],
      providers: [
        AuthService
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form component', () => {
    const appForm = debugElement.query(By.css('app-form'));
    fixture.detectChanges();
    expect(appForm).toBeTruthy();
  });

  it('should form display properly', () => {
    const inputs = debugElement.queryAll(By.css('.input'));
    fixture.detectChanges();
    expect(component.formConfigs.length).toBe(inputs.length);
  });

  it('should form is valid', () => {
    const data: any = {
      username: 'test@mail.com',
      password: '1234',
      remember_me: true
    };

    component.form.setFormData(data);
    fixture.detectChanges();

    expect(component.form.isValid(false)).toBe(true);
  });

  it('should form is invalid', () => {
    const data: any = {
      username: 'test@mail.com',
      password: '',
      remember_me: true
    };

    component.form.setFormData(data);
    fixture.detectChanges();

    expect(component.form.isValid(false)).toEqual(false);
  });

  it('should form check validate', () => {
    //=>Username
    const userInput: any = [
      { data: '', result: false },
      { data: 'admin', result: false },
      { data: 'test@mail.com', result: true },
      { data: 'test@mail', result: true }
    ];

    userInput.map((input: any) => {
      const formControl = component.form.getControl('username');
      formControl.control.setValue(input.data);
      fixture.detectChanges();
      expect(formControl.control.valid).toBe(input.result);
    });

    fixture.detectChanges();
    const passwordInput: any = [
      { data: '', result: false },
      { data: '123', result: false },
      { data: '1234', result: true }
    ];

    passwordInput.map((input: any) => {
      const formControl = component.form.getControl('password');
      formControl.control.setValue(input.data);
      fixture.detectChanges();
      expect(formControl.control.valid).toBe(input.result);
    });
  });
});
