//=>Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//=>Libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgZorroAntdModule, NZ_I18N, en_US, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';
//=>App
import { AppRoutingModule } from '@app/app-routing.module';
import { AppService } from '@based/services/app.service';
import { AppComponent } from '@app/app.component';
import { AppBaseModule } from '@app-base/app-base.module';
import { ShareModule } from '@cores/share.module';
import { BackofficeModule } from '@backoffice/backoffice.module';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //=>Libraries
    InfiniteScrollModule,
    NgZorroAntdModule,

    //=>App
    AppBaseModule,
    ShareModule,
    BackofficeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AppService,
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
