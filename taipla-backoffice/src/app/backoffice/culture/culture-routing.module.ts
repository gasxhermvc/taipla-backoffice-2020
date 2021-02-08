import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CultureComponent } from '@app/backoffice/culture/culture.component';
import { CultureManageComponent } from '@app/backoffice/culture/components/culture-manage/culture-manage.component';


const CULTURE_ROUTES: Routes = [
  {
    path: '',
    component: CultureComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: CultureManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CULTURE_ROUTES)],
  exports: [RouterModule]
})
export class CultureRoutingModule { }
