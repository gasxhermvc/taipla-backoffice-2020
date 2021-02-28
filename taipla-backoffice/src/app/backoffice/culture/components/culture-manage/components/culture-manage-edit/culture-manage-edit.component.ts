import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CultureService } from '@backoffice/services/culture.service';

@Component({
  selector: 'app-culture-manage-edit',
  templateUrl: './culture-manage-edit.component.html',
  styleUrls: ['./culture-manage-edit.component.scss']
})
export class CultureManageEditComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CultureService {
    return this.store['culture'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cme = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.CULTURE_INFO) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
      }, 0);
    }
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'CULTURE_ID',
        invisible: true
      },
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

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.getCulture({
      COUNTRY_ID: this.service.CULTURE_INFO.DATA.COUNTRY_ID,
      CULTURE_ID: this.service.CULTURE_INFO.DATA.CULTURE_ID
    });

    if (result) {
      if (result.success) {
        this.service.CULTURE_INFO.DATA = { ...result.data };
        if (this.form) {
          this.form.setFormData(this.service.CULTURE_INFO.DATA);

          //=>Bind image url
          if (this.service.CULTURE_INFO.DATA.UPLOAD_FILES && this.service.CULTURE_INFO.DATA.UPLOAD_FILES.length > 0) {
            const config = this.formConfig.find((config) => config.key === 'UPLOAD');
            config.fileList = this.service.CULTURE_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.service.CULTURE_INFO.DATA.UPLOAD_FILES[0].url;
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
      const result = await this.service.editCulture(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(this.app.message.SUCCESS.UPDATE);
          this.backoffice.reloadLookup(['COUNTRIES', 'CULTURES']);
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
      if (this.service.CULTURE_INFO.DATA) {
        this.form.setFormData(this.service.CULTURE_INFO.DATA);
      }
    }
  }

  onBack() {
    this.back.emit();
  }

}
