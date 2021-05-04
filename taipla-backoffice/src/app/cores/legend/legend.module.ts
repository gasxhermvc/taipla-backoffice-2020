import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendComponent } from '@cores/legend/legend.component';
import { FormModule } from '@cores/form/form.module';
import { ControlModule } from '../control/control.module';



@NgModule({
  declarations: [
    LegendComponent
  ],
  imports: [
    CommonModule,

    FormModule,
    ControlModule
  ],
  exports:[
    LegendComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LegendModule { }
