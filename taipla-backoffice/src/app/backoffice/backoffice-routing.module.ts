import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackofficeComponent } from '@backoffice/backoffice.component';
import { AuthGuard } from '@based/guards/auth.guard';

const BACKOFFICE_ROUTES: Routes = [
  {
    path: 'backoffice',
    component: BackofficeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'account',
        loadChildren: () => import('@backoffice/account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'country',
        loadChildren: () => import('@app/backoffice/country/country.module').then(m => m.CountryModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'um',
        loadChildren: () => import('@backoffice/um/um.module').then(m => m.UmModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'food-center',
        loadChildren: () => import('@backoffice/food-center/food-center.module').then(m => m.FoodCenterModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'restaurant',
        loadChildren: () => import('@backoffice/restaurant/restaurant.module').then(m => m.RestaurantModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@backoffice/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'media',
        loadChildren: () => import('@backoffice/media/media.module').then(m => m.MediaModule),
        canActivate: [AuthGuard],
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
