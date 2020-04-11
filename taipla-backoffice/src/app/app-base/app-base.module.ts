//=>Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { LoginModule } from '@app-base/components/login/login.module';


@NgModule({
  declarations: [
    SwitcherComponent
  ],
  exports: [
    SwitcherComponent
  ],
  imports: [
    //=>Angular
    CommonModule,

    //=>App
    LoginModule
  ]
})
export class AppBaseModule { }
