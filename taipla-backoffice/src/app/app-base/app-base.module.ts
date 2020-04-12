//=>Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { AppService } from '@based/services/app.service';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { LoginModule } from '@app-base/components/login/login.module';
import { LayoutTemplateModule } from '@app-base/components/layout-template/layout-template.module';


@NgModule({
  declarations: [
    SwitcherComponent
  ],
  imports: [
    //=>Angular
    CommonModule,

    //=>App
    LayoutTemplateModule,
    LoginModule
  ],
  exports: [
    LayoutTemplateModule,
    LoginModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppBaseModule { }
