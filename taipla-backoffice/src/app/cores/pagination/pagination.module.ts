//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

//=>App
import { PaginationComponent } from '@cores/pagination/pagination.component';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NzPaginationModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
