//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule, NzTableStyleService } from 'ng-zorro-antd/table';

//=>App
import { AppBaseModule } from '@app-base/app-base.module';
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
    AppBaseModule,
    ShareModule,

    NzButtonModule,
    NzIconModule,
    NzTableModule
  ],
  exports: [
    CultureComponent,
    CultureManageComponent,
    CultureManageListComponent,
    CultureManageAddComponent,
    CultureManageEditComponent
  ],
  providers: [
    NzTableStyleService
  ]
})
export class CultureModule { }
