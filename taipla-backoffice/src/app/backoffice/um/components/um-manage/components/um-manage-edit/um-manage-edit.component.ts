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
    setTimeout(() => {
      this.initConfig();
      this.retrieveData();
    }, 0);
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'user_id',
        invisible: true
      },
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

  private async retrieveData() {
    this.showLoading();
    const result = await this.service.getUser({});

    if (result) {
      this.service.UM_INFO.DATA = { ...result };
      if (this.form) {
        this.form.setFormData(this.service.UM_INFO.DATA);
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
      const data = this.form.getFormData();
      const result = await this.service.editUser(data);
      if (result) {
        this.app.showSuccess(this.app.message.SUCCESS.UPDATE);
        this.onBack();
        this.complete.emit();
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
      if (this.service.UM_INFO.DATA) {
        this.form.setFormData(this.service.UM_INFO.DATA);
      }
    }
  }

  onBack() {
    this.back.emit();
  }
}
