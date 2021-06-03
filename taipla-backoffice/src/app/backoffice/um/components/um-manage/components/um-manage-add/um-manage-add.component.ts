import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { UmService } from '@app/backoffice/services/um.service';
import { RoleEnum } from '@app/based/enums/RoleEnum';

@Component({
  selector: 'app-um-manage-add',
  templateUrl: './um-manage-add.component.html',
  styleUrls: ['./um-manage-add.component.scss']
})
export class UmManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  @Output() duplicate = new EventEmitter<any>();

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
      this.showLoading();
      this.initConfig();
      setTimeout(() => {
        this.prepareData();
        this.hideLoading();
      }, 1000);
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
        regex: /^([a-zA-Z0-9 _-|\.]+)$/,
        errorMessages: {
          required: 'กรอกชื่อผู้ใช้งาน',
          minLength: 'กรอกข้อมูลชื่อผู้ใช้งานอย่างน้อย 4 ตัวอักษร',
          maxLength: 'กรอกข้อมูลชื่อผู้ใช้งานไม่เกิน 20 ตัวอักษร',
          regex: 'กรอกเป็นภาษาอังกฤษ หรือตัวเลข และจุดเท่านั้น'
        },
        min: 4,
        max: 20
      },
      {
        key: 'PASSWORD',
        label: 'รหัสผ่าน',
        type: ControlType.password,
        required: true,
        placeholder: "รหัสผ่าน",
        errorMessages: {
          required: 'กรอกรหัสผ่าน',
          minLength: 'กรอกข้อมูลรหัสผ่านอย่างน้อย 6 ตัวอักษร',
          maxLength: 'กรอกข้อมูลรหัสผ่านไม่เกิน 20 ตัวอักษร'
        },
        min: 6,
        max: 20
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
          required: 'เลือกสถานะ'
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
          switch (result.statusCode) {
            case 200:
              this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT_DUPLICATE);
              this.duplicate.emit();
              break;
            case 201:
              ['OWNERS', 'STAFF'].forEach(async (lut: string) => {
                await this.backoffice.reloadLookup(lut);
              });
              this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT);
              this.complete.emit();
              this.onBack();
              break;
            default:
              this.error.emit();
              break;
          }
        } else {
          this.app.showError(result.message || this.app.message.ERROR.INSERT);
          this.error.emit();
        }
      } else {
        this.app.showError(this.app.message.ERROR.INSERT);
        this.error.emit();
      }
    } else {
      this.app.showError(this.app.message.ERROR.INVALID);
      this.error.emit();
    }

    this.hideLoading();
  }

  onClear() {
    if (this.form) {
      this.form.initFormGroup();
      this.prepareData();
    }
  }

  onBack() {
    this.back.emit();
  }

  prepareData() {
    if (this.app.user.ROLE == RoleEnum.OWNER) {
      this.form.setFormData({
        ROLE: 'staff'
      });
    }
  }

}
