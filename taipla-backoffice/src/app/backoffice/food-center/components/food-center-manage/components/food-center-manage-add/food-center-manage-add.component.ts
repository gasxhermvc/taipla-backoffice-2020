import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FoodCenterService } from '@backoffice/services/food-center.service';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';

@Component({
  selector: 'app-food-center-manage-add',
  templateUrl: './food-center-manage-add.component.html',
  styleUrls: ['./food-center-manage-add.component.scss']
})
export class FoodCenterManageAddComponent extends BaseClass implements OnInit {


  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): FoodCenterService {
    return this.store['food_center'];
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
      }
    ]
  }
  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      const result = await this.service.addFoodCenter(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT)
          this.service.FOOD_CENTER_INFO.DATA = {
            COUNTRY_ID: param.COUNTRY_ID,
            CULTURE_ID: param.CULTURE_ID,
            FOOD_ID: result.data.FOOD_ID
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
