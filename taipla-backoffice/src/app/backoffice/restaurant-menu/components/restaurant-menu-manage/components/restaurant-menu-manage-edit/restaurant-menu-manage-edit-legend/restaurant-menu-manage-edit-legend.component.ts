import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { LegendService } from '@app/backoffice/services/legend.service';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@app/based/classes/base-class';
import { LegendComponent } from '@app/cores/legend/legend.component';

@Component({
  selector: 'app-restaurant-menu-manage-edit-legend',
  templateUrl: './restaurant-menu-manage-edit-legend.component.html',
  styleUrls: ['./restaurant-menu-manage-edit-legend.component.scss']
})
export class RestaurantMenuManageEditLegendComponent extends BaseClass
  implements OnInit {
  _legend: LegendComponent;

  @ViewChild(LegendComponent)
  set legend(legend: LegendComponent) {
    if (legend) {
      this._legend = legend;

      if (this.service.RESTAURANT_MENU_INFO && !this.service.tabLoad.two) {
        setTimeout(() => {
          this.showLoading();
          this.initLegendForm();
          setTimeout(() => {
            this.retrieveData();
            this.hideLoading();
          }, 1000);
          this.service.tabLoad.two = true;
        }, 0);
      }
    } else {
      this._legend = undefined;
    }
  }

  get legend() {
    return this._legend;
  }

  get service(): RestaurantMenuService {
    return this.store["restaurant_menu"];
  }

  get legendService(): LegendService {
    return this.store["legend"];
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.legendService.LEGEND_INFO = {
      DATA: undefined,
      MODE: MODE.ADD
    }
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.service.tabLoad.two = false;
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.legendService.getLegend({
      CODE: this.service.RESTAURANT_MENU_INFO.DATA.CODE
    });

    if (result) {
      if (result.success) {
        this.legendService.LEGEND_INFO = {
          DATA: { ...result.data },
          MODE: undefined
        };

        if (this.legend.form) {
          this.legendService.LEGEND_INFO.MODE = MODE.EDIT;
          this.legend.form.setFormData(this.legendService.LEGEND_INFO.DATA);

          //=>Bind image url
          if (
            this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES &&
            this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES.length > 0
          ) {
            const config = this.legend.formConfig.find(
              (config) => config.key === "UPLOAD"
            );
            config.fileList = this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES;
            config.avatarUrl = this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES[0].url;
            this.legend.form.setConfig("UPLOAD", config);
          }

        }
      } else {
        // this.app.showError(this.app.message.ERROR.DEFAULT);
        this.legendService.LEGEND_INFO = {
          DATA: undefined,
          MODE: MODE.ADD
        }
      }
    } else {
      this.legendService.LEGEND_INFO = {
        DATA: undefined,
        MODE: MODE.ADD
      }
      // this.app.showError(this.app.message.ERROR.NOT_FOUND_DATA);
    }

    this.hideLoading();
  }

  async onSave() {
    this.showLoading();
    if (this.legend.form.isValid(false)) {
      let param: any = this.legend.form.getFormData();
      let result;

      switch (this.legendService.LEGEND_INFO.MODE) {
        case MODE.ADD:
          result = await this.legendService.addLegend(param);
          break;
        case MODE.EDIT:
          result = await this.legendService.editLegend(param);
          break;
      }

      if (result) {
        if (result.success) {
          switch (this.legendService.LEGEND_INFO.MODE) {
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
    if (evt && evt.LEGEND_ID) {
      this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (result) => {
        if (result) {
          let param: any = {
            LEGEND_ID: evt.LEGEND_ID,
            CODE: evt.CODE,
            LEGEND_TYPE: evt.LEGEND_TYPE
          };

          const result = await this.legendService.deleteLegend(param);

          if (result) {
            if (result.success) {
              this.app.showSuccess(this.app.message.SUCCESS.DELETE);
              this.legend.form.initFormGroup();
              this.initLegendForm();
              this.legendService.LEGEND_INFO = {
                DATA: undefined,
                MODE: MODE.ADD
              }

              if (
                this.legend.form
              ) {
                const config = this.legend.formConfig.find(
                  (config) => config.key === "UPLOAD"
                );
                config.fileList = [];
                config.avatarUrl = undefined;
                this.legend.form.setConfig("UPLOAD", config);
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
    if (this.legend.form) {
      this.legend.form.initFormGroup();
      if (this.legendService.LEGEND_INFO.DATA) {
        this.legend.form.setFormData(this.legendService.LEGEND_INFO.DATA);
        //=>Bind image url
        if (
          this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES &&
          this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES.length > 0
        ) {
          const config = this.legend.formConfig.find(
            (config) => config.key === "UPLOAD"
          );
          config.fileList = this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES;
          config.avatarUrl = this.legendService.LEGEND_INFO.DATA.UPLOAD_FILES[0].url;
          this.legend.form.setConfig("UPLOAD", config);
        }

      }
      this.initLegendForm();
    }
  }

  private initLegendForm() {
    if (this.legend && this.legend.form) {
      this.legend.form && this.legend.form.setFormData({
        LEGEND_TYPE: '2',
        CODE: this.service.RESTAURANT_MENU_INFO.DATA.CODE
      });
    }
  }
}
