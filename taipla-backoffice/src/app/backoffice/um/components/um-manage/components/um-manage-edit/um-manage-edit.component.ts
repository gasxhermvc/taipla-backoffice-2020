import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { UmService } from '@backoffice/services/um.service';

@Component({
  selector: 'app-um-manage-edit',
  templateUrl: './um-manage-edit.component.html',
  styleUrls: ['./um-manage-edit.component.scss']
})
export class UmManageEditComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): UmService {
    return this.store['um'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).ume = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.UM_INFO) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
      }, 0);
    }
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'USER_ID',
        invisible: true
      },
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
        key: 'ROLE',
        label: 'สถานะ',
        placeholder: "เลือกสถานะผู้ใช้งาน",
        type: ControlType.select,
        lookup: [
          {
            "CODE": "admin",
            "DESCR": "admin"
          },
          {
            "CODE": "owner",
            "DESCR": "owner"
          },
          {
            "CODE": "staff",
            "DESCR": "staff"
          },
          {
            "CODE": "client",
            "DESCR": "client"
          }
        ],
        errorMessages: {
          required: 'กรุณาป้อนรหัสผ่าน'
        }
      }
    ]
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.getUser({
      USER_ID: this.service.UM_INFO.DATA.USER_ID
    });

    if (result) {
      if (result.success) {
        this.service.UM_INFO.DATA = { ...result.data };
        if (this.form) {
          this.form.setFormData(this.service.UM_INFO.DATA);
        }
      } else {
        this.app.showError(this.app.message.ERROR.Default);
      }
    } else {
      this.onBack();
      this.app.showError(this.app.message.ERROR.NOT_FOUND_DATA);
    }

    this.hideLoading();
  }

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      const result = await this.service.editUser(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(this.app.message.SUCCESS.UPDATE);
          this.retrieveData();
        } else {
          this.app.showError(this.app.message.ERROR.UPDATE);
        }
      } else {
        this.app.showError(this.app.message.ERROR.UPDATE);
      }
    } else {
      this.app.showError(this.app.message.ERROR.INVALID);
    }

    this.hideLoading();
  }

  onClear() {
    if (this.form) {
      this.form.initFormGroup();
      if (this.service.UM_INFO && this.service.UM_INFO.DATA) {
        this.form.setFormData(this.service.UM_INFO.DATA);
      }
    }
  }

  onBack() {
    this.back.emit();
  }
}
