import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//=>Libraries
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

//=>App
import { DatetimeService } from '@based/services/datetime.service';
import { LoadingModule } from '@cores/loading/loading.module';
import { FormModule } from '@cores/form/form.module';
import { ControlModule } from '@cores/control/control.module';
import { StepperModule } from '@cores/stepper/stepper.module';
import { TableModule } from '@cores/table/table.module';
import { ListModule } from '@cores/list/list.module';
import { PaginationModule } from '@cores/pagination/pagination.module';
import { UploadModule } from '@cores/upload/upload.module';



@NgModule({
  declarations: [],
  imports: [
    //=>Angular
    CommonModule,

    //=>Lib
    NzInputModule,
    NzCheckboxModule,

    //=>App
    LoadingModule,
    FormModule,
    ControlModule,
    StepperModule,
    TableModule,
    ListModule,
    PaginationModule,
    UploadModule

  ],
  exports: [
    LoadingModule,
    FormModule,
    ControlModule,
    StepperModule,
    TableModule,
    ListModule,
    PaginationModule,
    UploadModule
  ],
  providers: [
    DatetimeService
  ]
})
export class ShareModule { }
