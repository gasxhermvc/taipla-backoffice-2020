import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { UPLOAD } from '@app/app-base/enums/UPLOAD';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@based/classes/base-class';
import { ControlType, FormConfig } from '@based/interfaces/FormConfig';

@Component({
  selector: 'app-restaurant-menu-manage-edit-media',
  templateUrl: './restaurant-menu-manage-edit-media.component.html',
  styleUrls: ['./restaurant-menu-manage-edit-media.component.scss']
})
export class RestaurantMenuManageEditMediaComponent extends BaseClass
  implements OnInit {
  formConfig: FormConfig[];

  @Output() complete = new EventEmitter<any>();

  UPLOAD_FILES?: any;

  IMAGE_FILE_TYPE: any = "image/jpeg|image/jpg|image/png";

  get service(): RestaurantMenuService {
    return this.store["restaurant_menu"];
  }

  get meta(): any {
    if (!this.service.RESTAURANT_MENU_INFO.DATA) return undefined;

    return {
      PATH: UPLOAD.RESTAURANT_MENU,
      REF_ID: this.service.RESTAURANT_MENU_INFO.DATA.RES_ID,
    };
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).fcmem = this;
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.service.RESTAURANT_MENU_INFO && !this.service.tabLoad.three) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
        this.service.tabLoad.three = true;
      }, 0);
    }
  }

  ngOnDestroy() {
    this.service.tabLoad.three = false;
  }

  initConfig() {
    this.formConfig = [
      {
        key: "UPLOAD",
        label: "รูปภาพประจำตัวอาหาร",
        type: ControlType.upload,
        placeholder: "เลือกรูปภาพประจำตัว",
        allowFileType: "image/jpeg,image/jpg,image/png",
        multiple: true,
        size: 10485760,
        preview: true,
        listType: "picture-card",
        errorMessages: {
          uploadFormat: "รองรับเฉพาะ JPG, JPEG และ PNG",
          uploadSize: "รองรับขนาดไฟล์ไม่เกิน 20 MB",
        },
      },
    ];
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.mediaRestaurantMenu({
      COUNTRY_ID: this.service.RESTAURANT_MENU_INFO.DATA.COUNTRY_ID,
      CULTURE_ID: this.service.RESTAURANT_MENU_INFO.DATA.CULTURE_ID,
      OWNER_ID: this.service.RESTAURANT_MENU_INFO.DATA.OWNER_ID,
      RES_ID: this.service.RESTAURANT_MENU_INFO.DATA.RES_ID,
      MENU_ID: this.service.RESTAURANT_MENU_INFO.DATA.MENU_ID
    });

    if (result) {
      if (result.success) {
        this.UPLOAD_FILES = result.data;

        if (this.form) {
          // this.form.setFormData({
          //   UPLOAD: undefined,
          // });

          //=>Bind image url
          if (this.UPLOAD_FILES && this.UPLOAD_FILES.length > 0) {
            const config = this.formConfig.find(
              (config) => config.key === "UPLOAD"
            );
            config.fileList = this.UPLOAD_FILES;
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
}
