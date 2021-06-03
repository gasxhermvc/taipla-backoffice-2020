import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@based/classes/base-class';
import { ControlType, FormConfig } from '@based/interfaces/FormConfig';

@Component({
  selector: 'app-restaurant-menu-manage-edit-main',
  templateUrl: './restaurant-menu-manage-edit-main.component.html',
  styleUrls: ['./restaurant-menu-manage-edit-main.component.scss']
})
export class RestaurantMenuManageEditMainComponent extends BaseClass
  implements OnInit {
  formConfig: FormConfig[];

  @Output() complete = new EventEmitter<any>();

  get service(): RestaurantMenuService {
    return this.store["restaurant_menu"];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rmmem = this;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.service.RESTAURANT_MENU_INFO && !this.service.tabLoad.one) {
      setTimeout(() => {
        this.showLoading();
        this.initConfig();
        setTimeout(() => {
          this.retrieveData();
          this.hideLoading();
        }, 1000);
        this.service.tabLoad.one = true;
      }, 0);
    }
  }

  ngOnDestroy() {
    this.service.tabLoad.one = false;
  }

  initConfig() {
    this.formConfig = [
      {
        key: "MENU_ID",
        invisible: true,
        required: true
      },
      {
        key: "RES_ID",
        invisible: true,
        required: true,
      },
      {
        key: "CODE",
        invisible: true,
        required: true,
      },
      {
        key: "COUNTRY_ID",
        label: "ประเทศของอาหาร",
        type: ControlType.select,
        placeholder: "เลือกประเทศของอาหาร",
        lookupKey: "CODE",
        lookupLabel: "VALUE_TH",
        lookup: this.backoffice.getLookup("COUNTRIES"),
        change: (evt: any) => {
          let related = "CULTURE_ID";
          let config = this.formConfig.find(
            (item: any) => item.key === related
          );
          if (config) {
            config.lookup = []
              .concat(...this.backoffice.getLookup("CULTURES"))
              .filter((item: any) => item.COUNTRY_ID === evt);

            if (evt == undefined || evt == null || evt == 0 || evt == "") {
              config.disable = true;
            } else {
              config.disable = false;
            }
            this.form.setConfig(related, config);
          }
        },
        errorMessages: {
          required: "กรุณาเลือกประเทศของอาหาร",
        },
      },
      {
        key: "CULTURE_ID",
        label: "วัฒนธรรมอาหาร",
        type: ControlType.select,
        placeholder: "เลือกวัฒนธรรมของอาหาร",
        lookupKey: "CODE",
        lookupLabel: "VALUE_TH",
        lookup: this.backoffice.getLookup("CULTURES"),
        errorMessages: {
          required: "กรุณาเลือกวัฒนธรรมของอาหาร",
        },
      },
      {
        key: "NAME_TH",
        label: "ชื่ออาหาร (ภาษาไทย)",
        type: ControlType.text,
        placeholder: "ป้อนชื่อวัฒนธรรมอาหาร (ภาษาไทย)",
        errorMessages: {
          required: "กรุณาป้อนชื่อวัฒนธรรมอาหาร",
        },
      },
      {
        key: "NAME_EN",
        label: "ชื่ออาหาร (ภาษาอังกฤษ)",
        type: ControlType.text,
        placeholder: "ป้อนชื่อวัฒนธรรมอาหาร (ภาษาอังกฤษ)",
        regex: /^([a-zA-Z0-9 _-|"'-]*)$/,
        errorMessages: {
          regex: "กรุณาป้อนเป็นภาษาอังกฤษ และตัวเลขเท่านั้น",
        },
      },
      {
        key: "DESCRIPTION",
        label: "คำอธิบาย",
        type: ControlType.textarea,
        placeholder: "ป้อนคำอธิบาย",
        // errorMessages: {
        //   required: 'กรุณาป้อนคำอธิบาย'
        // }
      },
      // {
      //   key: "COOKING_FOOD",
      //   label: "วิธีการปรุง",
      //   type: ControlType.textarea,
      //   placeholder: "ป้อนวิธีการปรุง",
      // },
      // {
      //   key: "INGREDIENT",
      //   label: "วัตถุดิบ",
      //   type: ControlType.textarea,
      //   placeholder: "ป้อนข้อมูลวัตถุดิบ",
      // },
      // {
      //   key: "DIETETIC_FOOD",
      //   label: "โภชนาการอาหาร",
      //   type: ControlType.textarea,
      //   placeholder: "ป้อนโภชนาการอาหาร",
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
      {
        key: "UPLOAD",
        label: "รูปภาพประจำตัวอาหาร",
        type: ControlType.upload,
        placeholder: "เลือกรูปภาพประจำตัว",
        allowFileType: "image/jpeg,image/jpg,image/png",
        multiple: false,
        size: 10485760,
        preview: false,
        listType: "picture-card",
        errorMessages: {
          uploadFormat: "รองรับเฉพาะ JPG, JPEG และ PNG",
          uploadSize: "รองรับขนาดไฟล์ไม่เกิน 10 MB",
        },
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
    ];
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.getRestaurantMenu({
      COUNTRY_ID: this.service.RESTAURANT_MENU_INFO.DATA.COUNTRY_ID,
      CULTURE_ID: this.service.RESTAURANT_MENU_INFO.DATA.CULTURE_ID,
      RES_ID: this.service.RESTAURANT_MENU_INFO.DATA.RES_ID,
      MENU_ID: this.service.RESTAURANT_MENU_INFO.DATA.MENU_ID,
      OWNER_ID: this.service.RESTAURANT_MENU_INFO.DATA.OWNER_ID || -1,
    });

    if (result) {
      if (result.success) {
        this.service.RESTAURANT_MENU_INFO.DATA = { ...result.data };
        if (this.form) {
          this.form.setFormData(this.service.RESTAURANT_MENU_INFO.DATA);

          //=>Bind image url
          if (
            this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES &&
            this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES.length > 0
          ) {
            const config = this.formConfig.find(
              (config) => config.key === "UPLOAD"
            );
            config.fileList = this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES[0].url;
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
      const result = await this.service.editRestaurantMenu(param);
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
      if (this.service.RESTAURANT_MENU_INFO.DATA) {
        this.form.setFormData(this.service.RESTAURANT_MENU_INFO.DATA);
        //=>Bind image url
        if (
          this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES &&
          this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES.length > 0
        ) {
          const config = this.formConfig.find(
            (config) => config.key === "UPLOAD"
          );
          config.fileList = this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES;
          config.avatarUrl = this.service.RESTAURANT_MENU_INFO.DATA.UPLOAD_FILES[0].url;
          this.form.setConfig("UPLOAD", config);
        }
      }
    }
  }
}

