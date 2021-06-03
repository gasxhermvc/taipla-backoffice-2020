import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MODE } from '@app-base/enums/MODE';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@based/classes/base-class';

@Component({
  selector: 'app-restaurant-menu-manage-list',
  templateUrl: './restaurant-menu-manage-list.component.html',
  styleUrls: ['./restaurant-menu-manage-list.component.scss']
})
export class RestaurantMenuManageListComponent extends BaseClass implements OnInit {
  public MODE = MODE;

  get service(): RestaurantMenuService {
    return this.store['restaurant_menu'];
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
          RES_ID: this.service.RESTAURANT_MENU_INFO?.DATA.RES_ID || this.service.RES_ID || this.app.user.RES_ID
        };
        this.service.LISTS = await this.service.getRestaurantMenuLists(params);
        this.hideLoading();
      }
    }
  }

  createRestaurantMenu() {
    this.onSelected({}, MODE.ADD);
  }

  onDelete(item: any) {
    this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
      if (ok) {
        this.showLoading();
        let param: any = {
          COUNTRY_ID: item.COUNTRY_ID,
          CULTURE_ID: item.CULTURE_ID,
          RES_ID: item.RES_ID,
          OWNER_ID: item.OWNER_ID || '',
          MENU_ID: item.MENU_ID
        };

        const result = await this.service.deleteRestaurantMenu(param);

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
