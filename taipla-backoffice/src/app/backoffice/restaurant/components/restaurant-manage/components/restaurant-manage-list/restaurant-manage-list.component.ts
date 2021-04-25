import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { FoodCenterService } from '@app/backoffice/services/food-center.service';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';

@Component({
  selector: 'app-restaurant-manage-list',
  templateUrl: './restaurant-manage-list.component.html',
  styleUrls: ['./restaurant-manage-list.component.scss']
})
export class RestaurantManageListComponent extends BaseClass implements OnInit {

  public MODE = MODE;;

  get service(): RestaurantService {
    return this.store['restaurant'];
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);

    (window as any).rml = this;
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

}
