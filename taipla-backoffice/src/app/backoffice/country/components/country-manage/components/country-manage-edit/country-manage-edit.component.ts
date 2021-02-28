import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CountryService } from '@backoffice/services/country.service';

@Component({
  selector: 'app-country-manage-edit',
  templateUrl: './country-manage-edit.component.html',
  styleUrls: ['./country-manage-edit.component.scss']
})
export class CountryManageEditComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CountryService {
    return this.store['country'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cme = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.COUNTRY_INFO) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
      }, 0);
    }
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'COUNTRY_ID',
        invisible: true
      },
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
        regex: /[A-Za-z0-9\ ]$/gi,
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

        size: 10485760,
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

    const result = await this.service.getCountry({
      COUNTRY_ID: this.service.COUNTRY_INFO.DATA.COUNTRY_ID
    });

    if (result) {
      if (result.success) {
        this.service.COUNTRY_INFO.DATA = { ...result.data };
        if (this.form) {
          this.form.setFormData(this.service.COUNTRY_INFO.DATA);

          //=>Bind image url
          if (this.service.COUNTRY_INFO.DATA.UPLOAD_FILES && this.service.COUNTRY_INFO.DATA.UPLOAD_FILES.length > 0) {
            const config = this.formConfig.find((config) => config.key === 'UPLOAD');
            config.fileList = this.service.COUNTRY_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.service.COUNTRY_INFO.DATA.UPLOAD_FILES[0].url;
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
      const result = await this.service.editCountry(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(this.app.message.SUCCESS.UPDATE);
          this.backoffice.reloadLookup(['COUNTRIES']);
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
      if (this.service.COUNTRY_INFO.DATA) {
        this.form.setFormData(this.service.COUNTRY_INFO.DATA);
      }
    }
  }

  onBack() {
    this.back.emit();
  }

}
