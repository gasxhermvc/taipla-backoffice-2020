import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Injector,
} from "@angular/core";
import { BaseClass } from "@based/classes/base-class";
import { FormConfig, ControlType } from "@based/interfaces/FormConfig";
import { FoodCenterService } from "@backoffice/services/food-center.service";

@Component({
  selector: "app-food-center-manage-edit",
  templateUrl: "./food-center-manage-edit.component.html",
  styleUrls: ["./food-center-manage-edit.component.scss"],
})
export class FoodCenterManageEditComponent extends BaseClass implements OnInit {
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
    {
      TITLE: "รูปภาพอาหาร",
      VALUE: 3,
    },
  ];

  get service(): FoodCenterService {
    return this.store["food_center"];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).fce = this;
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
