import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';

@Component({
  selector: 'app-restaurant-manage-add',
  templateUrl: './restaurant-manage-add.component.html',
  styleUrls: ['./restaurant-manage-add.component.scss']
})
export class RestaurantManageAddComponent extends BaseClass implements OnInit {


  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): RestaurantService {
    return this.store['restaurant'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rma = this;
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
        key: 'OWNER_ID',
        label: 'ชื่อเจ้าของร้านอาหาร',
        type: ControlType.select,
        placeholder: 'เลือกชื่อเจ้าของร้านอาหาร',
        lookupKey: 'CODE',
        lookupLabel: 'DESCR',
        lookup: this.backoffice.getLookup('OWNERS'),
        // errorMessages: {
        //   required: 'กรุณาเลือกเจ้าของร้านอาหาร'
        // }
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
        key: 'PROVINCE',
        label: 'จังหวัด',
        type: ControlType.select,
        placeholder: 'เลือกจังหวัด',
        lookupKey: 'CODE',
        lookupLabel: 'DESCR',
        lookup: this.backoffice.getLookup('PROVINCES'),
        errorMessages: {
          required: 'กรุณาเลือกจังหวัด'
        }
      },
      {
        key: 'NAME',
        label: 'ชื่อร้านอาหาร',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อร้านอาหาร',
        errorMessages: {
          required: 'กรุณาป้อนชื่อวัฒนธรรมอาหาร'
        }
      },
      {
        key: 'ADDRESS',
        label: 'ชื่อที่อยู่',
        type: ControlType.textarea,
        placeholder: 'ป้อนชื่อที่อยู่',
        // errorMessages: {
        //   required: 'กรุณาป้อนคำอธิบาย'
        // }
      },
      {
        key: 'GOOGLE_MAP',
        label: 'แผนที่',
        type: ControlType.textarea,
        placeholder: 'กรุณาป้อน Link แผนที่่ เช่น google maps, nostramap เป็นต้น',
        errorMessages: {
          required: 'กรุณาป้อน Link แผนที่่ เช่น google maps, nostramap เป็นต้น'
        }
        // regex: /^(https:\/\/map.nostramap.com|https:\/\/www.google.com\/maps.*|https:\/\/www.google.com\/maps.*|https:\/\/g.page.*|https:\/\/wwww.google.com\/maps.*|\<iframe.*https:\/\/www.google.com\/maps\/embed.*)*$/,
        // errorMessages: {
        //   regex: 'กรุณาป้อน Link แผนที่่ Google map หรือ <iframe />'
        // }
      },
      {
        label: 'พิกัด',
        type: ControlType.coordinates,
        placeholder: ['LATITUDE', 'LONGITUDE'],
        coordinate: {
          LAT: 'LATITUDE',
          LONG: 'LONGITUDE',
          decimalPlaces: 6,
          coordinateValidate: true,
          coordinateThaiValidate: true,
          blur: (evt: any) => this.afterRender(evt)
        }
      },
      {
        key: 'WEBSITE',
        label: 'เว็บไซต์',
        type: ControlType.text,
        placeholder: 'ป้อน Web site'
      },
      {
        key: 'FACEBOOK',
        label: 'Social media (Facebook)',
        type: ControlType.text,
        placeholder: 'ป้อน Link Facebook',
        // regex: /^$|^https:\/\/www.facebook.com.*|^.*facebook.com.*/gi,
        // regex: /^((\s\S|https:\/\/www.facebook.com.*|^.*facebook.com.*)*)$/,
        // errorMessages: {
        //   regex: 'กรุณาป้อน Link Facebook fan page หรือ Facebook profile'
        // }
      },
      {
        key: 'LINE',
        label: 'Social media (Line)',
        type: ControlType.text,
        placeholder: 'ป้อน ID Line, Line phone number'
      },
      {
        key: 'PHONE',
        label: 'เบอร์โทรศัพท์',
        type: ControlType.text,
        placeholder: 'ป้อน Link แผนที่่ Google map'
      },
      {
        key: 'OPEN_TIME',
        label: 'เวลาที่เปิดทำการ',
        type: ControlType.text,
        placeholder: 'ป้อน Link แผนที่่ Google map'
      },
      {
        key: 'TAGS',
        label: 'แปะป้ายสำหรับค้นหา',
        type: ControlType.tagTokenize,
        defaultValue: [],
        placeholder: 'ป้อน Link แผนที่่ Google map'
      },
      {
        key: 'CAR_PARK',
        label: 'แผนที่',
        type: ControlType.radio,
        defaultValue: '0',
        lookup: [{ CODE: '0', DESCR: 'ไม่มีที่จอด' }, { CODE: '1', DESCR: 'มีที่จอดรอด' }],
        placeholder: 'ป้อน Link แผนที่่ Google map'
      },
      {
        key: 'UPLOAD',
        label: 'รูปภาพประจำตัวร้านอาหาร',
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
      const result = await this.service.addRestaurant(param);
      if (result) {
        if (result.success) {
          this.app.showSuccess(result.message || this.app.message.SUCCESS.INSERT)
          // this.service.RESTAURANT_INFO.DATA = {
          //   COUNTRY_ID: param.COUNTRY_ID,
          //   CULTURE_ID: param.CULTURE_ID,
          //   FOOD_ID: result.data.FOOD_ID
          // }
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
      this.form.setFormData({
        LATITUDE: undefined,
        LONGITUDE: undefined
      })
    }
  }

  onBack() {
    this.back.emit();
  }

  async onLatLongBlur(evt: any) {
    console.log('evt', evt);
    // this.order.onLatLongBlur(evt, this.form, this.gis, this.gp);
  }

  afterRender(evt: any) {
    this.backoffice.afterRender(evt, this.form, {
      LAT: 'LATITUDE',
      LONG: 'LONGITUDE'
    });
  }

}
