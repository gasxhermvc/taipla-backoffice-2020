//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries

//=>App
import { ShareModule } from '@cores/share.module';
import { CountryRoutingModule } from '@app/backoffice/country/country-routing.module';
import { CountryComponent } from '@app/backoffice/country/country.component';
import { CountryManageComponent } from '@app/backoffice/country/components/country-manage/country-manage.component';
import { CountryManageListComponent } from '@app/backoffice/country/components/country-manage/components/country-manage-list/country-manage-list.component';
import { CountryManageAddComponent } from '@app/backoffice/country/components/country-manage/components/country-manage-add/country-manage-add.component';
import { CountryManageEditComponent } from '@app/backoffice/country/components/country-manage/components/country-manage-edit/country-manage-edit.component';


@NgModule({
  declarations: [
    CountryComponent,
    CountryManageComponent,
    CountryManageListComponent,
    CountryManageAddComponent,
    CountryManageEditComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ShareModule
  ],
  exports: [
    CountryComponent,
    CountryManageComponent,
    CountryManageListComponent,
    CountryManageAddComponent,
    CountryManageEditComponent
  ]
})
export class CountryModule { }
