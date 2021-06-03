import { Component, EventEmitter, Injector, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { BaseClass } from '@app/based/classes/base-class';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';
import { ControlComponent } from '@app/cores/control/control.component';
import { MEDIA_LIST_CONFIG } from '@based/configs/table-config';
import { MediaService } from '@backoffice/services/media.service';
import { LayoutTemplateService } from '@app/app-base/components/layout-template/layout-template.service';

@Component({
  selector: 'app-media-manage-list',
  templateUrl: './media-manage-list.component.html',
  styleUrls: ['./media-manage-list.component.scss']
})
export class MediaManageListComponent extends BaseClass implements OnInit {

  @ViewChild('country', { static: false }) country: ControlComponent;

  public formConfig: FormConfig[];
  public MODE = MODE;

  get service(): MediaService {
    return this.store['media'];
  }

  get isBreakWord() {
    return this.service['isCollapsed'] || false;
  }

  get columns(): any {
    return MEDIA_LIST_CONFIG;
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector,
    private renderer: Renderer2,
    private _layout: LayoutTemplateService) {

    super(injector);

    (window as any).mcl = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.STATE) {
      setTimeout(() => {
        // // this.showLoading();
        // // // this.initConfig();
        // // setTimeout(() => {
        // //   // switch (this.app.user.ROLE) {
        // //   //   case RoleEnum.SUPER_ADMIN:
        // //   //   case RoleEnum.ADMIN:
        // //   //     this.renderer.removeClass(this.user.el.nativeElement, 'd-none');
        // //   //     break;
        // //   //   case RoleEnum.OWNER:
        // //   //   case RoleEnum.POST:
        // //   //   case RoleEnum.USER:
        // //   //   case RoleEnum.CLIENT:
        // //   //     this.user.el.nativeElement.remove();
        // //   //     break;
        // //   // }
        // //   this.hideLoading();
        // // }, 1000);
        this.retrieveData();
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
        key: 'CULTURE_ID',
        label: 'วัฒนธรรมอาหาร',
        type: ControlType.select,
        placeholder: 'เลือกวัฒนธรรมของอาหาร',
        lookupKey: 'CODE',
        lookupLabel: 'VALUE_TH',
        disable: true,
        // lookup: this.backoffice.getLookup('CULTURES'),
        change: (evt: any) => {
          this.retrieveData();
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
          // COUNTRY_ID: this.country?.control?.value || '',
          // CULTURE_ID: this.culture?.control?.value || '',
          // NAME_TH: this.name_th?.control?.value || '',
          // AUTHOR: this.user?.control?.value || ''
        };
        this.service.LISTS = await this.service.getMediaLists(params);
        this.hideLoading();
      }
    }
  }

  createFoodCenter() {
    this.onSelected({}, MODE.ADD);
  }

  // // onDelete(item: any) {
  // //   this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
  // //     if (ok) {
  // //       this.showLoading();
  // //       let param: any = {
  // //         COUNTRY_ID: item.COUNTRY_ID,
  // //         CULTURE_ID: item.CULTURE_ID,
  // //         FOOD_ID: item.FOOD_ID
  // //       };

  // //       const result = await this.service.deleteFoodCenter(param);

  // //       if (result) {
  // //         if (result.success) {
  // //           this.app.showSuccess(result.message || this.app.message.SUCCESS.DELETE);
  // //           this.onSelected(item, MODE.DELETE);
  // //         } else {
  // //           this.app.showError(result.message || this.app.message.ERROR.DELETE);
  // //         }
  // //       } else {
  // //         this.app.showError(this.app.message.ERROR.DELETE);
  // //       }
  // //       this.hideLoading();
  // //     }
  // //   })
  // // }

  onSelected(item: any, mode: MODE = MODE.VIEW) {
    this.selected.emit({
      DATA: item,
      MODE: mode
    });
  }

  onOpenImage(item: any, mode: MODE = MODE.VIEW) {
    window.open(item.URL, '_blank');
  }

  getColumnConfig(key: string, useProps: string = '') {
    return this.app.getColumnConfig(MEDIA_LIST_CONFIG, key, useProps)
  }
}
