import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FoodCenterService } from '@backoffice/services/food-center.service';
import { MODE } from '@app-base/enums/MODE';
@Component({
  selector: 'app-food-center',
  templateUrl: './food-center.component.html',
  styleUrls: ['./food-center.component.scss'],
  host: {
    class: 'main'
  }
})
export class FoodCenterComponent extends BaseClass implements OnInit {

  public MODE = MODE;
  currentSystem: string = 'food_center';

  get service(): FoodCenterService {
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
