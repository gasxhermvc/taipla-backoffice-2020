//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App
import { ListComponent } from '@cores/list/list.component';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    InfiniteScrollModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
