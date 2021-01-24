//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App
import { StepperComponent } from '@cores/stepper/stepper.component';



@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    NzStepsModule,
    InfiniteScrollModule
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperModule { }
