//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//=>Libraries
import { NgZorroAntdModule } from 'ng-zorro-antd';
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
    NgZorroAntdModule,
    InfiniteScrollModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
