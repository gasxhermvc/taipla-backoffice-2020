import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendManageComponent } from '@backoffice/cores/components/legend-manage/legend-manage.component';
import { LegendManageListComponent } from '@backoffice/cores/components/legend-manage/components/legend-manage-list/legend-manage-list.component';
import { LegendManageAddComponent } from '@backoffice/cores/components/legend-manage/components/legend-manage-add/legend-manage-add.component';
import { LegendManageEditComponent } from '@backoffice/cores/components/legend-manage/components/legend-manage-edit/legend-manage-edit.component';


@NgModule({
  declarations: [
    LegendManageComponent,
    LegendManageListComponent,
    LegendManageAddComponent,
    LegendManageEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LegendManageComponent,
    LegendManageListComponent,
    LegendManageAddComponent,
    LegendManageEditComponent
  ]
})
export class LegendManageModule { }
