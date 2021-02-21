import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendManageModule } from '@backoffice/cores/components/legend-manage/legend-manage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    LegendManageModule
  ],
  exports: [
    LegendManageModule
  ]
})
export class BackofficeShareModule { }
