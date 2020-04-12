import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FoodCenterService } from '@backoffice/services/food-center.service';

@Component({
  selector: 'app-food-center',
  templateUrl: './food-center.component.html',
  styleUrls: ['./food-center.component.scss']
})
export class FoodCenterComponent extends BaseClass implements OnInit {

  currentSystem: string = 'food-center';

  get service(): FoodCenterService {
    return this.store.service[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).food_center = this;
  }

  ngOnInit() {
    console.log('food center');
  }

}
