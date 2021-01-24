//=>App
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//=>Libraries
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NzUploadModule } from 'ng-zorro-antd/upload';

//=>App
import { ControlComponent } from '@cores/control/control.component';

/* Calendar thai */
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import th from '@angular/common/locales/th';

registerLocaleData(th);

@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    NgZorroAntdModule,
    InfiniteScrollModule,
    NzUploadModule

  ],
  exports: [
    ControlComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: th_TH }
  ]
})
export class ControlModule { }
