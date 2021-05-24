import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { RestaurantMenuComponent } from '@backoffice/restaurant-menu/restaurant-menu.component';
import { RestaurantService } from '@backoffice/services/restaurant.service';
import { BaseClass } from '@based/classes/base-class';
import { ControlType, FormConfig } from '@based/interfaces/FormConfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-manage-edit-menu',
  templateUrl: './restaurant-manage-edit-menu.component.html',
  styleUrls: ['./restaurant-manage-edit-menu.component.scss']
})
export class RestaurantManageEditMenuComponent extends BaseClass implements OnInit {

  _comp: any;
  @ViewChild(RestaurantMenuComponent)
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
