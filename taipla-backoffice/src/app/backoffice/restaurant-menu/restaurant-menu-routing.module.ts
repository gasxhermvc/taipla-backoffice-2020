import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMenuComponent } from '@app/backoffice/restaurant-menu/restaurant-menu.component';
import { RestaurantMenuManageComponent } from '@app/backoffice/restaurant-menu/components/restaurant-menu-manage/restaurant-menu-manage.component';

const RESTAURANT_MENU_ROUTES: Routes = [
  {
    path: '',
    component: RestaurantMenuComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: RestaurantMenuManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(RESTAURANT_MENU_ROUTES)],
  exports: [RouterModule]
})
export class RestaurantMenuRoutingModule { }
