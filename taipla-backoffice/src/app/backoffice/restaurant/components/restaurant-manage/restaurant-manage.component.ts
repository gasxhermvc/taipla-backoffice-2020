import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { RestaurantService, RESTAURANT_INFO } from '@app/backoffice/services/restaurant.service';
import { BaseClass } from '@app/based/classes/base-class';
import { RestaurantManageListComponent } from './components/restaurant-manage-list/restaurant-manage-list.component';

@Component({
  selector: 'app-restaurant-manage',
  templateUrl: './restaurant-manage.component.html',
  styleUrls: ['./restaurant-manage.component.scss']
})
export class RestaurantManageComponent extends BaseClass implements OnInit {

  @ViewChild(RestaurantManageListComponent) rmList: RestaurantManageListComponent;

  MODE = MODE;

  get service(): RestaurantService {
    return this.store['restaurant'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rm = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.RESTAURANT_INFO !== undefined ? this.service.RESTAURANT_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.service.RESTAURANT_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.rmList) {
            this.rmList.retrieveData();
          }
          break;
        case MODE.VIEW:
        case MODE.COMPLETE:
        default:
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          break;
      }
    } else {
      this.service.STATE = this.service.STATE_PAGE.LISTS;
    }
  }


  onSelected(item: RESTAURANT_INFO) {
    this.service.RESTAURANT_INFO = item;
    this.initMode();
  }

  onComplete() {
    const doMODE = this.service.RESTAURANT_INFO !== undefined ? this.service.RESTAURANT_INFO.MODE : undefined;
    switch (doMODE) {
      case MODE.ADD:
        this.service.STATE = this.service.STATE_PAGE.EDIT;
        this.service.RESTAURANT_INFO.MODE = MODE.EDIT;
        break;
      default:
        break;
    }
    this.initMode();
  }

  onBack() {
    this.service.RESTAURANT_INFO = undefined;
    this.initMode();
  }


}
