//=>Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { ShareModule } from '@cores/share.module';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { LoginModule } from '@app-base/components/login/login.module';
import { LayoutTemplateModule } from '@app-base/components/layout-template/layout-template.module';
import { AuthService } from '@app/based/services/auth.service';


@NgModule({
  declarations: [
    SwitcherComponent
  ],
  imports: [
    //=>Angular
    CommonModule,

    //=>App
    ShareModule,
    LayoutTemplateModule,
    LoginModule
  ],
  exports: [
    LayoutTemplateModule,
    LoginModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ]
})
export class AppBaseModule { }
