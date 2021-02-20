import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CountryService } from '@backoffice/services/country.service';

@Component({
  selector: 'app-country-manage-add',
  templateUrl: './country-manage-add.component.html',
  styleUrls: ['./country-manage-add.component.scss']
})
export class CountryManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CountryService {
    return this.store['country'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cma = this;
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
        key: 'NAME_TH',
        label: 'ชื่อประเทศอาหาร (ภาษาไทย)',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อประเทศอาหาร (ภาษาไทย)',
        errorMessages: {
          required: 'กรุณาป้อนชื่อประเทศอาหาร'
        }
      },
      {
        key: 'NAME_EN',
        label: 'ชื่อประเทศอาหาร (ภาษาอังกฤษ)',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อประเทศอาหาร (ภาษาอังกฤษ)',
        regex: /[A-Za-z0-9]$/gi
      },
      {
        key: 'DESCRIPTION',
        label: 'คำอธิบาย',
        type: ControlType.textarea,
        placeholder: 'ป้อนคำอธิบาย',
        errorMessages: {
          required: 'กรุณาป้อนคำอธิบาย'
        }
      },
      {
        key: 'UPLOAD',
        label: 'รูปภาพประจำตัวประเทศอาหาร',
        type: ControlType.upload,
        placeholder: 'เลือกรูปภาพประจำตัว',
        allowFileType: 'image/jpeg,image/jpg,/image/png',
        multiple: false,
        size: 10485760,
        preview: false,
        listType: 'picture-card',
        errorMessages: {
          uploadFormat: 'รองรับเฉพาะ JPG, JPEG และ PNG',
          uploadSize: 'รองรับขนาดไฟล์ไม่เกิน 10 MB'
        }
      }
    ]
  }

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      const result = await this.service.addCountry(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT)
          this.onBack();
          this.complete.emit();
        } else {
          this.app.showError(result.message || this.app.message.ERROR.INSERT)
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
