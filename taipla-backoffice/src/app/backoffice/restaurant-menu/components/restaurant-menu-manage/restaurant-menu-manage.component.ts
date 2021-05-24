import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@based/classes/base-class';
import { RestaurantMenuManageListComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-list/restaurant-menu-manage-list.component';
import { RESTAURANT_MENU_INFO } from '@app/backoffice/services/restaurant-menu.service';

@Component({
  selector: 'app-restaurant-menu-manage',
  templateUrl: './restaurant-menu-manage.component.html',
  styleUrls: ['./restaurant-menu-manage.component.scss']
})
export class RestaurantMenuManageComponent extends BaseClass implements OnInit {

  @ViewChild(RestaurantMenuManageListComponent) rmList: RestaurantMenuManageListComponent;

  MODE = MODE;

  get service(): RestaurantMenuService {
    return this.store['restaurant_menu'];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
    (window as any).ct = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.RESTAURANT_MENU_INFO !== undefined ? this.service.RESTAURANT_MENU_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.selected.emit(true);
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.selected.emit(true);
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.selected.emit(false);
          this.service.RESTAURANT_MENU_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.rmList) {
            this.rmList.retrieveData();
          }
          break;
        case MODE.VIEW:
        case MODE.COMPLETE:
        default:
          this.selected.emit(false);
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          break;
      }
    } else {
      this.service.STATE = this.service.STATE_PAGE.LISTS;
    }
  }


  onSelected(item: RESTAURANT_MENU_INFO) {
    this.service.RESTAURANT_MENU_INFO = item;
    this.initMode();
  }

  onComplete() {
    const doMODE = this.service.RESTAURANT_MENU_INFO !== undefined ? this.service.RESTAURANT_MENU_INFO.MODE : undefined;
    switch (doMODE) {
      case MODE.ADD:
        this.service.STATE = this.service.STATE_PAGE.EDIT;
        this.service.RESTAURANT_MENU_INFO.MODE = MODE.EDIT;
        break;
      default:
        break;
    }
    this.initMode();
  }

  onBack() {
    this.service.RESTAURANT_MENU_INFO = undefined;
    this.initMode();
  }
}
