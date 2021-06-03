import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MODE } from '@app-base/enums/MODE';
import { PromotionService } from '@app/backoffice/services/promotion.service';
import { BaseClass } from '@based/classes/base-class';

@Component({
  selector: 'app-promotion-manage-list',
  templateUrl: './promotion-manage-list.component.html',
  styleUrls: ['./promotion-manage-list.component.scss']
})
export class PromotionManageListComponent extends BaseClass implements OnInit {
  public MODE = MODE;

  get service(): PromotionService {
    return this.store['promotion'];
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);

    (window as any).rmml = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.STATE) {
      setTimeout(() => {
        this.retrieveData();
      }, 0);
    }
  }

  async retrieveData() {
    if (this.service !== undefined) {
      if (this.service.STATE === this.service.STATE_PAGE.LISTS) {
        this.showLoading();
        const params: any = {
          RES_ID: this.service.PROMOTION_INFO?.DATA.RES_ID || this.service.RES_ID
        };
        this.service.LISTS = await this.service.getPromotionLists(params);
        this.hideLoading();
      }
    }
  }

  createPromotion() {
    this.onSelected({}, MODE.ADD);
  }

  onDelete(item: any) {
    this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
      if (ok) {
        this.showLoading();
        let param: any = {
          PROMOTION_ID: item.PROMOTION_ID,
          PROMOTION_TYPE: item.PROMOTION_TYPE,
          RES_ID: item.RES_ID
        };

        const result = await this.service.deletePromotion(param);

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

}
