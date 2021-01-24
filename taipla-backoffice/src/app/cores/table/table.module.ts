//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App
import { TableComponent } from '@cores/table/table.component';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
