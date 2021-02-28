import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CultureService } from '@backoffice/services/culture.service';

@Component({
  selector: 'app-culture-manage-add',
  templateUrl: './culture-manage-add.component.html',
  styleUrls: ['./culture-manage-add.component.scss']
})
export class CultureManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CultureService {
    return this.store['culture'];
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
    this.formConfig = this.formConfig = [
      {
        key: 'COUNTRY_ID',
        label: 'ประเทศของอาหาร',
        type: ControlType.select,
        placeholder: 'เลือกประเทศของอาหาร',
        lookupKey: 'CODE',
        lookupLabel: 'VALUE_TH',
        lookup: this.backoffice.getLookup('COUNTRIES'),
        errorMessages: {
          required: 'กรุณาเลือกประเทศของอาหาร'
        }
      },
      {
        key: 'NAME_TH',
        label: 'ชื่อวัฒนธรรมอาหาร (ภาษาไทย)',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อวัฒนธรรมอาหาร (ภาษาไทย)',
        errorMessages: {
          required: 'กรุณาป้อนชื่อวัฒนธรรมอาหาร'
        }
      },
      {
        key: 'NAME_EN',
        label: 'ชื่อวัฒนธรรมอาหาร (ภาษาอังกฤษ)',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อวัฒนธรรมอาหาร (ภาษาอังกฤษ)',
        regex: /^([a-zA-Z0-9 _-]+)$/,
        errorMessages: {
          regex: 'กรุณาป้อนเป็นภาษาอังกฤษ และตัวเลขเท่านั้น'
        }
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
      const result = await this.service.addCulture(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT)
          this.backoffice.reloadLookup(['COUNTRIES', 'CULTURES']);
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
