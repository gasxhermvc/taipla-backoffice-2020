import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FoodCenterService } from '@app/backoffice/services/food-center.service';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';

@Component({
  selector: 'app-food-center-manage-edit-media',
  templateUrl: './food-center-manage-edit-media.component.html',
  styleUrls: ['./food-center-manage-edit-media.component.scss']
})
export class FoodCenterManageEditMediaComponent extends BaseClass implements OnInit {
  formConfig: FormConfig[];

  @Output() complete = new EventEmitter<any>();

  get service(): FoodCenterService {
    return this.store['food_center'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).fcmem = this;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.service.FOOD_CENTER_INFO && !this.service.tabLoad.three) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
        this.service.tabLoad.three = true;
      }, 0);
    }
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'UPLOAD',
        label: 'รูปภาพประจำตัวอาหาร',
        type: ControlType.upload,
        placeholder: 'เลือกรูปภาพประจำตัว',
        allowFileType: 'image/jpeg,image/jpg,image/png',
        multiple: true,
        size: 10485760,
        preview: true,
        listType: 'picture-card',
        errorMessages: {
          uploadFormat: 'รองรับเฉพาะ JPG, JPEG และ PNG',
          uploadSize: 'รองรับขนาดไฟล์ไม่เกิน 20 MB'
        }
      }]
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.getFoodCenter({
      COUNTRY_ID: this.service.FOOD_CENTER_INFO.DATA.COUNTRY_ID,
      CULTURE_ID: this.service.FOOD_CENTER_INFO.DATA.CULTURE_ID,
      FOOD_ID: this.service.FOOD_CENTER_INFO.DATA.FOOD_ID
    });

    if (result) {
      if (result.success) {
        this.service.FOOD_CENTER_INFO.DATA = { ...result.data };
        if (this.form) {
          this.form.setFormData(this.service.FOOD_CENTER_INFO.DATA);

          //=>Bind image url
          if (this.service.FOOD_CENTER_INFO.DATA.UPLOAD_FILES && this.service.FOOD_CENTER_INFO.DATA.UPLOAD_FILES.length > 0) {
            const config = this.formConfig.find((config) => config.key === 'UPLOAD');
            config.fileList = this.service.FOOD_CENTER_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.service.FOOD_CENTER_INFO.DATA.UPLOAD_FILES[0].url;
            this.form.setConfig("UPLOAD", config);
          }

          //=>Bind legend
          const config = this.formConfig.find((config) => config.key === 'LEGEND');
          if (this.service.FOOD_CENTER_INFO.DATA.LEGENDS && this.service.FOOD_CENTER_INFO.DATA.LEGENDS.length > 0) {
            // config.legendValues =
          } else {
            //=>ยังไม่เคยมีการเพิ่มตำนาน
            // config.useDefault = true;
          }

          // config.legendValues = [[
          //   {
          //     key: 'ID',
          //     defaultValue: '1'
          //   },
          //   {
          //     key: 'LEGEND_TYPE',
          //     defaultValue: '1'
          //   }
          //   ,
          //   {
          //     key: 'DESCRIPTION',
          //     defaultValue: 'ABC'
          //   }
          //   ,
          //   {
          //     key: 'CODE',
          //     defaultValue: '1234567890'
          //   }
          //   ,
          //   {
          //     key: 'ID',
          //     defaultValue: '1'
          //   }
          // ]]

          // this.form.setConfig("LEGEND", config);
        }
      } else {
        this.app.showError(this.app.message.ERROR.DEFAULT);
      }

    } else {
      this.app.showError(this.app.message.ERROR.NOT_FOUND_DATA);
    }

    this.hideLoading();
  }

}
