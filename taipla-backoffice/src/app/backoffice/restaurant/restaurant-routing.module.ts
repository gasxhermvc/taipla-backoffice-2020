import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from '@backoffice/restaurant/restaurant.component';
import { RestaurantManageComponent } from '@backoffice/restaurant/components/restaurant-manage/restaurant-manage.component';


const RESTAURANT_ROUTES: Routes = [
  {
    path: '',
    component: RestaurantComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: RestaurantManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(RESTAURANT_ROUTES)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
