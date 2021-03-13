//=>Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>App
import { ShareModule } from '@cores/share.module';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { LoginModule } from '@app-base/components/login/login.module';
import { LayoutTemplateModule } from '@app-base/components/layout-template/layout-template.module';
import { AuthService } from '@app/based/services/auth.service';
import { ImageComponent } from '@app-base/components/image/image.component';


@NgModule({
  declarations: [
    SwitcherComponent,
    ImageComponent
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
    LoginModule,
    ImageComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  ]
})
export class AppBaseModule { }
