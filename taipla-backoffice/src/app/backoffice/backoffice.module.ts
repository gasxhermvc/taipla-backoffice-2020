import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { AppBaseModule } from '@app/app-base/app-base.module';
import { ShareModule } from '@app/cores/share.module';
import { BackofficeRoutingModule } from '@backoffice/backoffice-routing.module';
import { CategoryModule } from '@backoffice/category/category.module';
import { FoodCenterModule } from '@backoffice/food-center/food-center.module';
import { UmModule } from '@backoffice/um/um.module';
import { AccountModule } from '@backoffice/account/account.module';
import { RestaurantModule } from '@backoffice/restaurant/restaurant.module';
import { MediaModule } from '@backoffice/media/media.module';
import { DashboardModule } from '@backoffice/dashboard/dashboard.module';
import { BackofficeComponent } from '@backoffice/backoffice.component';


@NgModule({
  declarations: [BackofficeComponent],
  imports: [
    CommonModule,

    AppBaseModule,
    ShareModule,
    BackofficeRoutingModule,
    CategoryModule,
    UmModule,
    FoodCenterModule,
    AccountModule,
    RestaurantModule,
    MediaModule,
    DashboardModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BackofficeModule { }
