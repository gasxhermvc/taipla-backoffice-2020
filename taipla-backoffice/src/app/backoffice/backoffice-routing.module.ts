import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackofficeComponent } from '@backoffice/backoffice.component';


const BACKOFFICE_ROUTES: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'account',
        loadChildren: () => import('@backoffice/account/account.module').then(m => m.AccountModule),
        //canActivate: []
      },
      {
        path: 'category',
        loadChildren: () => import('@backoffice/category/category.module').then(m => m.CategoryModule),
        //canActivate: []
      },
      {
        path: 'um',
        loadChildren: () => import('@backoffice/um/um.module').then(m => m.UmModule),
        //canActivate: []
      },
      {
        path: 'food-center',
        loadChildren: () => import('@backoffice/food-center/food-center.module').then(m => m.FoodCenterModule),
        //canActivate: []
      },
      {
        path: 'restaurant',
        loadChildren: () => import('@backoffice/restaurant/restaurant.module').then(m => m.RestaurantModule),
        //canActivate: []
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@backoffice/dashboard/dashboard.module').then(m => m.DashboardModule),
        //canActivate:[]
      },
      {
        path: 'media',
        loadChildren: () => import('@backoffice/media/media.module').then(m => m.MediaModule),
        //canActivate: []
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(BACKOFFICE_ROUTES)
  ],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
