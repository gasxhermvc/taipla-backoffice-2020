//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App
import { StepperComponent } from '@cores/stepper/stepper.component';



@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    InfiniteScrollModule
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperModule { }
