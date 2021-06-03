import { Component, OnInit, Output, EventEmitter, Injector, ViewChild, Renderer2 } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FoodCenterService } from '@backoffice/services/food-center.service';
import { MODE } from '@app-base/enums/MODE';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';
import { ControlComponent } from '@app/cores/control/control.component';
import { FOOD_CENTER_LIST_CONFIG } from '@based/configs/table-config';
import { RoleEnum } from '@based/enums/RoleEnum';
@Component({
  selector: 'app-food-center-manage-list',
  templateUrl: './food-center-manage-list.component.html',
  styleUrls: ['./food-center-manage-list.component.scss']
})
export class FoodCenterManageListComponent extends BaseClass implements OnInit {

  @ViewChild('country', { static: false }) country: ControlComponent;
  @ViewChild('culture', { static: false }) culture: ControlComponent;
  @ViewChild('name_th', { static: false }) name_th: ControlComponent;
  @ViewChild('user', { static: false }) user: ControlComponent;

  public formConfig: FormConfig[];
  public MODE = MODE;

  get service(): FoodCenterService {
    return this.store['food_center'];
  }

  get columns(): any {
    return FOOD_CENTER_LIST_CONFIG;
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector,
    private renderer: Renderer2) {
    super(injector);

    (window as any).fcml = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.STATE) {
      setTimeout(() => {
        this.showLoading();
        this.initConfig();
        setTimeout(() => {
          switch (this.app.user.ROLE) {
            case RoleEnum.SUPER_ADMIN:
            case RoleEnum.ADMIN:
              this.renderer.removeClass(this.user.el.nativeElement, 'd-none');
              break;
            case RoleEnum.OWNER:
            case RoleEnum.POST:
            case RoleEnum.USER:
            case RoleEnum.CLIENT:
              this.user.el.nativeElement.remove();
              break;
          }
          this.retrieveData();
          this.hideLoading();
        }, 1000);
      }, 0);
    }
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
            this.formConfig[1] = { ...config };
          }

          this.retrieveData();
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
        disable: true,
        // lookup: this.backoffice.getLookup('CULTURES'),
        change: (evt: any) => {
          if (evt) {
            this.retrieveData();
          }
        },
        errorMessages: {
          required: 'กรุณาเลือกวัฒนธรรมของอาหาร'
        }
      },
      {
        key: 'NAME_TH',
        label: 'ชื่ออาหาร (ภาษาไทย)',
        type: ControlType.text,
        placeholder: 'ป้อนชื่อวัฒนธรรมอาหาร (ภาษาไทย)',
        delay: 500,
        change: (evt: any) => {
          this.retrieveData();
        },
        errorMessages: {
          required: 'กรุณาป้อนชื่อวัฒนธรรมอาหาร'
        }
      },
      {
        key: 'USER',
        label: 'ชื่อผู้ใช้งาน',
        type: ControlType.select,
        placeholder: 'เลือกวัฒนธรรมของอาหาร',
        lookupKey: 'CODE',
        lookupLabel: 'DESCR',
        lookup: this.backoffice.getLookup('AUTHOR-CREATE-FOOD-CENTER'),
        change: (evt: any) => {
          if (evt) {
            this.retrieveData();
          }
        },
      }
    ]
  }

  async retrieveData() {
    if (this.service !== undefined) {
      if (this.service.STATE === this.service.STATE_PAGE.LISTS) {
        this.showLoading();
        const params: any = {
          COUNTRY_ID: this.country?.control?.value || '',
          CULTURE_ID: this.culture?.control?.value || '',
          NAME_TH: this.name_th?.control?.value || '',
          AUTHOR: this.user?.control?.value || ''
        };
        this.service.LISTS = await this.service.getFoodCenterLists(params);
        this.hideLoading();
      }
    }
  }

  createFoodCenter() {
    this.onSelected({}, MODE.ADD);
  }

  onDelete(item: any) {
    this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
      if (ok) {
        this.showLoading();
        let param: any = {
          COUNTRY_ID: item.COUNTRY_ID,
          CULTURE_ID: item.CULTURE_ID,
          FOOD_ID: item.FOOD_ID
        };

        const result = await this.service.deleteFoodCenter(param);

        if (result) {
          if (result.success) {
            this.app.showSuccess(result.message || this.app.message.SUCCESS.DELETE);
            this.onSelected(item, MODE.DELETE);
          } else {
            this.app.showError(result.message || this.app.message.ERROR.DELETE);
          }
        } else {
          this.app.showError(this.app.message.ERROR.DELETE);
        }
        this.hideLoading();
      }
    })
  }

  onSelected(item: any, mode: MODE = MODE.VIEW) {
    this.selected.emit({
      DATA: item,
      MODE: mode
    });
  }
  getColumnConfig(key: string, useProps: string = '') {
    return this.app.getColumnConfig(FOOD_CENTER_LIST_CONFIG, key, useProps)
  }
}
