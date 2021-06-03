import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { PromotionService } from '@app/backoffice/services/promotion.service';
import { BaseClass } from '@based/classes/base-class';
import { ControlType, FormConfig } from '@based/interfaces/FormConfig';
import { PromotionTypeEnum } from '@based/enums/PromotionTypeEnum';
import moment from 'moment';

@Component({
  selector: 'app-promotion-manage-add',
  templateUrl: './promotion-manage-add.component.html',
  styleUrls: ['./promotion-manage-add.component.scss']
})
export class PromotionManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): PromotionService {
    return this.store['promotion'];
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
    this.formConfig = [
      {
        key: "PROMOTION_ID",
        invisible: true,
      },
      {
        key: "RES_ID",
        invisible: true,
      },
      {
        key: "PROMOTION_TYPE",
        label: "ประเภทโปรโมชัน",
        type: ControlType.select,
        placeholder: "ประเภทโปรโมชัน",
        lookup: this.backoffice.getLookup("PROMOTION-TYPES"),
        errorMessages: {
          required: "เลือกประเภทโปรโมชัน",
        },
        change: (evt: any) => {
          let c: FormConfig = undefined;
          switch (evt) {
            case 1:
            case '1':
              c = this.formConfig[5];
              if (c) {
                c.invisible = false;
                // const dt = this.form.getControl('DATE_RANGE');
                this.form.setConfig('DATE_RANGE', c);
              }
              break;
            default:
              c = this.formConfig[5];
              if (c) {
                c.invisible = true;
                // const dt = this.form.getControl('DATE_RANGE');
                this.form.setConfig('DATE_RANGE', c);
              }
              break;
          }
        }
      },
      {
        key: "NAME",
        label: "หัวข้อโปรโมชัน",
        type: ControlType.text,
        placeholder: "หัวข้อโปรโมชัน",
        errorMessages: {
          required: 'กรุณากรอกหัวข้อโปรโมชัน'
        }
      },
      {
        key: "DESCRIPTION",
        label: "คำอธิบาย",
        type: ControlType.textarea,
        placeholder: "คำอธิบาย",
        errorMessages: {
          required: 'กรุณากรอกคำอธิบายโปรโมชัน'
        }
      },
      {
        key: "DATE_RANGE",
        label: 'ระยะเวลาโปรโมชัน',
        invisible: true,
        type: ControlType.daterange,
        format: 'yyyy-MM-dd',
        placeholder: ["เลือกเวลาเริ่มต้น", "เลือกเวลาสิ้นสุด"],
        change: (date: any) => {
          if (date && date.length > 0) {
            this.form.setFormData({
              START_DATE: moment(date[0]).format('YYYY-MM-DD'),
              END_DATE: moment(date[1]).format('YYYY-MM-DD')
            });
          } else {
            this.form.setFormData({
              START_DATE: undefined,
              END_DATE: undefined
            });
          }
        }
      },
      {
        key: "UPLOAD",
        label: "รูปภาพโปรโมชัน",
        type: ControlType.upload,
        placeholder: "เลือกรูปภาพโปรโมชัน",
        allowFileType: "image/jpeg,image/jpg,image/png",
        multiple: false,
        limit: 1,
        size: 10485760,
        preview: false,
        listType: "picture-card",
        errorMessages: {
          uploadFormat: "รองรับเฉพาะ JPG, JPEG และ PNG",
          uploadSize: "รองรับขนาดไฟล์ไม่เกิน 10 MB",
          uploadLimit: "อัพโหลดได้ไม่เกิน 5 รูปภาพ",
        },
      },
      {
        key: 'START_DATE',
        invisible: true
      },
      {
        key: 'END_DATE',
        invisible: true
      },
    ];
  }
  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param: any = this.form.getFormData();
      if (param.PROMOTION_TYPE.toString() == PromotionTypeEnum.USE_ESTIMATE) {
        if (param.DATE_RANGE && param.DATE_RANGE.length < 1) {
          param.START_DATE = moment().format('YYYY-MM-DD');
          param.END_DATE = moment().format('YYYY-MM-DD');
        }
      }
      param.RES_ID = this.service.PROMOTION_INFO?.DATA.RES_ID || this.service.RES_ID;

      const result = await this.service.addPromotion(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT)
          this.service.PROMOTION_INFO.DATA = {
            PROMOTION_ID: result.data.PROMOTION_ID,
            RES_ID: result.data.RES_ID,
            PROMOTION_TYPE: result.data.PROMOTION_TYPE
          };
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
