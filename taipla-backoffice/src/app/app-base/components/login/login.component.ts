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
      errorMessages: {
        required: 'กรุณาป้อนรหัสผ่าน',
        min: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
        max: 'กรุณาป้อนไม่เกิน 20 ตัวอักษร',
      }
    },
    {
      key: 'remember',
      label: 'จดจำรหัสผ่าน',
      inline: true,
      type: ControlType.checkbox
    }
  ]

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.isValid()) {
      console.log('ok');
    }
  }
}
