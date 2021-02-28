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
        placeholder: "ชื่อจริง",
        errorMessages: {
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
        placeholder: "นามสกุล",
        errorMessages: {
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร'
        },
        min: 3,
        max: 150
      },
      {
        key: 'PHONE',
        label: 'เบอร์โทรศัพท์',
        type: ControlType.phone,
        placeholder: "เบอร์โทรศัพท์",
        required: true,
        errorMessages: {
          required: 'กรุณาป้อนเบอร์โทรศัพท์',
          phone: this.app.message.INPUT.VALIDATOR.PHONE,
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
        placeholder: "Email address",
        required: true,
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
        placeholder: "ชื่อผู้ใช้งานระบบ",
        required: true,
        regex: /[A-Za-z0-9]$/gi,
        errorMessages: {
          required: 'กรุณาป้อนชื่อผู้ใช้งาน',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 100 ตัวอักษร',
          regex: 'กรุณาป้อนเป็นภาษาอังกฤษ และตัวเลขเท่านั้น'
        },
        min: 3,
        max: 100
      },
      {
        key: 'PASSWORD',
        label: 'รหัสผ่าน',
        type: ControlType.password,
        required: true,
        placeholder: "รหัสผ่าน",
        errorMessages: {
          required: 'กรุณาป้อนรหัสผ่าน',
          minLength: 'กรุณาป้อนอย่างน้อย 6 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 100 ตัวอักษร'
        },
        min: 6,
        max: 100
      },
      {
        key: 'UPLOAD',
        label: 'อัพโหลดรูปภาพประจำตัว',
        placeholder: 'เลือกรูปภาพประจำตัว',
        type: ControlType.upload,
        multiple: false,
        allowFileType: 'image/jpeg,image/jpg,image/png',
        size: 10485760,
        preview: false,
        listType: "picture-card",
        errorMessages: {
          uploadFormat: 'รองรับเฉพาะ JPG, JPEG และ PNG',
          uploadSize: 'รองรับขนาดไฟล์ไม่เกิน 10 MB'
        }
      },
      {
        key: 'ROLE',
        label: 'สถานะ',
        placeholder: "เลือกสถานะผู้ใช้งาน",
        required: true,
        type: ControlType.select,
        lookup: this.backoffice.getLookup('ROLES'),
        errorMessages: {
          required: 'กรุณาเลือกสถานะ'
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
