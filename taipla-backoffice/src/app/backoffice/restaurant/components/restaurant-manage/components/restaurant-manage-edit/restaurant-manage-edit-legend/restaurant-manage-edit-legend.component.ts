import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';

@Component({
  selector: 'app-restaurant-manage-edit-legend',
  templateUrl: './restaurant-manage-edit-legend.component.html',
  styleUrls: ['./restaurant-manage-edit-legend.component.scss']
})
export class RestaurantManageEditLegendComponent  extends BaseClass implements OnInit {
  formConfig: FormConfig[];

  
  @Output() complete = new EventEmitter<any>();

  get service(): RestaurantService {
    return this.store['restaurant'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).fce = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.RESTAURANT_INFO) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
      }, 0);
    }
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'FOOD_ID',
        invisible: true,
        required: true
      },
      {
        key: 'CODE',
        invisible: true,
        required: true
      },
      {
        key: 'COUNTRY_ID',
        label: 'ประเทศของอาหาร',
        type: ControlType.select,
        placeholder: 'เลือกประเทศของอาหาร',
        lookupKey: 'CODE',
        lookupLabel: 'VALUE_TH',
        lookup: this.backoffice.getLookup('COUNTRIES'),
        change: (evt: any) => {
          let related = 'CULTURE_ID'
          let config = this.formConfig.find((item: any) => item.key === related);
          if (config) {
            config.lookup = [].concat(...this.backoffice.getLookup('CULTURES')).filter((item: any) => item.COUNTRY_ID === evt);

            if (evt == undefined || evt == null || evt == 0 || evt == '') {
              config.disable = true;
            } else {
              config.disable = false;
            }
            this.form.setConfig(related, config);
          }
        },
        errorMessages: {
          required: 'กรุณาเลือกประเทศของอาหาร'
        }
      },
      {
        key: 'CULTURE_ID',
        label: 'วัฒนธรรมอาหาร',
        type: ControlType.select,
        placeholder: 'เลือกวัฒนธรรมของอาหาร',
        lookupKey: 'CODE',
        lookupLabel: 'VALUE_TH',
        lookup: this.backoffice.getLookup('CULTURES'),
        errorMessages: {
          required: 'กรุณาเลือกวัฒนธรรมของอาหาร'
        }
      },
      {
        key: 'NAME_TH',
        label: 'ชื่ออาหาร (ภาษาไทย)',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อวัฒนธรรมอาหาร (ภาษาไทย)',
        errorMessages: {
          required: 'กรุณาป้อนชื่อวัฒนธรรมอาหาร'
        }
      },
      {
        key: 'NAME_EN',
        label: 'ชื่ออาหาร (ภาษาอังกฤษ)',
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
        // errorMessages: {
        //   required: 'กรุณาป้อนคำอธิบาย'
        // }
      },
      {
        key: 'COOKING_FOOD',
        label: 'วิธีการปรุง',
        type: ControlType.textarea,
        placeholder: 'ป้อนวิธีการปรุง'
      },
      {
        key: 'INGREDIENT',
        label: 'วัตถุดิบ',
        type: ControlType.textarea,
        placeholder: 'ป้อนข้อมูลวัตถุดิบ'
      },
      {
        key: 'DIETETIC_FOOD',
        label: 'โภชนาการอาหาร',
        type: ControlType.textarea,
        placeholder: 'ป้อนโภชนาการอาหาร'
      },
      {
        key: 'UPLOAD',
        label: 'รูปภาพประจำตัวอาหาร',
        type: ControlType.upload,
        placeholder: 'เลือกรูปภาพประจำตัว',
        allowFileType: 'image/jpeg,image/jpg,image/png',
        multiple: false,
        size: 10485760,
        preview: false,
        listType: 'picture-card',
        errorMessages: {
          uploadFormat: 'รองรับเฉพาะ JPG, JPEG และ PNG',
          uploadSize: 'รองรับขนาดไฟล์ไม่เกิน 10 MB'
        }
      },
      // {
      //   key: 'LEGEND',
      //   label: 'ตำนานอาหาร',
      //   type: ControlType.legend,
      //   lookup: this.backoffice.getLookup('LEGEND-TYPES'),
      //   defaultType: '1',
      //   limit: 1,
      //   multiple: true
      // }
    ]
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.getRestaurant({
      COUNTRY_ID: this.service.RESTAURANT_INFO.DATA.COUNTRY_ID,
      // CULTURE_ID: this.service.RESTAURANT_INFO.DATA.CULTURE_ID,
      // FOOD_ID: this.service.RESTAURANT_INFO.DATA.FOOD_ID
    });

    if (result) {
      if (result.success) {
        this.service.RESTAURANT_INFO.DATA = { ...result.data };
        if (this.form) {
          this.form.setFormData(this.service.RESTAURANT_INFO.DATA);

          //=>Bind image url
          if (this.service.RESTAURANT_INFO.DATA.UPLOAD_FILES && this.service.RESTAURANT_INFO.DATA.UPLOAD_FILES.length > 0) {
            const config = this.formConfig.find((config) => config.key === 'UPLOAD');
            config.fileList = this.service.RESTAURANT_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.service.RESTAURANT_INFO.DATA.UPLOAD_FILES[0].url;
            this.form.setConfig("UPLOAD", config);
          }

          //=>Bind legend
          const config = this.formConfig.find((config) => config.key === 'LEGEND');
          if (this.service.RESTAURANT_INFO.DATA.LEGENDS && this.service.RESTAURANT_INFO.DATA.LEGENDS.length > 0) {
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

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      const result = await this.service.editRestaurant(param);
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
      if (this.service.RESTAURANT_INFO.DATA) {
        this.form.setFormData(this.service.RESTAURANT_INFO.DATA);
      }
    }
  }

}
