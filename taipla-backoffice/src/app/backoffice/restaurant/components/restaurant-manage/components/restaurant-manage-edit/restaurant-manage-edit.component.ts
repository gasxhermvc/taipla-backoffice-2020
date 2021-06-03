import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { RestaurantService } from '@backoffice/services/restaurant.service';
import { BaseClass } from '@based/classes/base-class';

@Component({
  selector: 'app-restaurant-manage-edit',
  templateUrl: './restaurant-manage-edit.component.html',
  styleUrls: ['./restaurant-manage-edit.component.scss']
})
export class RestaurantManageEditComponent extends BaseClass implements OnInit {

  @Output() back = new EventEmitter<any>();

  currentTab: number = 1;
  tabs: any = [
    {
      TITLE: "ข้อมูลหลัก",
      VALUE: 1,
    },
    {
      TITLE: "จัดการเมนูอาหาร",
      VALUE: 2,
    },
    {
      TITLE: "จัดการโปรโมชัน",
      VALUE: 3,
    },
    {
      TITLE: "รูปภาพร้านอาหาร",
      VALUE: 4,
    },
  ];

  get service(): RestaurantService {
    return this.store["restaurant"];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).rme = this;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.service.tabLoad = {
      one: false,
      two: false,
      three: false,
      four: false,
    };
  }

  onChangeTab(evt: any) {
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
