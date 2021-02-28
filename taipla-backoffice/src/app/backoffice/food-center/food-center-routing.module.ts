import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCenterComponent } from '@app/backoffice/food-center/food-center.component';
import { FoodCenterManageComponent } from '@app/backoffice/food-center/components/food-center-manage/food-center-manage.component';

const FOOD_CENTER_ROUTES: Routes = [
  {
    path: '',
    component: FoodCenterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: FoodCenterManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(FOOD_CENTER_ROUTES)],
  exports: [RouterModule]
})
export class FoodCenterRoutingModule { }
