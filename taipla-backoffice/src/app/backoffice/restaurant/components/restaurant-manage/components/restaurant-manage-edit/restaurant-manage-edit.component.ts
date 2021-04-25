import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { BaseClass } from '@app/based/classes/base-class';

@Component({
  selector: 'app-restaurant-manage-edit',
  templateUrl: './restaurant-manage-edit.component.html',
  styleUrls: ['./restaurant-manage-edit.component.scss']
})
export class RestaurantManageEditComponent extends BaseClass implements OnInit {

  @Output() back = new EventEmitter<any>();

  currentTab: number = 1;
  tabs: any = [{
    TITLE: 'ข้อมูลหลัก',
    VALUE: 1
  },
  {
    TITLE: 'ตำนานอาหาร',
    VALUE: 2
  },
  {
    TITLE: 'รูปภาพอาหาร',
    VALUE: 3
  }];

  constructor(injector: Injector) {
    super(injector);
    (window as any).fce = this;
  }

  ngOnInit() {
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
