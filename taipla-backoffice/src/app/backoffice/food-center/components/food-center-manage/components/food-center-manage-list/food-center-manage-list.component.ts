import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FoodCenterService } from '@backoffice/services/food-center.service';
import { MODE } from '@app-base/enums/MODE';

@Component({
  selector: 'app-food-center-manage-list',
  templateUrl: './food-center-manage-list.component.html',
  styleUrls: ['./food-center-manage-list.component.scss']
})
export class FoodCenterManageListComponent extends BaseClass implements OnInit {

  public MODE = MODE;;

  get service(): FoodCenterService {
    return this.store['food_center'];
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);

    (window as any).fcml = this;
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
        const params: any = {};
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

}
