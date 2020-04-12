import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { RestaurantService } from '@backoffice/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent extends BaseClass implements OnInit {

  currentSystem: string = 'restaurant';

  get service(): RestaurantService {
    return this.store.service[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).restaurant = this;
  }

  ngOnInit() {
    console.log('restaurant');
  }

}
