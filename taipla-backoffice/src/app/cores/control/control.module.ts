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
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

//=>App
import { ControlComponent } from '@cores/control/control.component';
import { LegendManagerComponent } from '@cores/legend-manager/legend-manager.component';
import { LatLongComponent } from '@cores/lat-long/lat-long.component';

/* Calendar thai */
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';
import th from '@angular/common/locales/th';

registerLocaleData(th);

@NgModule({
  declarations: [
    ControlComponent,
    LegendManagerComponent,
    LatLongComponent
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
    NzUploadModule,
    NzAutocompleteModule,
    NzRadioModule,
    NzCheckboxModule,
    NzModalModule,
    NzDatePickerModule
  ],
  exports: [
    ControlComponent,
    LegendManagerComponent,
    LatLongComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: th_TH }
  ]
})
export class ControlModule { }
