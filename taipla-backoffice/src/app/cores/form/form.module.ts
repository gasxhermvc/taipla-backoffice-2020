//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//=>Libraries
import { NzFormModule } from 'ng-zorro-antd/form';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App
import { FormComponent } from '@cores/form/form.component';
import { ControlModule } from '../control/control.module';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ControlModule,
    NzFormModule,
    InfiniteScrollModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
