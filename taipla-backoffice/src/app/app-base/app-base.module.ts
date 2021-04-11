//=>Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeTH from '@angular/common/locales/th';

registerLocaleData(localeTH);

//=>Libraries
import { NzIconModule } from 'ng-zorro-antd/icon';

//=>App
import { ShareModule } from '@cores/share.module';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { LoginModule } from '@app-base/components/login/login.module';
import { LayoutTemplateModule } from '@app-base/components/layout-template/layout-template.module';
import { AuthService } from '@app/based/services/auth.service';
import { ImageComponent } from '@app-base/components/image/image.component';
import { DisplayDatetimeComponent } from '@app-base/components/display-datetime/display-datetime.component';


@NgModule({
  declarations: [
    SwitcherComponent,
    ImageComponent,
    DisplayDatetimeComponent
  ],
  imports: [
    //=>Angular
    CommonModule,

    //=>Libraries
    NzIconModule,

    //=>App
    ShareModule,
    LayoutTemplateModule,
    LoginModule
  ],
  exports: [
    LayoutTemplateModule,
    LoginModule,
    ImageComponent,
    DisplayDatetimeComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "th-BE"
    },
    DatePipe
  ]
})
export class AppBaseModule { }
