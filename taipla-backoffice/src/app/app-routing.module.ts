import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBaseModule } from '@app-base/app-base.module';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';


const routes: Routes = [
  {
    path: '',
    component: SwitcherComponent,
    //canActivate: []
  },
  {
    path: 'backoffice',
    loadChildren: () => import('@backoffice/backoffice.module').then(m => m.BackofficeModule),
    //canActivate: []
  }
];

@NgModule({
  imports: [
    AppBaseModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
