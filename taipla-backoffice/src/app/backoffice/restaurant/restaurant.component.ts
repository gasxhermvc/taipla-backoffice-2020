import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { RestaurantService } from '@backoffice/services/restaurant.service';
import { MODE } from '@app/app-base/enums/MODE';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  host: {
    class: 'main'
  }
})
export class RestaurantComponent extends BaseClass implements OnInit {

  public MODE = MODE;
  currentSystem: string = 'restaurant';

  get service(): RestaurantService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).restaurant = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.service.HIDE_TAB = false;
    
  }
}
