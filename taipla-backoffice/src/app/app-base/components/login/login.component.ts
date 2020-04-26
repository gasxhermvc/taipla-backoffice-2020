import { Component, OnInit, ViewChild } from '@angular/core';
import { FormConfig, ControlType } from '@app/based/interfaces/FormConfig';
import { Router } from '@angular/router';
import { FormComponent } from '@cores/form/form.component';
import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(FormComponent, { static: false }) form?: FormComponent;

  //example : https://p.w3layouts.com/demos_new/10-03-2017/techno_login_form-demo_Free/12325293/web/index.html
  formConfigs: FormConfig[] = [
    {
      key: 'username',
      label: 'ชื่อผู้ใช้งาน',
      type: ControlType.text,
      min: 4,
      max: 150,
      placeholder: 'Username',
      errorMessages: {
        required: 'กรุณาป้อนรหัสชื่อผู้ใช้งาน',
        email: 'รองรับเฉพาะรูปแบบ Email เท่านั้น',
        min: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        max: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
      }
    },
    {
      key: 'password',
      label: 'รหัสผ่าน',
      type: ControlType.password,
      min: 4,
      max: 20,
      placeholder: 'Password',
      autocomplete: false,
      errorMessages: {
        required: 'กรุณาป้อนรหัสผ่าน',
        min: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        max: 'กรุณาป้อนไม่เกิน 20 ตัวอักษร',
      }
    },
    {
      key: 'remember',
      label: 'Remember me',
      inline: true,
      type: ControlType.checkbox
    }
  ]

  constructor(private router: Router, public app: AppService, private auth: AuthService) {
    (window as any).login = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.app.hideLoading();
  }

  async onSubmit() {
    if (this.form.isValid(false)) {
      this.app.showLoading();

      const data = this.form.getFormData();
      const response: any = await this.auth.login(data);

      if (response) {
        this.router.navigate([this.app.env.auth.redirects.intent]);
      } else {
        this.app.showError(response.message);
      }

      this.app.hideLoading();
    } else {
      this.app.showError(this.app.message.ERROR.LOGIN_INVALID);
    }

  }
}
