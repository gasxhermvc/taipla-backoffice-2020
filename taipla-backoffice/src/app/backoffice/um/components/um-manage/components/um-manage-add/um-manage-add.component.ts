import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { UmService } from '@app/backoffice/services/um.service';

@Component({
  selector: 'app-um-manage-add',
  templateUrl: './um-manage-add.component.html',
  styleUrls: ['./um-manage-add.component.scss']
})
export class UmManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): UmService {
    return this.store['um'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).uma = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initConfig();
    }, 0);
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'first_name',
        label: 'ชื่อจริง',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนชื่อจริง',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร'
        },
        min: 3,
        max: 150
      },
      {
        key: 'last_name',
        label: 'นามสกุล',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนนามสกุลจริง',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร'
        },
        min: 3,
        max: 150
      },
      {
        key: 'username',
        label: 'ชื่อผู้ใช้งาน',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนชื่อผู้ใช้งาน',
          email: 'กรุณาป้อนรูปแบบ Email เท่านั้น',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
        },
        min: 3,
        max: 150
      },
      {
        key: 'password',
        label: 'รหัสผ่าน',
        type: ControlType.password,
        errorMessages: {
          required: 'กรุณาป้อนรหัสผ่าน',
          minLength: 'กรุณาป้อนอย่างน้อย 6 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร'
        },
        min: 6,
        max: 150
      }
    ]
  }

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      const data = this.form.getFormData();
      const result = await this.service.addUser(data);
      if (result) {
        this.app.showSuccess(this.app.message.SUCCESS.INSERT);
        this.onBack();
        this.complete.emit();
      } else {
        this.app.showError(this.app.message.ERROR.INSERT);
      }
    } else {
      this.app.showError(this.app.message.ERROR.INVALID);
    }

    this.hideLoading();
  }

  onClear() {
    if (this.form) {
      this.form.initFormGroup();
    }
  }

  onBack() {
    this.back.emit();
  }

}
