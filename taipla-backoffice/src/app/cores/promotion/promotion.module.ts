import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from '@cores/promotion/promotion.component';
import { FormModule } from '@cores/form/form.module';
import { ControlModule } from '@cores/control/control.module';

import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    PromotionComponent
  ],
  imports: [
    CommonModule,

    FormModule,
    ControlModule,

    NzButtonModule
  ],
  exports:[
    PromotionComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PromotionModule { }
