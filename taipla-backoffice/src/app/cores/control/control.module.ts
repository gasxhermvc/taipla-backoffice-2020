//=>App
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//=>Libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

//=>App
import { ControlComponent } from '@cores/control/control.component';

/* Calendar thai */
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';
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

    InfiniteScrollModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
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
