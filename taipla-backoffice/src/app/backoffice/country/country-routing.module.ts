import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from '@app/backoffice/country/country.component';
import { CountryManageComponent } from '@app/backoffice/country/components/country-manage/country-manage.component';


const COUNTRY_ROUTES: Routes = [
  {
    path: '',
    component: CountryComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: CountryManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(COUNTRY_ROUTES)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
