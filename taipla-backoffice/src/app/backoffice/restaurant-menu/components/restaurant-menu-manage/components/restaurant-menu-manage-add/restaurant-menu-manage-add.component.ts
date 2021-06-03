import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@based/classes/base-class';
import { ControlType, FormConfig } from '@based/interfaces/FormConfig';

@Component({
  selector: 'app-restaurant-menu-manage-add',
  templateUrl: './restaurant-menu-manage-add.component.html',
  styleUrls: ['./restaurant-menu-manage-add.component.scss']
})
export class RestaurantMenuManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): RestaurantMenuService {
    return this.store['restaurant_menu'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rmma = this;
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
        key: 'RES_ID',
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
        // lookup: this.backoffice.getLookup('CULTURES'),
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
        regex: /^([a-zA-Z0-9 _-|"'-]*)$/,
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
      // {
      //   key: 'COOKING_FOOD',
      //   label: 'วิธีการปรุง',
      //   type: ControlType.textarea,
      //   placeholder: 'ป้อนวิธีการปรุง'
      // },
      {
        key: 'PRICE',
        label: 'ราคาอาหาร',
        type: ControlType.number,
        placeholder: 'ป้อนราคาอาหาร',
        errorMessages: {
          required: 'กรุณาป้อนราคาอาหาร'
        }
      },
      // {
      //   key: 'DIETETIC_FOOD',
      //   label: 'โภชนาการอาหาร',
      //   type: ControlType.textarea,
      //   placeholder: 'ป้อนโภชนาการอาหาร'
      // },
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
      }
    ]
  }
  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      param.RES_ID = this.service.RESTAURANT_MENU_INFO?.DATA.RES_ID || this.service.RES_ID || this.app.user.RES_ID;

      const result = await this.service.addRestaurantMenu(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT)
          this.service.RESTAURANT_MENU_INFO.DATA = {
            COUNTRY_ID: param.COUNTRY_ID,
            CULTURE_ID: param.CULTURE_ID,
            OWNER_ID: result.OWNER_ID || '',
            RES_ID: result.data.RES_ID,
            MENU_ID: result.data.MENU_ID,
            CODE: result.data.CODE
          }
          // this.onBack();
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
