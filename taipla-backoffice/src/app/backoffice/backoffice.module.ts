import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { BackofficeRoutingModule } from '@backoffice/backoffice-routing.module';
import { CategoryModule } from '@backoffice/category/category.module';
import { FoodCenterModule } from '@backoffice/food-center/food-center.module';
import { UmModule } from '@backoffice/um/um.module';
import { AccountModule } from '@backoffice/account/account.module';
import { RestaurantModule } from '@backoffice/restaurant/restaurant.module';
import { MediaModule } from '@backoffice/media/media.module';
import { DashboardModule } from '@backoffice/dashboard/dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    CategoryModule,
    UmModule,
    FoodCenterModule,
    AccountModule,
    RestaurantModule,
    MediaModule,
    DashboardModule
  ]
})
export class BackofficeModule { }
