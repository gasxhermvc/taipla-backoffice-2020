import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from '@backoffice/restaurant/restaurant-routing.module';
import { RestaurantComponent } from '@backoffice/restaurant/restaurant.component';


@NgModule({
  declarations: [RestaurantComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
