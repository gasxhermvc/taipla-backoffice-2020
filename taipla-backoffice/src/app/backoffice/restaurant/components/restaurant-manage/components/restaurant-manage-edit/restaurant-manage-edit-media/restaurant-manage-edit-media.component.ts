import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { UPLOAD } from '@app/app-base/enums/UPLOAD';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';

@Component({
  selector: 'app-restaurant-manage-edit-media',
  templateUrl: './restaurant-manage-edit-media.component.html',
  styleUrls: ['./restaurant-manage-edit-media.component.scss']
})
export class RestaurantManageEditMediaComponent extends BaseClass
  implements OnInit {
  formConfig: FormConfig[];

  @Output() complete = new EventEmitter<any>();

  UPLOAD_FILES?: any;

  IMAGE_FILE_TYPE: any = "image/jpeg|image/jpg|image/png";

  get service(): RestaurantService {
    return this.store["restaurant"];
  }

  get meta(): any {
    if (!this.service.RESTAURANT_INFO.DATA) return undefined;

    return {
      PATH: UPLOAD.RESTAURANT,
      REF_ID: this.service.RESTAURANT_INFO.DATA.RES_ID,
    };
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).fcmem = this;
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.service.RESTAURANT_INFO && !this.service.tabLoad.four) {
      setTimeout(() => {
        this.showLoading();
        this.initConfig();
        setTimeout(() => {
          this.retrieveData();
          this.hideLoading();
        }, 1000);
        this.service.tabLoad.four = true;
      }, 0);
    }
  }

  ngOnDestroy() {
    this.service.tabLoad.four = false;
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

    const result = await this.service.mediaRestaurant({
      COUNTRY_ID: this.service.RESTAURANT_INFO.DATA.COUNTRY_ID,
      OWNER_ID: this.service.RESTAURANT_INFO.DATA.OWNER_ID || '',
      RES_ID: this.service.RESTAURANT_INFO.DATA.RES_ID,
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
      // this.app.showError(this.app.message.ERROR.NOT_FOUND_DATA);
    }

    this.hideLoading();
  }
}
