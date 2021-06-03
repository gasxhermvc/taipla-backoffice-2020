import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { RestaurantService } from '@app/backoffice/services/restaurant.service';
import { PromotionService } from '@app/backoffice/services/promotion.service';
import { BaseClass } from '@app/based/classes/base-class';
import { PromotionComponent } from '@backoffice/promotion/promotion.component';

@Component({
  selector: 'app-restaurant-manage-edit-promotion',
  templateUrl: './restaurant-manage-edit-promotion.component.html',
  styleUrls: ['./restaurant-manage-edit-promotion.component.scss']
})
export class RestaurantManageEditPromotionComponent extends BaseClass implements OnInit {

  _comp: any;
  @ViewChild(PromotionComponent)
  set restaurantMenu(comp: any) {
    if (comp != null && comp != undefined) {
      this._comp = comp;
      this._comp.service.RES_ID = this.service.RESTAURANT_INFO.DATA.RES_ID;
    } else {
      this._comp = undefined;
    }
  }

  get service(): RestaurantService {
    return this.store['restaurant'] || {};
  }

  get restaurantMenu() {
    return this._comp;
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rmel = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  viewPage(evt: any) {
    this.service.HIDE_TAB = evt;



  }
}
