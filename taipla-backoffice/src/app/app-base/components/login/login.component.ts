import { Component, OnInit, ViewChild } from '@angular/core';
import { FormConfig, ControlType } from '@app/based/interfaces/FormConfig';
import { Router } from '@angular/router';
import { FormComponent } from '@cores/form/form.component';
import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';
import { LocalStorageService } from '@based/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(FormComponent) form?: FormComponent;

  //example : https://p.w3layouts.com/demos_new/10-03-2017/techno_login_form-demo_Free/12325293/web/index.html
  formConfigs: FormConfig[] = [
    {
      key: 'USERNAME',
      label: 'ชื่อผู้ใช้งาน',
      type: ControlType.text,
      min: 4,
      max: 150,
      placeholder: 'Username',
      errorMessages: {
        required: 'กรุณาป้อนรหัสชื่อผู้ใช้งาน',
        // email: 'รองรับเฉพาะรูปแบบ Email เท่านั้น',
        minLength: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
      }
    },
    {
      key: 'PASSWORD',
      label: 'รหัสผ่าน',
      type: ControlType.password,
      min: 4,
      max: 20,
      placeholder: 'Password',
      autocomplete: false,
      errorMessages: {
        required: 'กรุณาป้อนรหัสผ่าน',
        minLength: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        maxLength: 'กรุณาป้อนไม่เกิน 20 ตัวอักษร',
      }
    },
    {
      key: 'REMEMBER_ME',
      label: 'Remember me',
      inline: true,
      type: ControlType.checkbox
    }
  ]

  constructor(private router: Router,
    public app: AppService,
    private auth: AuthService,
    private local: LocalStorageService) {
    (window as any).login = this;

    this.doLogin();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.app.hideLoading();

      this.form.setFormData({

      })
    }, this.app.randomNumber(700, 1200));
  }

  async onSubmit() {
    if (this.form.isValid(false)) {
      this.app.showLoading();
      try {
        const data = this.form.getFormData();
        const response: any = await this.auth.login(data).toPromise();

        if (response && response.success) {
          const redirect = this.redirect();
          this.router.navigate([redirect]).then((complete) => {
            this.auth.redirectUrl = undefined;
          });
          this.app.showSuccess(this.app.message.SUCCESS.LOGIN);
        } else {
          this.app.showError((response.message ?
            response.message : this.app.message.ERROR.DEFAULT));
        }
      } catch (exception) {
        this.app.showError(this.app.message.ERROR.DEFAULT);
      }
      this.app.hideLoading();
    } else {
      this.app.showError(this.app.message.ERROR.LOGIN_INVALID);
    }
  }

  private doLogin() {
    //=>get pathname
    const pathname = window.location.pathname;
    //=>get jwt
    const jwt = this.local.exsit('jwt') ? this.local.get('jwt') : undefined;

    //=>verify
    if (jwt && jwt.authenticated && pathname.includes(this.app.env.auth.redirects.login)) {
      this.router.navigate([this.app.env.auth.redirects.intent]);
    }
  }

  private redirect() {
    let redirect = '';
    switch (this.auth.redirectUrl) {
      case undefined:
      case '':
      case null:
        redirect = this.app.env.auth.redirects.intent;
        break;
      default:
        redirect = this.auth.redirectUrl;
        break;
    }
    return redirect;
  }
}
