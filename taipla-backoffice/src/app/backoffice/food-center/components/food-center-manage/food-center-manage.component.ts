import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseClass } from '@app/based/classes/base-class';
import { FoodCenterService, FOOD_CENTER_INFO } from '@backoffice/services/food-center.service';
import { MODE } from '@app-base/enums/MODE';
import { FoodCenterManageListComponent } from '@backoffice/food-center/components/food-center-manage/components/food-center-manage-list/food-center-manage-list.component';
@Component({
  selector: 'app-food-center-manage',
  templateUrl: './food-center-manage.component.html',
  styleUrls: ['./food-center-manage.component.scss']
})
export class FoodCenterManageComponent extends BaseClass implements OnInit {

  @ViewChild(FoodCenterManageListComponent) fcList: FoodCenterManageListComponent;

  MODE = MODE;

  get service(): FoodCenterService {
    return this.store['culture'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).ct = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.FOOD_CENTER_INFO !== undefined ? this.service.FOOD_CENTER_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.service.FOOD_CENTER_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.fcList) {
            this.fcList.retrieveData();
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


  onSelected(item: FOOD_CENTER_INFO) {
    this.service.FOOD_CENTER_INFO = item;
    this.initMode();
  }

  onComplete() {
    this.service.FOOD_CENTER_INFO = undefined;
    this.initMode();
  }

  onBack() {
    this.service.FOOD_CENTER_INFO = undefined;
    this.initMode();
  }

}
