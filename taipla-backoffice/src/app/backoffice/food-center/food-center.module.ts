import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCenterRoutingModule } from '@backoffice/food-center/food-center-routing.module';
import { FoodCenterComponent } from '@backoffice/food-center/food-center.component';


@NgModule({
  declarations: [FoodCenterComponent],
  imports: [
    CommonModule,
    FoodCenterRoutingModule
  ]
})
export class FoodCenterModule { }
