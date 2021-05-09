import { Component, Injector, Input, OnInit } from '@angular/core';
import { RestaurantMenuService } from '@backoffice/services/restaurant-menu.service';
import { MODE } from '@app-base/enums/MODE';
import { BaseClass } from '@based/classes/base-class';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent extends BaseClass implements OnInit {
  _isParent: boolean = false;
  @Input()
  set isParent(parent: boolean) {
    this._isParent = parent;
    this.backoffice.currentSystem = this.currentSystem;
  }

  get isParent() {
    return this._isParent;
  }

  public MODE = MODE;
  currentSystem: string = (this.isParent ? 'restaurant' : 'restaurant_menu');

  get service(): RestaurantMenuService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).food_center = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
