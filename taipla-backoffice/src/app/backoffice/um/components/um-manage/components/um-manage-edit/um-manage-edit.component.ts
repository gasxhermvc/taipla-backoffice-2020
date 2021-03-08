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
        placeholder: "ชื่อจริง",
        errorMessages: {
          minLength: 'กรอกข้อมูลชื่อจริงอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรอกข้อมูลชื่อจริงไม่เกิน 150 ตัวอักษร'
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
          minLength: 'กรอกข้อมูลนามสกุลอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรอกข้อมูลนามสกุลไม่เกิน 150 ตัวอักษร'
        },
        min: 3,
        max: 150
      },
      {
        key: 'PHONE',
        label: 'เบอร์มือถือ',
        type: ControlType.phone,
        placeholder: "เบอร์มือถือ",
        required: true,
        errorMessages: {
          required: 'กรอกข้อมูลเบอร์มือถือ 10 หลัก (0899999999)',
          phone: this.app.message.INPUT.VALIDATOR.PHONE,
          minLength: 'กรอกข้อมูลเบอร์มือถืออย่างน้อย 10 ตัวอักษร',
          maxLength: 'กรอกข้อมูลเบอร์มือถือไม่เกิน 15 ตัวอักษร',
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
          required: 'กรอกรูปแบบอีเมล์เท่านั้น',
          email: 'กรอกรูปแบบอีเมล์เท่านั้น',
          minLength: 'กรอกข้อมูลอีเมล์อย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรอกข้อมูลอีเมล์ไม่เกิน 150 ตัวอักษร',
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
        regex: /^([a-zA-Z0-9 _-]+)$/,
        disable: true,
        errorMessages: {
          required: 'กรอกชื่อผู้ใช้งาน',
          minLength: 'กรอกข้อมูลชื่อผู้ใช้งานอย่างน้อย 4 ตัวอักษร',
          maxLength: 'กรอกข้อมูลชื่อผู้ใช้งานไม่เกิน 20 ตัวอักษร',
          regex: 'กรอกเป็นภาษาอังกฤษ และตัวเลขเท่านั้น'
        },
        min: 4,
        max: 20
      },
      {
        key: 'UPLOAD',
        label: 'อัพโหลดรูปภาพประจำตัว',
        placeholder: 'เลือกรูปภาพประจำตัว',
        type: ControlType.upload,
        allowFileType: 'image/jpeg,image/jpg,image/png',
        size: 10485760,
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
        type: ControlType.select,
        required: true,
        lookup: this.backoffice.getLookup('ROLES'),
        errorMessages: {
          required: 'เลือกสถานะ'
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

          //=>Bind image url
          if (this.service.UM_INFO.DATA.UPLOAD_FILES && this.service.UM_INFO.DATA.UPLOAD_FILES.length > 0) {
            const config = this.formConfig.find((config) => config.key === 'UPLOAD');
            config.fileList = this.service.UM_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.service.UM_INFO.DATA.UPLOAD_FILES[0].url;
            this.form.setConfig("UPLOAD", config);
          }
        }
      } else {
        this.app.showError(this.app.message.ERROR.DEFAULT);
      }
    } else {
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
