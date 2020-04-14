import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { DatetimeService } from '@based/services/datetime.service';
import { LoadingModule } from '@cores/loading/loading.module';
import { FormModule } from '@cores/form/form.module';
import { ControlModule } from '@cores/control/control.module';
import { StepperModule } from '@cores/stepper/stepper.module';
import { TableModule } from '@cores/table/table.module';
import { ListModule } from '@cores/list/list.module';



@NgModule({
  declarations: [],
  imports: [
    //=>Angular
    CommonModule,


    //=>App
    LoadingModule,
    FormModule,
    ControlModule,
    StepperModule,
    TableModule,
    ListModule,

  ],
  exports: [
    LoadingModule,
    FormModule,
    ControlModule,
    StepperModule,
    TableModule,
    ListModule,
  ],
  providers: [
    DatetimeService
  ]
})
export class ShareModule { }
