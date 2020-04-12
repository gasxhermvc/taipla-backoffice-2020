import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCenterComponent } from './food-center.component';


const FOOD_CENTER_ROUTES: Routes = [
  {
    path: '',
    component: FoodCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(FOOD_CENTER_ROUTES)],
  exports: [RouterModule]
})
export class FoodCenterRoutingModule { }
