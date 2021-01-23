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
        key: 'FIRST_NAME',
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
        key: 'LAST_NAME',
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
        key: 'PHONE',
        label: 'เบอร์โทรศัพท์',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนชื่อผู้ใช้งาน',
          minLength: 'กรุณาป้อนอย่างน้อย 10 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 15 ตัวอักษร',
        },
        min: 10,
        max: 15
      },
      {
        key: 'EMAIL',
        label: 'อีเมล์',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนอีเมล์',
          email: 'กรุณาป้อนรูปแบบ Email เท่านั้น',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
        },
        min: 3,
        max: 150
      },
      {
        key: 'USERNAME',
        label: 'ชื่อผู้ใช้งาน',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนชื่อผู้ใช้งาน',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 100 ตัวอักษร',
        },
        min: 3,
        max: 100
      },
      {
        key: 'PASSWORD',
        label: 'รหัสผ่าน',
        type: ControlType.password,
        errorMessages: {
          required: 'กรุณาป้อนรหัสผ่าน',
          minLength: 'กรุณาป้อนอย่างน้อย 6 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 100 ตัวอักษร'
        },
        min: 6,
        max: 100
      },
      {
        key: 'ROLE',
        label: 'สถานะ',
        placeholder: "เลือกสถานะผู้ใช้งาน",
        type: ControlType.select,
        lookup: this.backoffice.getLookup('ROLES'),
        errorMessages: {
          required: 'กรุณาป้อนรหัสผ่าน'
        }
      }
    ]
  }

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      const result = await this.service.addUser(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT);
          this.onBack();
          this.complete.emit();
        } else {
          this.app.showError(result.message || this.app.message.ERROR.INSERT);
        }
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
