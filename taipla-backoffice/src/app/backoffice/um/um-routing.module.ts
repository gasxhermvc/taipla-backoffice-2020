import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UmComponent } from '@backoffice/um/um.component';
import { UmManageComponent } from '@backoffice/um/components/um-manage/um-manage.component';


const UM_ROUTES: Routes = [
  {
    path: '',
    component: UmComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: UmManageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(UM_ROUTES)],
  exports: [RouterModule]
})
export class UmRoutingModule { }
