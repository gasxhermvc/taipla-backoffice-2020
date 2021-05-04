import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FoodCenterService } from "@app/backoffice/services/food-center.service";
import { BaseClass } from "@app/based/classes/base-class";
import { LegendComponent } from "@app/cores/legend/legend.component";

@Component({
  selector: "app-food-center-manage-edit-legend",
  templateUrl: "./food-center-manage-edit-legend.component.html",
  styleUrls: ["./food-center-manage-edit-legend.component.scss"],
})
export class FoodCenterManageEditLegendComponent
  extends BaseClass
  implements OnInit {
    @ViewChild(LegendComponent) legend: LegendComponent;

  get service(): FoodCenterService {
    return this.store["food_center"];
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.service.FOOD_CENTER_INFO && !this.service.tabLoad.three) {
      setTimeout(() => {
        this.retrieveData();
        this.service.tabLoad.three = true;
      }, 0);
    }
  }

  ngOnDestroy() {
    // this.service.tabLoad.two = false;
  }

  private async retrieveData() {
    this.showLoading();

    const result = await this.service.getFoodCenter({
      COUNTRY_ID: this.service.FOOD_CENTER_INFO.DATA.COUNTRY_ID,
      CULTURE_ID: this.service.FOOD_CENTER_INFO.DATA.CULTURE_ID,
      FOOD_ID: this.service.FOOD_CENTER_INFO.DATA.FOOD_ID,
    });

    if (result) {
      if (result.success) {

      }
    }

    this.hideLoading();
  }

  onSave() {}

  onClear() {}
}
