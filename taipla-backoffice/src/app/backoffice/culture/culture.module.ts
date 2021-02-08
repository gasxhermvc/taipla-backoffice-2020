//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries

//=>App
import { ShareModule } from '@cores/share.module';
import { CultureRoutingModule } from '@app/backoffice/culture/culture-routing.module';
import { CultureComponent } from '@app/backoffice/culture/culture.component';
import { CultureManageComponent } from '@app/backoffice/culture/components/culture-manage/culture-manage.component';
import { CultureManageListComponent } from '@app/backoffice/culture/components/culture-manage/components/culture-manage-list/culture-manage-list.component';
import { CultureManageAddComponent } from '@app/backoffice/culture/components/culture-manage/components/culture-manage-add/culture-manage-add.component';
import { CultureManageEditComponent } from '@app/backoffice/culture/components/culture-manage/components/culture-manage-edit/culture-manage-edit.component';


@NgModule({
  declarations: [
    CultureComponent,
    CultureManageComponent,
    CultureManageListComponent,
    CultureManageAddComponent,
    CultureManageEditComponent
  ],
  imports: [
    CommonModule,
    CultureRoutingModule,
    ShareModule
  ],
  exports: [
    CultureComponent,
    CultureManageComponent,
    CultureManageListComponent,
    CultureManageAddComponent,
    CultureManageEditComponent
  ]
})
export class CultureModule { }
