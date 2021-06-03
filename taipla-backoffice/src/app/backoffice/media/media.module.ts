import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule, NzTableStyleService } from 'ng-zorro-antd/table';

import { AppBaseModule } from '@app-base/app-base.module';
import { MediaRoutingModule } from '@backoffice/media/media-routing.module';

import { MediaComponent } from '@backoffice/media/media.component';
import { MediaManageComponent } from '@backoffice/media/components/media-manage/media-manage.component';
import { MediaManageListComponent } from '@backoffice/media/components/media-manage/components/media-manage-list/media-manage-list.component';

import { ShareModule } from '@app/cores/share.module';
import { BackofficeShareModule } from '@app/backoffice/cores/backoffice-share.module';

@NgModule({
  declarations: [
    MediaComponent,
    MediaManageComponent,
    MediaManageListComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,

    AppBaseModule,
    ShareModule,
    BackofficeShareModule,

    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NzTableModule
  ],
  exports: [
    MediaComponent,
    MediaManageComponent,
    MediaManageListComponent
  ],
  providers: [
    NzTableStyleService
  ]
})
export class MediaModule { }
