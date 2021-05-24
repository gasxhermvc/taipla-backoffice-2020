import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { PromotionService } from '@app/backoffice/services/promotion.service';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';
import { PromotionComponent } from '@app/cores/promotion/promotion.component';

@Component({
  selector: 'app-restaurant-manage-edit-promotion',
  templateUrl: './restaurant-manage-edit-promotion.component.html',
  styleUrls: ['./restaurant-manage-edit-promotion.component.scss']
})
export class RestaurantManageEditPromotionComponent extends BaseClass
  implements OnInit {
  _promotion: PromotionComponent;
  @ViewChild(PromotionComponent)
  set promotion(promotion: PromotionComponent) {
    if (promotion) {
      this._promotion = promotion;

      if (this.service.RESTAURANT_INFO && !this.service.tabLoad.three) {
        setTimeout(() => {
          this.initPromotionForm();
          this.retrieveData();
          this.service.tabLoad.three = true;
        }, 0);
      }
    } else {
      this._promotion = undefined;
    }
  }

  get promotion() {
    return this._promotion;
  }

  get service(): RestaurantService {
    return this.store["restaurant"];
  }

  get promotionService(): PromotionService {
    return this.store["promotion"];
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.promotionService.PROMOTION_INFO = {
      DATA: undefined,
      MODE: MODE.ADD
    }
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // this.service.tabLoad.two = false;
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.promotionService.getPromotion({
      CODE: this.service.RESTAURANT_INFO.DATA.RES_ID
    });

    if (result) {
      if (result.success) {
        this.promotionService.PROMOTION_INFO = {
          DATA: { ...result.data },
          MODE: undefined
        };

        if (this.promotion.form) {
          this.promotionService.PROMOTION_INFO.MODE = MODE.EDIT;
          this.promotion.form.setFormData(this.promotionService.PROMOTION_INFO.DATA);

          //=>Bind image url
          if (
            this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES &&
            this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES.length > 0
          ) {
            const config = this.promotion.formConfig.find(
              (config) => config.key === "UPLOAD"
            );
            config.fileList = this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES[0].url;
            this.promotion.form.setConfig("UPLOAD", config);
          }

        }
      } else {
        // this.app.showError(this.app.message.ERROR.DEFAULT);
        this.promotionService.PROMOTION_INFO = {
          DATA: undefined,
          MODE: MODE.ADD
        }
      }
    } else {
      this.promotionService.PROMOTION_INFO = {
        DATA: undefined,
        MODE: MODE.ADD
      }
      // this.app.showError(this.app.message.ERROR.NOT_FOUND_DATA);
    }

    this.hideLoading();
  }

  async onSave() {
    this.showLoading();
    if (this.promotion.form.isValid(false)) {
      let param: any = this.promotion.form.getFormData();
      let result;

      switch (this.promotionService.PROMOTION_INFO.MODE) {
        case MODE.ADD:
          result = await this.promotionService.addPromotion(param);
          break;
        case MODE.EDIT:
          result = await this.promotionService.editPromotion(param);
          break;
      }

      if (result) {
        if (result.success) {
          switch (this.promotionService.PROMOTION_INFO.MODE) {
            case MODE.ADD:
              this.app.showSuccess(this.app.message.SUCCESS.INSERT);
              break;
            case MODE.EDIT:
              this.app.showSuccess(this.app.message.SUCCESS.UPDATE);
              break;
          }
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

  async onDelete(evt: any) {
    this.showLoading();
    if (evt && evt.PROMOTION_ID) {
      this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (result) => {
        if (result) {
          let param: any = {
            PROMOTION_ID: evt.PROMOTION_ID,
            CODE: evt.CODE,
            PROMOTION_TYPE: evt.PROMOTION_TYPE
          };

          const result = await this.promotionService.deletePromotion(param);

          if (result) {
            if (result.success) {
              this.app.showSuccess(this.app.message.SUCCESS.DELETE);
              this.promotion.form.initFormGroup();
              this.initPromotionForm();
              this.promotionService.PROMOTION_INFO = {
                DATA: undefined,
                MODE: MODE.ADD
              }

              if (
                this.promotion.form
              ) {
                const config = this.promotion.formConfig.find(
                  (config) => config.key === "UPLOAD"
                );
                config.fileList = [];
                config.avatarUrl = undefined;
                this.promotion.form.setConfig("UPLOAD", config);
              }
            } else {
              this.app.showError(this.app.message.ERROR.DELETE);
            }
          } else {
            this.app.showError(this.app.message.ERROR.DELETE);
          }

        }
      });
    }
    this.hideLoading();
  }

  onClear() {
    if (this.promotion.form) {
      this.promotion.form.initFormGroup();
      if (this.promotionService.PROMOTION_INFO.DATA) {
        this.promotion.form.setFormData(this.promotionService.PROMOTION_INFO.DATA);
        //=>Bind image url
        if (
          this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES &&
          this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES.length > 0
        ) {
          const config = this.promotion.formConfig.find(
            (config) => config.key === "UPLOAD"
          );
          config.fileList = this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES;
          config.avatarUrl = this.promotionService.PROMOTION_INFO.DATA.UPLOAD_FILES[0].url;
          this.promotion.form.setConfig("UPLOAD", config);
        }

      }
    }
  }

  private initPromotionForm() {
    if (this.promotion && this.promotion.form) {
      this.promotion.form && this.promotion.form.setFormData({
        RES_ID: this.service.RESTAURANT_INFO.DATA.RES_ID
      });
    }
  }
}

