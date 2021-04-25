//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule, NzTableStyleService } from 'ng-zorro-antd/table';

//=>App
import { AppBaseModule } from '@app-base/app-base.module';
import { ShareModule } from '@app/cores/share.module';
import { UmRoutingModule } from '@backoffice/um/um-routing.module';
import { UmComponent } from '@backoffice/um/um.component';
import { UmManageComponent } from '@backoffice/um/components/um-manage/um-manage.component';
import { UmManageListComponent } from '@backoffice/um/components/um-manage/components/um-manage-list/um-manage-list.component';
import { UmManageAddComponent } from '@backoffice/um/components/um-manage/components/um-manage-add/um-manage-add.component';
import { UmManageEditComponent } from '@backoffice/um/components/um-manage/components/um-manage-edit/um-manage-edit.component';


@NgModule({
  declarations: [
    UmComponent,
    UmManageComponent,
    UmManageListComponent,
    UmManageAddComponent,
    UmManageEditComponent
  ],
  imports: [
    CommonModule,
    AppBaseModule,
    UmRoutingModule,
    ShareModule,

    NzButtonModule,
    NzIconModule,
    NzTableModule
  ],
  exports: [
    UmManageComponent,
    UmManageListComponent,
    UmManageAddComponent,
    UmManageEditComponent
  ],
  providers: [
    NzTableStyleService
  ]
})
export class UmModule { }
