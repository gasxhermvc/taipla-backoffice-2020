import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { RestaurantMenuService } from '@app/backoffice/services/restaurant-menu.service';
import { BaseClass } from '@app/based/classes/base-class';

@Component({
  selector: 'app-restaurant-menu-manage-edit',
  templateUrl: './restaurant-menu-manage-edit.component.html',
  styleUrls: ['./restaurant-menu-manage-edit.component.scss']
})
export class RestaurantMenuManageEditComponent extends BaseClass implements OnInit {
  @Output() back = new EventEmitter<any>();

  currentTab: number = 1;
  tabs: any = [
    {
      TITLE: "ข้อมูลหลัก",
      VALUE: 1,
    },
    {
      TITLE: "ตำนานอาหาร",
      VALUE: 2,
    },
    // {
    //   TITLE: "รูปภาพอาหาร",
    //   VALUE: 3,
    // },
  ];

  get service(): RestaurantMenuService {
    return this.store["food_center"];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rmme = this;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.service.tabLoad = {
      one: false,
      two: false,
      three: false,
    };
  }

  onChangeTab(evt: any) {
    console.log(evt);
    if (evt && evt.index != undefined && evt.index != null) {
      this.currentTab = evt.index + 1;
    } else {
      this.currentTab = 1;
    }
  }

  onBack() {
    this.back.emit();
  }
}
