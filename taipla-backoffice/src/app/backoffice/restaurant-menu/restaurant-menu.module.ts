import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantMenuComponent } from '@backoffice/restaurant-menu/restaurant-menu.component';



@NgModule({
  declarations: [
    RestaurantMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RestaurantMenuComponent
  ]
})
export class RestaurantMenuModule { }
