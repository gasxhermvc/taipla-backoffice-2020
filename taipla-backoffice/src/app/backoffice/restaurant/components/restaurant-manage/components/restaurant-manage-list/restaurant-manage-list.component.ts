import { Component, EventEmitter, Injector, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { FoodCenterService } from '@app/backoffice/services/food-center.service';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';
import { ControlComponent } from '@app/cores/control/control.component';
import { RESTAURANT_LIST_CONFIG } from '@based/configs/table-config';
import { RoleEnum } from '@based/enums/RoleEnum';

@Component({
  selector: 'app-restaurant-manage-list',
  templateUrl: './restaurant-manage-list.component.html',
  styleUrls: ['./restaurant-manage-list.component.scss']
})
export class RestaurantManageListComponent extends BaseClass implements OnInit {

  @ViewChild('country', { static: false }) country: ControlComponent;
  @ViewChild('name', { static: false }) name: ControlComponent;
  @ViewChild('author', { static: false }) author: ControlComponent;

  public formConfig: FormConfig[];
  public MODE = MODE;;

  get service(): RestaurantService {
    return this.store['restaurant'];
  }

  get columns(): any {
    return RESTAURANT_LIST_CONFIG;
  }


  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector,
    private renderer: Renderer2) {
    super(injector);

    (window as any).rml = this;
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
              this.renderer.removeClass(this.author.el.nativeElement, 'd-none');
              break;
            case RoleEnum.OWNER:
            case RoleEnum.POST:
            case RoleEnum.USER:
            case RoleEnum.CLIENT:
              this.author.el.nativeElement.remove();
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
        }
      },
      {
        key: 'NAME',
        label: 'ชื่อร้านอาหาร',
        type: ControlType.text,
        placeholder: 'ป้องชื่อร้านอาหาร',
        delay: 500,
        change: (evt: any) => {
          this.retrieveData();
        }
      },
      {
        key: 'AUTHOR',
        label: 'ชื่อผู้สร้างรายการ',
        type: ControlType.select,
        placeholder: 'เลือกชื่อผู้สร้างรายการ',
        lookupKey: 'CODE',
        lookupLabel: 'DESCR',
        lookup: this.backoffice.getLookup('AUTHOR-CREATE-RESTAURANT'),
        change: (evt: any) => {
          this.retrieveData();
        },
      }
    ]
  }

  async retrieveData() {
    if (this.service !== undefined) {
      if (this.service.STATE === this.service.STATE_PAGE.LISTS) {
        this.showLoading();
        const params: any = {
          COUNTRY_ID: this.country?.control.value || '',
          NAME: this.name?.control.value || '',
          AUTHOR: this.author?.control.value || ''
        };
        this.service.LISTS = await this.service.getRestaurantLists(params);
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
          OWNER_ID: item.OWNER_ID,
          RES_ID: item.RES_ID
        };

        const result = await this.service.deleteRestaurant(param);

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
    return this.app.getColumnConfig(RESTAURANT_LIST_CONFIG, key, useProps)
  }
}
