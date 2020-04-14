import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@app/based/interfaces/FormConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseClass implements OnInit {

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
        minlength: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        maxlength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
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
        minlength: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        maxlength: 'กรุณาป้อนไม่เกิน 20 ตัวอักษร',
      }
    },
    {
      key: 'remember',
      label: 'Remember me',
      inline: true,
      reverse: true,
      type: ControlType.checkbox
    }
  ]

  constructor(injector: Injector) {
    super(injector);
    (window as any).login = this;
  }

  ngOnInit() {
  }

  onSubmit() {
    const data = this.form.getFormData();
    console.log(data);
    if (this.form.isValid()) {
      console.log('ok');
    }
  }
}
