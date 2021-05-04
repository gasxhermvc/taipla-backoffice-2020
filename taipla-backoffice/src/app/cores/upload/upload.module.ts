import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadComponent } from '@cores/upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,

    NzModalModule,
    NzUploadModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule { }
