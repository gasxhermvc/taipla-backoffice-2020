//=>Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//=>Libraries
import { NgZorroAntdModule, NZ_I18N, en_US, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';

//=>App
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
// import { AppBaseModule } from '@app-base/app-base.module';
// import { ShareModule } from '@cores/share.module';
// import { BackofficeModule } from '@backoffice/backoffice.module';

const ngZorroConfig: NzConfig = {
  message: { nzMaxStack: 1 },
  notification: { nzMaxStack: 1 }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //=>Angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    //=>Libraries
    NgZorroAntdModule,

    //=>App
    // AppBaseModule,
    // ShareModule,
    // BackofficeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [{ provide: NZ_CONFIG, useValue: ngZorroConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
